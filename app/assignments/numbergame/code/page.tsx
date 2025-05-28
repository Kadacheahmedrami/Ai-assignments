import React from "react"
import { Code, Clock, Settings, Cpu, Play, AlertTriangle, CheckCircle, GitBranch, Database } from "lucide-react"

const NumberGameUtilsDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
              Number Game Utility
            </span>
            <span className="block text-white mt-1">Hook Documentation</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Detailed documentation of the <code>useNumberGame</code> hook for human vs AI sequence picking game with minimax and alpha-beta pruning.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 flex items-center">
              <Code className="mr-2 h-4 w-4" /> View Source
            </button>
            <button className="px-8 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white font-medium hover:bg-slate-600 transition-colors flex items-center">
              <Play className="mr-2 h-4 w-4" /> Try Demo
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Type Definitions */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-10 bg-blue-500 mr-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">Type Definitions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
              <h3 className="text-xl font-semibold flex items-center mb-4"><Database className="mr-2" /> Core Types</h3>
              <pre className="bg-slate-900/50 p-4 rounded text-gray-300 text-sm overflow-auto">
{`type Player = 'human' | 'ai'
type Move = { player: Player; value: number; position: 'left' | 'right' }

interface NumberGameReturn {
  sequence: number[]
  currentSequence: number[]
  humanScore: number
  aiScore: number
  currentPlayer: Player
  thinking: boolean
  gameOver: boolean
  winner: Player | 'tie' | null
  lastMove: Move | null
  gameHistory: Move[]
  setSequence: (seq: number[]) => void
  setHumanFirst: (first: boolean) => void
  resetGame: () => void
  humanMove: (position: 'left' | 'right') => void
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Hook Implementation */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-10 bg-green-500 mr-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">Hook Implementation</h2>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-xl font-semibold flex items-center mb-4"><Settings className="mr-2 text-green-400" /> useNumberGame</h3>
            <pre className="bg-slate-900/50 p-4 rounded text-gray-300 text-sm overflow-auto">
{`export function useNumberGame(
  initialSequence: number[],
  humanStarts: boolean
): NumberGameReturn { ... }

// Internal state hooks for sequence, scores, currentPlayer, history, etc.
// resetGame() clears to initial state
// setHumanFirst(first: boolean) resets turn order

// minimax with alpha-beta pruning to compute AI move
function minimax(arr, isMax, alpha, beta, aiScoreVal, humanScoreVal) { ... }

// AI turn effect: delays, calls minimax, updates scores & sequence
// humanMove(position): updates human score & sequence
// End-of-game check effect: sets winner when sequence empty

return { sequence, currentSequence, humanScore, aiScore, currentPlayer, thinking, gameOver, winner, lastMove, gameHistory, setSequence, setHumanFirst, resetGame, humanMove }
`}</pre>
          </div>
        </section>

        {/* Minimax Details */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-10 bg-purple-500 mr-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">Minimax & Alpha-Beta Pruning</h2>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-xl font-semibold flex items-center mb-4"><Cpu className="mr-2 text-cyan-400" /> minimax()</h3>
            <pre className="bg-slate-900/50 p-4 rounded text-gray-300 text-sm overflow-auto">
{`// Recursively evaluate left & right picks
// Maximize aiScore - humanScore when isMax true
// Minimize when isMax false
// Alpha-beta cuts off branches for performance
`}
            </pre>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-green-300"><CheckCircle className="mr-2" /> Efficient game-tree pruning</div>
              <div className="flex items-center text-green-300"><CheckCircle className="mr-2" /> Returns best value & position</div>
            </div>
          </div>
        </section>

        {/* Hook Usage */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-10 bg-yellow-500 mr-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">Usage Example</h2>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-xl font-semibold flex items-center mb-4"><Play className="mr-2 text-yellow-400" /> Integrating the Hook</h3>
            <pre className="bg-slate-900/50 p-4 rounded text-gray-300 text-sm overflow-auto">
{`const sequence = [3, 9, 1, 2, 7]
const { currentSequence, humanScore, aiScore, currentPlayer, thinking, gameOver, winner, humanMove, resetGame } = useNumberGame(sequence, true)

return (
  <> 
    <Scoreboard human={humanScore} ai={aiScore} />
    <SequenceDisplay seq={currentSequence} onPick={humanMove} />
    { thinking && <Spinner /> }
    { gameOver && <Result winner={winner} /> }
    <button onClick={resetGame}>Restart</button>
  </>
)
`}
            </pre>
          </div>
        </section>

        {/* Complexity */}
        <section>
          <div className="flex items-center mb-6">
            <div className="w-1 h-10 bg-red-500 mr-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">Algorithm Complexity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
              <h3 className="text-xl font-semibold">Time Complexity</h3>
              <p className="mt-2 text-gray-300">O(2<sup>n</sup>) in worst case, pruned by alpha-beta for typical performance gains.</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
              <h3 className="text-xl font-semibold">Space Complexity</h3>
              <p className="mt-2 text-gray-300">O(n) recursion stack + O(n) for sequence copies.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-indigo-400 font-bold text-xl">Number Game Utility Hook</span>
          <p className="text-gray-400 mt-2">© 2025 Utility Library Documentation</p>
        </div>
      </footer>
    </div>
  )
}

export default NumberGameUtilsDocumentation
