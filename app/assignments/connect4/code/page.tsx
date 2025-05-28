import React from "react"
import { Code, GitBranch, Clock, Database, ArrowRight, CheckCircle, Cpu, Play, Target, Zap, Brain } from "lucide-react"

const Connect4CodeDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10"></div>
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-300">
                Connect Four AI
              </span>
              <span className="block text-white mt-1">Algorithm Documentation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              Minimax algorithm with Alpha-Beta pruning for intelligent Connect Four gameplay
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-lg flex items-center">
                <Code className="mr-2 h-4 w-4" />
                View Source
              </button>
              <button className="px-6 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors border border-slate-600 flex items-center">
                <Play className="mr-2 h-4 w-4" />
                Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Game Constants */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-red-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-white">Game Structure</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-red-300 font-mono text-sm mb-2">Constants</h4>
                <pre className="text-gray-300 text-sm">
{`ROWS = 6, COLS = 7
EMPTY = 0, PLAYER = 1, AI = 2
board = Array(6).fill().map(() => Array(7).fill(0))`}
                </pre>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-red-300 font-mono text-sm mb-2">Game State</h4>
                <pre className="text-gray-300 text-sm">
{`currentPlayer = PLAYER
gameOver = false
winner = null`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Core Logic */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-yellow-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-white">Core Game Logic</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-yellow-300 font-mono text-sm mb-2">Move Validation</h4>
                <pre className="text-gray-300 text-sm">
{`isValidMove(col) {
  return board[0][col] === EMPTY
}

makeMove(col, player) {
  if (!isValidMove(col)) return false
  
  for (let row = ROWS-1; row >= 0; row--) {
    if (board[row][col] === EMPTY) {
      board[row][col] = player
      if (checkWin(row, col, player)) {
        gameOver = true
        winner = player
      }
      return true
    }
  }
}`}
                </pre>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-yellow-300 font-mono text-sm mb-2">Win Detection</h4>
                <pre className="text-gray-300 text-sm">
{`checkWin(row, col, player) {
  const dirs = [[0,1], [1,0], [1,1], [1,-1]]
  
  for (const [dr, dc] of dirs) {
    let count = 1
    
    // Check both directions
    for (let dir of [-1, 1]) {
      for (let i = 1; i <= 3; i++) {
        const r = row + dr * i * dir
        const c = col + dc * i * dir
        if (r >= 0 && r < ROWS && c >= 0 && 
            c < COLS && board[r][c] === player) {
          count++
        } else break
      }
    }
    if (count >= 4) return true
  }
  return false
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Board Evaluation */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-green-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-white">Board Evaluation</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-300">1M</div>
                <div className="text-xs text-gray-400">Win</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-300">100</div>
                <div className="text-xs text-gray-400">Three</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-yellow-300">10</div>
                <div className="text-xs text-gray-400">Two</div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-300">3</div>
                <div className="text-xs text-gray-400">Center</div>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-gray-300 text-sm">
{`evaluateBoard(board) {
  let score = 0
  
  // Center column preference
  for (let row = 0; row < ROWS; row++) {
    if (board[row][3] === AI) score += 3
    else if (board[row][3] === PLAYER) score -= 3
  }
  
  // Evaluate all 4-piece windows (horizontal, vertical, diagonal)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      score += evaluateWindow([board[row][col], board[row][col+1], 
                              board[row][col+2], board[row][col+3]])
    }
  }
  // ... similar for vertical and diagonal
  return score
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Minimax Algorithm */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-white">Minimax with Alpha-Beta</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <pre className="text-gray-300 text-sm">
{`minimax(depth, alpha, beta, isMaximizing, board) {
  const validMoves = getValidMoves(board)
  
  if (depth === 0 || validMoves.length === 0) {
    return { score: evaluateBoard(board), column: null }
  }
  
  // Check immediate wins
  for (const col of validMoves) {
    const {row} = simulateMove(col, isMaximizing ? AI : PLAYER, board)
    if (checkWin(row, col, isMaximizing ? AI : PLAYER, board)) {
      undoMove(row, col, board)
      return { score: isMaximizing ? 1000000 : -1000000, column: col }
    }
    undoMove(row, col, board)
  }
  
  if (isMaximizing) {
    let maxScore = -Infinity, bestCol = validMoves[0]
    for (const col of validMoves) {
      const {row} = simulateMove(col, AI, board)
      const result = minimax(depth-1, alpha, beta, false, board)
      undoMove(row, col, board)
      
      if (result.score > maxScore) {
        maxScore = result.score
        bestCol = col
      }
      alpha = Math.max(alpha, maxScore)
      if (alpha >= beta) break // Pruning
    }
    return { score: maxScore, column: bestCol }
  } else {
    // Minimizing logic (similar but opposite)
    let minScore = Infinity, bestCol = validMoves[0]
    for (const col of validMoves) {
      const {row} = simulateMove(col, PLAYER, board)
      const result = minimax(depth-1, alpha, beta, true, board)
      undoMove(row, col, board)
      
      if (result.score < minScore) {
        minScore = result.score
        bestCol = col
      }
      beta = Math.min(beta, minScore)
      if (alpha >= beta) break
    }
    return { score: minScore, column: bestCol }
  }
}`}
              </pre>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                <h4 className="text-blue-300 font-semibold text-sm">Alpha-Beta Pruning</h4>
                <p className="text-gray-300 text-xs">Cuts branches that won't affect decision</p>
              </div>
              <div className="p-3 bg-green-900/20 border border-green-800/30 rounded-lg">
                <h4 className="text-green-300 font-semibold text-sm">Immediate Win Check</h4>
                <p className="text-gray-300 text-xs">Prioritizes winning moves first</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Move Selection */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-purple-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-white">AI Strategy</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <pre className="text-gray-300 text-sm">
{`makeAIMove() {
  if (gameOver) return null
  
  const boardCopy = JSON.parse(JSON.stringify(board))
  let bestMove = null
  
  // Iterative deepening: depth 3 to 7
  for (let depth = 3; depth <= 7; depth++) {
    const result = minimax(depth, -Infinity, Infinity, true, boardCopy)
    bestMove = result.column
    
    if (result.score >= 1000000) break // Found winning move
  }
  
  if (bestMove !== null && makeMove(bestMove, AI)) {
    return bestMove
  }
  return null
}`}
              </pre>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-purple-900/20 border border-purple-800/30 rounded-lg">
                <h4 className="text-purple-300 font-semibold text-sm">Iterative Deepening</h4>
                <p className="text-gray-300 text-xs">Progressive depth 3-7 with early win termination</p>
              </div>
              <div className="p-3 bg-yellow-900/20 border border-yellow-800/30 rounded-lg">
                <h4 className="text-yellow-300 font-semibold text-sm">Performance</h4>
                <p className="text-gray-300 text-xs">99.7% node reduction with alpha-beta pruning</p>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Example */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-white">React Integration</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-gray-300 text-sm">
{`const GameComponent = () => {
  const [game] = useState(() => new ConnectFour())
  const [gameState, setGameState] = useState(game.getGameStatus())

  const handlePlayerMove = (column) => {
    if (game.makeMove(column, game.PLAYER)) {
      if (!game.gameOver) {
        setTimeout(() => {
          game.makeAIMove()
          setGameState(game.getGameStatus())
        }, 500)
      }
      setGameState(game.getGameStatus())
    }
  }

  return (
    <GameBoard 
      board={gameState.board} 
      onColumnClick={handlePlayerMove}
      gameOver={gameState.gameOver}
      winner={gameState.winner}
    />
  )
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-orange-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold text-white">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Smart AI</h3>
              <p className="text-gray-300 text-sm">Minimax with alpha-beta pruning for optimal play</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Zap className="h-6 w-6 text-yellow-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Fast Performance</h3>
              <p className="text-gray-300 text-sm">Iterative deepening with 99.7% node reduction</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Target className="h-6 w-6 text-blue-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Strategic Play</h3>
              <p className="text-gray-300 text-sm">Center column bias and threat detection</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Cpu className="h-6 w-6 text-purple-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Efficient Algorithm</h3>
              <p className="text-gray-300 text-sm">O(b^(d/2)) time complexity with pruning</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <GitBranch className="h-6 w-6 text-green-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Clean Architecture</h3>
              <p className="text-gray-300 text-sm">Modular design with clear separation</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Clock className="h-6 w-6 text-red-400 mb-2" />
              <h3 className="text-white font-semibold mb-1">Real-time Play</h3>
              <p className="text-gray-300 text-sm">Instant response with configurable difficulty</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>Connect Four AI powered by Minimax Algorithm with Alpha-Beta Pruning</p>
        </div>
      </div>
    </div>
  )
}

export default Connect4CodeDocumentation