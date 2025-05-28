import React from "react"
import { Cpu, Users, Code, Settings, Calendar, CheckCircle } from "lucide-react"

const NumberGameDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-300">
                Number Picker Duel
              </span>
              <span className="block text-white mt-1">Documentation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              Complete guide to understanding and implementing the human vs AI number picking game using Minimax and React hooks
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Overview */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-green-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Game Overview</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              In this game, two players (human and AI) alternately pick numbers from either end of a shared sequence. Each pick adds the chosen number to the player’s score. The AI uses Minimax with alpha-beta pruning to choose optimally. The goal is to outscore the opponent when all numbers are taken.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <Calendar className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Sequential Picks</h3>
                <p className="text-sm text-gray-400">Take from left or right</p>
              </div>
              <div className="text-center p-4">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Human Player</h3>
                <p className="text-sm text-gray-400">Interactive turn-based moves</p>
              </div>
              <div className="text-center p-4">
                <Cpu className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">AI Opponent</h3>
                <p className="text-sm text-gray-400">Minimax decision-making</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hook API */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Hook API Reference</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="space-y-4 text-gray-300 text-sm">
              <p><Code className="inline h-5 w-5 mr-2 text-blue-400" /> <span className="font-semibold">useNumberGame(initialSequence, humanStarts)</span> - Initialize game with number sequence and who starts.</p>
              <p><CheckCircle className="inline h-5 w-5 mr-2 text-green-400" /> <span className="font-semibold">currentSequence</span> - Remaining numbers in play.</p>
              <p><CheckCircle className="inline h-5 w-5 mr-2 text-green-400" /> <span className="font-semibold">humanScore</span>, <span className="font-semibold">aiScore</span> - Players’ scores.</p>
              <p><CheckCircle className="inline h-5 w-5 mr-2 text-green-400" /> <span className="font-semibold">currentPlayer</span> - Who’s turn: 'human' | 'ai'.</p>
              <p><CheckCircle className="inline h-5 w-5 mr-2 text-green-400" /> <span className="font-semibold">humanMove(position)</span> - Call with 'left' or 'right' to pick.</p>
              <p><CheckCircle className="inline h-5 w-5 mr-2 text-green-400" /> <span className="font-semibold">resetGame()</span> - Reset to initial state.</p>
            </div>
          </div>
        </section>

        {/* Algorithm Details */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-cyan-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Minimax Algorithm</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Code className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Backtracking Search</h3>
              <p className="text-gray-300 mb-4">
                Recursively simulate all pick sequences, tracking scores. At each node, choose move maximizing (AI) or minimizing (human) score difference.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-green-300"><CheckCircle className="h-4 w-4 mr-2" /> Alpha-beta pruning for efficiency</div>
                <div className="flex items-center text-green-300"><CheckCircle className="h-4 w-4 mr-2" /> Score difference evaluation</div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <Settings className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Configuration Options</h3>
              <p className="text-gray-300 mb-4">
                You can change initial sequence or starting player on the fly. The hook handles state updates and resets automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-1 bg-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Usage Guide</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Import Hook</h3>
                  <p>import {'{ useNumberGame }'} from './numbergame-utils'</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Initialize</h3>
                  <p>const {'{ currentSequence, humanMove, aiScore, gameOver }'} = useNumberGame([5,3,7,10], true)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Render UI</h3>
                  <p>Map <span className="font-semibold">currentSequence</span> and buttons to call <span className="font-semibold">humanMove</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default NumberGameDocumentation
