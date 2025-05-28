class ConnectFour {
  constructor() {
    this.ROWS = 6
    this.COLS = 7
    this.EMPTY = 0
    this.PLAYER = 1
    this.AI = 2
    this.board = Array(this.ROWS)
      .fill()
      .map(() => Array(this.COLS).fill(this.EMPTY))
    this.currentPlayer = this.PLAYER
    this.gameOver = false
    this.winner = null
  }

  resetGame() {
    this.board = Array(this.ROWS)
      .fill()
      .map(() => Array(this.COLS).fill(this.EMPTY))
    this.currentPlayer = this.PLAYER
    this.gameOver = false
    this.winner = null
    return this.board
  }

  isValidMove(col) {
    return this.board[0][col] === this.EMPTY
  }

  getValidMoves() {
    const validMoves = []
    for (let col = 0; col < this.COLS; col++) {
      if (this.isValidMove(col)) {
        validMoves.push(col)
      }
    }
    return validMoves
  }

  makeMove(col, player) {
    if (!this.isValidMove(col) || this.gameOver) {
      return false
    }

    let row
    for (row = this.ROWS - 1; row >= 0; row--) {
      if (this.board[row][col] === this.EMPTY) {
        break
      }
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

  simulateMove(col, player, boardCopy) {
    if (boardCopy[0][col] !== this.EMPTY) {
      return false
    }

    let row
    for (row = this.ROWS - 1; row >= 0; row--) {
      if (boardCopy[row][col] === this.EMPTY) {
        break
      }
    }

    boardCopy[row][col] = player
    return { row, col }
  }

  undoMove(row, col, boardCopy) {
    boardCopy[row][col] = this.EMPTY
  }

  isBoardFull() {
    for (let col = 0; col < this.COLS; col++) {
      if (this.board[0][col] === this.EMPTY) {
        return false
      }
    }
    return true
  }

  checkWin(row, col, player) {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ]

    for (const [dRow, dCol] of directions) {
      let count = 1
      for (let i = 1; i <= 3; i++) {
        const newRow = row + dRow * i
        const newCol = col + dCol * i
        if (
          newRow >= 0 &&
          newRow < this.ROWS &&
          newCol >= 0 &&
          newCol < this.COLS &&
          this.board[newRow][newCol] === player
        ) {
          count++
        } else {
          break
        }
      }
      for (let i = 1; i <= 3; i++) {
        const newRow = row - dRow * i
        const newCol = col - dCol * i
        if (
          newRow >= 0 &&
          newRow < this.ROWS &&
          newCol >= 0 &&
          newCol < this.COLS &&
          this.board[newRow][newCol] === player
        ) {
          count++
        } else {
          break
        }
      }
      if (count >= 4) {
        return true
      }
    }

    return false
  }

  checkWinForPosition(row, col, player, boardCopy) {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ]

    for (const [dRow, dCol] of directions) {
      let count = 1
      for (let i = 1; i <= 3; i++) {
        const newRow = row + dRow * i
        const newCol = col + dCol * i
        if (
          newRow >= 0 &&
          newRow < this.ROWS &&
          newCol >= 0 &&
          newCol < this.COLS &&
          boardCopy[newRow][newCol] === player
        ) {
          count++
        } else {
          break
        }
      }
      for (let i = 1; i <= 3; i++) {
        const newRow = row - dRow * i
        const newCol = col - dCol * i
        if (
          newRow >= 0 &&
          newRow < this.ROWS &&
          newCol >= 0 &&
          newCol < this.COLS &&
          boardCopy[newRow][newCol] === player
        ) {
          count++
        } else {
          break
        }
      }
      if (count >= 4) {
        return true
      }
    }

    return false
  }

  isSimulatedBoardFull(boardCopy) {
    for (let col = 0; col < this.COLS; col++) {
      if (boardCopy[0][col] === this.EMPTY) {
        return false
      }
    }
    return true
  }

  evaluateBoard(boardCopy) {
    const WIN_SCORE = 1000000
    const THREE_IN_ROW = 100
    const TWO_IN_ROW = 10
    const CENTER_COLUMN_VALUE = 3

    let score = 0
    for (let row = 0; row < this.ROWS; row++) {
      if (boardCopy[row][3] === this.AI) {
        score += CENTER_COLUMN_VALUE
      } else if (boardCopy[row][3] === this.PLAYER) {
        score -= CENTER_COLUMN_VALUE
      }
    }

    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS - 3; col++) {
        score += this.evaluateWindow(
          [boardCopy[row][col], boardCopy[row][col + 1], boardCopy[row][col + 2], boardCopy[row][col + 3]],
          THREE_IN_ROW,
          TWO_IN_ROW,
          WIN_SCORE
        )
      }
    }

    for (let col = 0; col < this.COLS; col++) {
      for (let row = 0; row < this.ROWS - 3; row++) {
        score += this.evaluateWindow(
          [boardCopy[row][col], boardCopy[row + 1][col], boardCopy[row + 2][col], boardCopy[row + 3][col]],
          THREE_IN_ROW,
          TWO_IN_ROW,
          WIN_SCORE
        )
      }
    }

    for (let row = 0; row < this.ROWS - 3; row++) {
      for (let col = 0; col < this.COLS - 3; col++) {
        score += this.evaluateWindow(
          [boardCopy[row][col], boardCopy[row + 1][col + 1], boardCopy[row + 2][col + 2], boardCopy[row + 3][col + 3]],
          THREE_IN_ROW,
          TWO_IN_ROW,
          WIN_SCORE
        )
      }
    }

    for (let row = 3; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS - 3; col++) {
        score += this.evaluateWindow(
          [boardCopy[row][col], boardCopy[row - 1][col + 1], boardCopy[row - 2][col + 2], boardCopy[row - 3][col + 3]],
          THREE_IN_ROW,
          TWO_IN_ROW,
          WIN_SCORE
        )
      }
    }

    return score
  }

  evaluateWindow(window, threeScore, twoScore, winScore) {
    let score = 0
    const aiCount = window.filter(cell => cell === this.AI).length
    const playerCount = window.filter(cell => cell === this.PLAYER).length
    const emptyCount = window.filter(cell => cell === this.EMPTY).length

    if (aiCount === 4) {
      score += winScore
    } else if (aiCount === 3 && emptyCount === 1) {
      score += threeScore
    } else if (aiCount === 2 && emptyCount === 2) {
      score += twoScore
    }

    if (playerCount === 3 && emptyCount === 1) {
      score -= threeScore * 2
    }

    return score
  }

  minimax(depth, alpha, beta, isMaximizing, boardCopy) {
    const validMoves = this.getValidMovesForBoard(boardCopy)

    if (depth === 0 || validMoves.length === 0) {
      return { score: this.evaluateBoard(boardCopy), column: null }
    }

    for (const col of validMoves) {
      const moveInfo = this.simulateMove(col, isMaximizing ? this.AI : this.PLAYER, boardCopy)
      if (moveInfo) {
        const { row } = moveInfo
        if (this.checkWinForPosition(row, col, isMaximizing ? this.AI : this.PLAYER, boardCopy)) {
          this.undoMove(row, col, boardCopy)
          return {
            score: isMaximizing ? 1000000 : -1000000,
            column: col
          }
        }
        this.undoMove(row, col, boardCopy)
      }
    }

    if (isMaximizing) {
      let maxScore = Number.NEGATIVE_INFINITY
      let bestColumn = validMoves[0]

      for (const col of validMoves) {
        const moveInfo = this.simulateMove(col, this.AI, boardCopy)
        if (moveInfo) {
          const { row } = moveInfo
          const result = this.minimax(depth - 1, alpha, beta, false, boardCopy)
          this.undoMove(row, col, boardCopy)

          if (result.score > maxScore) {
            maxScore = result.score
            bestColumn = col
          }

          alpha = Math.max(alpha, maxScore)
          if (alpha >= beta) break
        }
      }

      return { score: maxScore, column: bestColumn }
    } else {
      let minScore = Number.POSITIVE_INFINITY
      let bestColumn = validMoves[0]

      for (const col of validMoves) {
        const moveInfo = this.simulateMove(col, this.PLAYER, boardCopy)
        if (moveInfo) {
          const { row } = moveInfo
          const result = this.minimax(depth - 1, alpha, beta, true, boardCopy)
          this.undoMove(row, col, boardCopy)

          if (result.score < minScore) {
            minScore = result.score
            bestColumn = col
          }

          beta = Math.min(beta, minScore)
          if (beta <= alpha) break
        }
      }

      return { score: minScore, column: bestColumn }
    }
  }

  getValidMovesForBoard(boardCopy) {
    const validMoves = []
    for (let col = 0; col < this.COLS; col++) {
      if (boardCopy[0][col] === this.EMPTY) {
        validMoves.push(col)
      }
    }
    return validMoves
  }

  makeAIMove() {
    if (this.gameOver) return null

    const boardCopy = JSON.parse(JSON.stringify(this.board))
    const MAX_DEPTH = 7
    let bestMove = null

    for (let depth = 3; depth <= MAX_DEPTH; depth++) {
      const result = this.minimax(depth, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, true, boardCopy)
      bestMove = result.column
      if (result.score >= 1000000) {
        break
      }
    }

    if (bestMove !== null && this.makeMove(bestMove, this.AI)) {
      return bestMove
    }

    return null
  }

  switchTurn() {
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
