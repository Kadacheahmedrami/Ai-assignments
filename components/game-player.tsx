


// File: components/GamePlayer.tsx
'use client';
import { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RefreshCw, Brain, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useNumberGame } from '@/app/lib/numbergame-utils/logic';

export function GamePlayer() {
  const [inputSequence, setInputSequence] = useState('1,2,7,5');
  const [error, setError] = useState('');
  const {
    currentSequence,
    humanScore,
    aiScore,
    currentPlayer,
    thinking,
    gameOver,
    winner,
    lastMove,
    gameHistory,
    setSequence,
    setHumanFirst,
    resetGame,
    humanMove,
  } = useNumberGame([1,2,7,5], true);

  const handleSequenceChange = () => {
    try {
      const parsed = inputSequence.split(',').map((s) => {
        const num = parseInt(s.trim(), 10);
        if (isNaN(num) || num < 0) throw new Error('Invalid');
        return num;
      });
      if (parsed.length < 2) {
        setError('Sequence must have at least 2 numbers');
        return;
      }
      setSequence(parsed);
      resetGame();
      setError('');
    } catch {
      setError('Invalid sequence. Please enter positive numbers separated by commas.');
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-lg shadow-blue-900/20">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-300">Play Against AI</CardTitle>
        <CardDescription className="text-gray-400">Test your skills against the minimax algorithm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sequence input and controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="play-sequence" className="text-gray-300">Enter sequence (comma separated)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="play-sequence"
                value={inputSequence}
                onChange={(e) => setInputSequence(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <Button onClick={handleSequenceChange} variant="secondary" className="bg-blue-600 hover:bg-blue-700 text-white">
                Set
              </Button>
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          </div>
          <div className="flex-1">
            <Label className="text-gray-300">Who goes first?</Label>
            <div className="flex items-center gap-2 mt-2">
              <Switch checked={currentPlayer === 'human'} onCheckedChange={(chk) => setHumanFirst(chk)} />
              <Label className="text-gray-300">{currentPlayer === 'human' ? 'You go first' : 'AI goes first'}</Label>
              <Button variant="outline" size="sm" onClick={() => resetGame()} className="ml-auto">
                <RefreshCw className="h-4 w-4 mr-2" /> Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Scoreboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700 shadow-md">
            <div className="flex justify-between mb-4 items-center">
              <div className="flex items-center gap-2"><User className="h-5 w-5 text-blue-400" /><h3 className="text-xl font-semibold text-blue-400">You</h3></div>
              <div className="text-3xl text-white font-bold">{humanScore}</div>
            </div>
            <div className="flex justify-between mb-6 items-center">
              <div className="flex items-center gap-2"><Brain className="h-5 w-5 text-cyan-400" /><h3 className="text-xl font-semibold text-cyan-400">AI</h3></div>
              <div className="text-3xl text-white font-bold">{aiScore}</div>
            </div>
            {gameOver && (
              <Alert variant={winner === 'human' ? 'default' : winner === 'ai' ? 'destructive' : undefined}>
                <AlertDescription className="text-lg text-white font-medium">
                  {winner === 'human' ? 'You Win! 🎉' : winner === 'ai' ? 'AI Wins! 🤖' : "It's a Tie! 🤝"}
                </AlertDescription>
              </Alert>
            )}
            {lastMove && (
              <p className="text-gray-300">
                Last move: <span className="font-medium">{lastMove.player === 'human' ? 'You' : 'AI'}</span> took <span className="font-bold text-white">{lastMove.value}</span> from <span className="font-medium">{lastMove.position}</span>
              </p>
            )}
            <div className="flex gap-2 mt-4">
              <Button onClick={() => humanMove('left')} disabled={currentPlayer !== 'human' || gameOver || thinking} className="flex-1">
                Take Left
              </Button>
              <Button onClick={() => humanMove('right')} disabled={currentPlayer !== 'human' || gameOver || thinking} className="flex-1">
                Take Right
              </Button>
            </div>
          </div>

          {/* Sequence & History */}
          <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700 shadow-md flex flex-col h-96">
            <h3 className="text-xl text-gray-300 mb-4">Current Sequence</h3>
            <div className="flex flex-wrap justify-center mb-6 min-h-[60px]">
              <AnimatePresence>
                {currentSequence.length ? currentSequence.map((num, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 m-1 bg-gray-700 text-white flex items-center justify-center rounded-md shadow"
                  >
                    {num}
                  </motion.div>
                )) : (
                  <p className="text-gray-400">No numbers left</p>
                )}
              </AnimatePresence>
            </div>
            <h3 className="text-xl text-gray-300 mb-4">Game History</h3>
            <div className="flex-1 overflow-y-auto space-y-2">
              {gameHistory.length ? gameHistory.map((move, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex justify-between p-3 rounded',
                    move.player === 'human' ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-900/20 border-cyan-800'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {move.player === 'human' ? <User className="h-4 w-4 text-blue-400" /> : <Brain className="h-4 w-4 text-cyan-400" />}
                    <span className="text-gray-300">{move.player === 'human' ? 'You' : 'AI'} took {move.value}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">from {move.position}</Badge>
                </div>
              )) : (
                <p className="text-gray-400 text-center">No moves yet</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
