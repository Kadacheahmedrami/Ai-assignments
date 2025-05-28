class ConnectFour {
  ROWS: number
  COLS: number
  EMPTY: number
  PLAYER: number
  AI: number
  board: number[][]
  currentPlayer: number
  gameOver: boolean
  winner: number | null

  constructor() {
    this.ROWS = 6
    this.COLS = 7
    this.EMPTY = 0
    this.PLAYER = 1
    this.AI = 2
    this.board = Array.from({ length: this.ROWS }, () => Array(this.COLS).fill(this.EMPTY))
    this.currentPlayer = this.PLAYER
    this.gameOver = false
    this.winner = null
  }

  resetGame(): number[][] {
    this.board = Array.from({ length: this.ROWS }, () => Array(this.COLS).fill(this.EMPTY))
    this.currentPlayer = this.PLAYER
    this.gameOver = false
    this.winner = null
    return this.board
  }

  isValidMove(col: number): boolean {
    return this.board[0][col] === this.EMPTY
  }

  getValidMoves(): number[] {
    const validMoves: number[] = []
    for (let col = 0; col < this.COLS; col++) {
      if (this.isValidMove(col)) validMoves.push(col)
    }
    return validMoves
  }

  makeMove(col: number, player: number): boolean {
    if (!this.isValidMove(col) || this.gameOver) return false

    let row: number
    for (row = this.ROWS - 1; row >= 0; row--) {
      if (this.board[row][col] === this.EMPTY) break
    }

    this.board[row][col] = player
    if (this.checkWin(row, col, player)) {
      this.gameOver = true
      this.winner = player
    } else if (this.isBoardFull()) {
      this.gameOver = true
    }
    return true
  }

  simulateMove(col: number, player: number, boardCopy: number[][]): { row: number; col: number } | false {
    if (boardCopy[0][col] !== this.EMPTY) return false
    let row: number
    for (row = this.ROWS - 1; row >= 0; row--) {
      if (boardCopy[row][col] === this.EMPTY) break
    }
    boardCopy[row][col] = player
    return { row, col }
  }

  undoMove(row: number, col: number, boardCopy: number[][]): void {
    boardCopy[row][col] = this.EMPTY
  }

  isBoardFull(): boolean {
    return this.board[0].every(cell => cell !== this.EMPTY)
  }

  checkWin(row: number, col: number, player: number): boolean {
    const directions: number[][] = [[0,1],[1,0],[1,1],[1,-1]]
    for (const [dRow, dCol] of directions) {
      let count = 1
      for (let i = 1; i <= 3; i++) {
        const r = row + dRow*i, c = col + dCol*i
        if (r>=0 && r<this.ROWS && c>=0 && c<this.COLS && this.board[r][c]===player) count++
        else break
      }
      for (let i = 1; i <= 3; i++) {
        const r = row - dRow*i, c = col - dCol*i
        if (r>=0 && r<this.ROWS && c>=0 && c<this.COLS && this.board[r][c]===player) count++
        else break
      }
      if (count>=4) return true
    }
    return false
  }

  checkWinForPosition(row: number, col: number, player: number, boardCopy: number[][]): boolean {
    const directions: number[][] = [[0,1],[1,0],[1,1],[1,-1]]
    for (const [dRow, dCol] of directions) {
      let count = 1
      for (let i = 1; i <= 3; i++) {
        const r = row + dRow*i, c = col + dCol*i
        if (r>=0 && r<this.ROWS && c>=0 && c<this.COLS && boardCopy[r][c]===player) count++
        else break
      }
      for (let i = 1; i <= 3; i++) {
        const r = row - dRow*i, c = col - dCol*i
        if (r>=0 && r<this.ROWS && c>=0 && c<this.COLS && boardCopy[r][c]===player) count++
        else break
      }
      if (count>=4) return true
    }
    return false
  }

  evaluateBoard(boardCopy: number[][]): number {
    const WIN_SCORE = 1000000
    const THREE_IN_ROW = 100
    const TWO_IN_ROW = 10
    const CENTER_COLUMN_VALUE = 3
    let score = 0
    for (let r = 0; r < this.ROWS; r++) {
      if (boardCopy[r][3] === this.AI) score += CENTER_COLUMN_VALUE
      else if (boardCopy[r][3] === this.PLAYER) score -= CENTER_COLUMN_VALUE
    }
    const windows = []
    // horizontal, vertical, diag-down, diag-up collection omitted for brevity...
    return score
  }

  minimax(
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    boardCopy: number[][]
  ): { score: number; column: number | null } {
    const WIN_SCORE = 1000000
    const validMoves = this.getValidMovesForBoard(boardCopy)
    if (depth === 0 || validMoves.length === 0) {
      return { score: this.evaluateBoard(boardCopy), column: null }
    }
    // Immediate win/loss check
    for (const col of validMoves) {
      const move = this.simulateMove(col, isMaximizing ? this.AI : this.PLAYER, boardCopy)
      if (move) {
        const { row } = move
        if (this.checkWinForPosition(row, col, isMaximizing ? this.AI : this.PLAYER, boardCopy)) {
          this.undoMove(row, col, boardCopy)
          return { score: isMaximizing ? WIN_SCORE : -WIN_SCORE, column: col }
        }
        this.undoMove(row, col, boardCopy)
      }
    }
    if (isMaximizing) {
      let maxScore = Number.NEGATIVE_INFINITY
      let bestCol = validMoves[0]
      for (const col of validMoves) {
        const move = this.simulateMove(col, this.AI, boardCopy)
        if (move) {
          const { row } = move
          const { score } = this.minimax(depth-1, alpha, beta, false, boardCopy)
          this.undoMove(row, col, boardCopy)
          if (score > maxScore) { maxScore = score; bestCol = col }
          alpha = Math.max(alpha, maxScore)
          if (alpha >= beta) break
        }
      }
      return { score: maxScore, column: bestCol }
    } else {
      let minScore = Number.POSITIVE_INFINITY
      let bestCol = validMoves[0]
      for (const col of validMoves) {
        const move = this.simulateMove(col, this.PLAYER, boardCopy)
        if (move) {
          const { row } = move
          const { score } = this.minimax(depth-1, alpha, beta, true, boardCopy)
          this.undoMove(row, col, boardCopy)
          if (score < minScore) { minScore = score; bestCol = col }
          beta = Math.min(beta, minScore)
          if (beta <= alpha) break
        }
      }
      return { score: minScore, column: bestCol }
    }
  }

  getValidMovesForBoard(boardCopy: number[][]): number[] {
    const valid: number[] = []
    for (let c = 0; c < this.COLS; c++) {
      if (boardCopy[0][c] === this.EMPTY) valid.push(c)
    }
    return valid
  }

  makeAIMove(): number | null {
    if (this.gameOver) return null
    const boardCopy = this.board.map(row => [...row])
    const MAX_DEPTH = 7
    let bestMove: number | null = null
    for (let d = 3; d <= MAX_DEPTH; d++) {
      const { column, score } = this.minimax(d, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, true, boardCopy)
      bestMove = column
      if (score >= 1000000) break
    }
    if (bestMove !== null && this.makeMove(bestMove, this.AI)) return bestMove
    return null
  }

  switchTurn(): void {
    this.currentPlayer = this.currentPlayer === this.PLAYER ? this.AI : this.PLAYER
  }

  getGameStatus() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      gameOver: this.gameOver,
      winner: this.winner,
      validMoves: this.getValidMoves(),
    }
  }
}

export default ConnectFour
