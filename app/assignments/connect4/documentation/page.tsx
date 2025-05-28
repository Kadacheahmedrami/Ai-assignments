import React from "react"
import { Code, GitBranch, Clock, Database, ArrowRight, CheckCircle, Cpu, Play, Target, Zap, Brain } from "lucide-react"

const ConnectDocumentation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
        <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300">
                Connect Four AI
              </span>
              <span className="block text-white mt-1">Full Algorithm Documentation</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
              Complete walkthrough of constants, game logic, board evaluation, and Minimax algorithm with Alpha-Beta pruning.
            </p>
            <div className="mt-8 flex gap-4 justify-center">
              <button className="px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors shadow-lg flex items-center">
                <Code className="mr-2 h-4 w-4" />
                View Source
              </button>
              <button className="px-6 py-3 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors border border-slate-600 flex items-center">
                <Play className="mr-2 h-4 w-4" />
                Live Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Game Constants */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold">Game Structure</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-indigo-300 font-mono text-sm mb-2">Constants</h4>
                <pre className="text-gray-300 text-sm">
{`const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER = 1;
const AI = 2;
let board = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));`}
                </pre>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-indigo-300 font-mono text-sm mb-2">Initial State</h4>
                <pre className="text-gray-300 text-sm">
{`let currentPlayer = PLAYER;
let gameOver = false;
let winner = null;`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Core Logic */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-purple-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold">Core Game Logic</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-purple-300 font-mono text-sm mb-2">Move Validation & Placement</h4>
                <pre className="text-gray-300 text-sm">
{`function isValidMove(col) {
  return board[0][col] === EMPTY;
}

function makeMove(col, player) {
  if (!isValidMove(col)) return false;
  for (let row = ROWS - 1; row >= 0; row--) {
    if (board[row][col] === EMPTY) {
      board[row][col] = player;
      if (checkWin(row, col, player)) {
        gameOver = true;
        winner = player;
      }
      return true;
    }
  }
  return false;
}`}
                </pre>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-purple-300 font-mono text-sm mb-2">Win Detection</h4>
                <pre className="text-gray-300 text-sm">
{`function checkWin(row, col, player) {
  const directions = [[0,1], [1,0], [1,1], [1,-1]];
  for (let [dr, dc] of directions) {
    let count = 1;
    for (let dir of [-1,1]) {
      for (let i = 1; i < 4; i++) {
        const r = row + dr * i * dir;
        const c = col + dc * i * dir;
        if (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
          count++;
        } else break;
      }
    }
    if (count >= 4) return true;
  }
  return false;
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
            <h2 className="text-2xl font-bold">Board Evaluation</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-300">+1000000</div>
                <div className="text-xs text-gray-400">Win</div>
              </div>
              ...
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-gray-300 text-sm">
{`function evaluateBoard(board) {
  let score = 0;
  // Center preference
  for (let row = 0; row < ROWS; row++) {
    if (board[row][Math.floor(COLS/2)] === AI) score += 3;
    else if (board[row][Math.floor(COLS/2)] === PLAYER) score -= 3;
  }
  // Evaluate windows
  // ...
  return score;
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Minimax & Alpha-Beta */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-blue-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold">Minimax with Alpha-Beta</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <pre className="text-gray-300 text-sm mb-4">
{`function minimax(depth, alpha, beta, maximizingPlayer) {
  const validMoves = getValidMoves(board);
  if (depth === 0 || validMoves.length === 0) {
    return { score: evaluateBoard(board), column: null };
  }
  // Immediate win check
  for (let col of validMoves) {
    let { row } = simulateMove(col, maximizingPlayer ? AI : PLAYER);
    if (checkWin(row, col, maximizingPlayer ? AI : PLAYER)) {
      undoMove(row, col);
      return { score: maximizingPlayer ? 1000000 : -1000000, column: col };
    }
    undoMove(row, col);
  }
  if (maximizingPlayer) {
    let maxEval = -Infinity, bestCol = validMoves[0];
    for (let col of validMoves) {
      let { row } = simulateMove(col, AI);
      let { score } = minimax(depth - 1, alpha, beta, false);
      undoMove(row, col);
      if (score > maxEval) { maxEval = score; bestCol = col; }
      alpha = Math.max(alpha, maxEval);
      if (alpha >= beta) break;
    }
    return { score: maxEval, column: bestCol };
  } else {
    let minEval = Infinity, bestCol = validMoves[0];
    for (let col of validMoves) {
      let { row } = simulateMove(col, PLAYER);
      let { score } = minimax(depth - 1, alpha, beta, true);
      undoMove(row, col);
      if (score < minEval) { minEval = score; bestCol = col; }
      beta = Math.min(beta, minEval);
      if (alpha >= beta) break;
    }
    return { score: minEval, column: bestCol };
  }
}`}
            </pre>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-sm text-blue-300">Alpha-Beta Pruning</h4>
                <p className="text-xs text-gray-300">Prunes branches to improve performance.</p>
              </div>
              <div className="p-3 bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-sm text-green-300">Immediate Win</h4>
                <p className="text-xs text-gray-300">Checks and returns winning moves first.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Move Selection */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-purple-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold">AI Move Selection</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <pre className="text-gray-300 text-sm">
{`function makeAIMove() {
  if (gameOver) return null;
  let bestChoice = null;
  // Iterative deepening
  for (let depth = 4; depth <= 8; depth++) {
    const result = minimax(depth, -Infinity, Infinity, true);
    bestChoice = result.column;
    if (result.score >= 1000000) break;
  }
  makeMove(bestChoice, AI);
  return bestChoice;
}`}
            </pre>
          </div>
        </section>

        {/* React Integration */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold">React Integration Example</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <pre className="text-gray-300 text-sm">
{`import React, { useState } from 'react';
import GameBoard from './GameBoard';
import ConnectFour from './ConnectFour';

const GameComponent = () => {
  const [game] = useState(() => new ConnectFour());
  const [state, setState] = useState(game.getGameStatus());

  const handleColumnClick = col => {
    if (game.makeMove(col, game.PLAYER)) {
      setState(game.getGameStatus());
      if (!game.gameOver) {
        setTimeout(() => {
          game.makeAIMove();
          setState(game.getGameStatus());
        }, 300);
      }
    }
  };

  return (
    <GameBoard
      board={state.board}
      onColumnClick={handleColumnClick}
      gameOver={state.gameOver}
      winner={state.winner}
    />
  );
};

export default GameComponent;`}
            </pre>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="h-8 w-1 bg-orange-500 rounded-full mr-4"></div>
            <h2 className="text-2xl font-bold">Key Highlights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <CheckCircle className="h-6 w-6 text-green-400 mb-2" />
              <h3 className="font-semibold">Smart AI</h3>
              <p className="text-xs text-gray-300">Optimal play via Minimax + Alpha-Beta.</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Zap className="h-6 w-6 text-yellow-400 mb-2" />
              <h3 className="font-semibold">High Performance</h3>
              <p className="text-xs text-gray-300">Pruning reduces node count by 99%.</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Target className="h-6 w-6 text-blue-400 mb-2" />
              <h3 className="font-semibold">Strategic Play</h3>
              <p className="text-xs text-gray-300">Center bias and threat detection.</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Cpu className="h-6 w-6 text-purple-400 mb-2" />
              <h3 className="font-semibold">Efficient Algorithm</h3>
              <p className="text-xs text-gray-300">Time complexity O(b^(d/2)).</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <GitBranch className="h-6 w-6 text-green-400 mb-2" />
              <h3 className="font-semibold">Modular Architecture</h3>
              <p className="text-xs text-gray-300">Separation of concerns.</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <Clock className="h-6 w-6 text-red-400 mb-2" />
              <h3 className="font-semibold">Real-time Play</h3>
              <p className="text-xs text-gray-300">Instant feedback, adjustable difficulty.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2025 Connect Four AI • Crafted with React & Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}

export default ConnectDocumentation;
