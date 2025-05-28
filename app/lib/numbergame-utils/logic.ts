// File: app/lib/numbergame-utils.ts
import { useState, useEffect } from 'react';

type Player = 'human' | 'ai';
type Move = { player: Player; value: number; position: 'left' | 'right' };

interface NumberGameReturn {
  sequence: number[];
  currentSequence: number[];
  humanScore: number;
  aiScore: number;
  currentPlayer: Player;
  thinking: boolean;
  gameOver: boolean;
  winner: Player | 'tie' | null;
  lastMove: Move | null;
  gameHistory: Move[];
  setSequence: (seq: number[]) => void;
  setHumanFirst: (first: boolean) => void;
  resetGame: () => void;
  humanMove: (position: 'left' | 'right') => void;
}

export function useNumberGame(
  initialSequence: number[],
  humanStarts: boolean
): NumberGameReturn {
  const [sequence, setSequence] = useState<number[]>(initialSequence);
  const [currentSequence, setCurrentSequence] = useState<number[]>(initialSequence);
  const [humanScore, setHumanScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    humanStarts ? 'human' : 'ai'
  );
  const [humanFirst, _setHumanFirst] = useState(humanStarts);
  const [thinking, setThinking] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [lastMove, setLastMove] = useState<Move | null>(null);
  const [gameHistory, setGameHistory] = useState<Move[]>([]);

  // reset
  const resetGame = () => {
    setCurrentSequence([...sequence]);
    setHumanScore(0);
    setAiScore(0);
    setCurrentPlayer(humanFirst ? 'human' : 'ai');
    setGameOver(false);
    setWinner(null);
    setLastMove(null);
    setGameHistory([]);
  };

  // allow changing humanFirst
  const setHumanFirst = (first: boolean) => {
    _setHumanFirst(first);
    resetGame();
  };

  // minimax with alpha-beta
  function minimax(
    arr: number[],
    isMax: boolean,
    alpha: number,
    beta: number,
    aiScoreVal: number,
    humanScoreVal: number
  ): { value: number; position?: 'left' | 'right' } {
    if (arr.length === 0) {
      return { value: aiScoreVal - humanScoreVal };
    }
    let bestMove: 'left' | 'right' | undefined;
    if (isMax) {
      let best = -Infinity;
      // left
      const left = minimax(
        arr.slice(1),
        false,
        alpha,
        beta,
        aiScoreVal + arr[0],
        humanScoreVal
      ).value;
      if (left > best) {
        best = left;
        bestMove = 'left';
      }
      alpha = Math.max(alpha, best);
      if (alpha < beta) {
        const right = minimax(
          arr.slice(0, -1),
          false,
          alpha,
          beta,
          aiScoreVal + arr[arr.length - 1],
          humanScoreVal
        ).value;
        if (right > best) {
          best = right;
          bestMove = 'right';
        }
        alpha = Math.max(alpha, best);
      }
      return { value: best, position: bestMove };
    } else {
      let best = Infinity;
      const left = minimax(
        arr.slice(1),
        true,
        alpha,
        beta,
        aiScoreVal,
        humanScoreVal + arr[0]
      ).value;
      if (left < best) {
        best = left;
        bestMove = 'left';
      }
      beta = Math.min(beta, best);
      if (alpha < beta) {
        const right = minimax(
          arr.slice(0, -1),
          true,
          alpha,
          beta,
          aiScoreVal,
          humanScoreVal + arr[arr.length - 1]
        ).value;
        if (right < best) {
          best = right;
          bestMove = 'right';
        }
        beta = Math.min(beta, best);
      }
      return { value: best, position: bestMove };
    }
  }

  // AI move
  useEffect(() => {
    if (currentPlayer !== 'ai' || gameOver) return;
    setThinking(true);
    const timer = setTimeout(() => {
      const { position } = minimax(
        currentSequence,
        true,
        -Infinity,
        Infinity,
        aiScore,
        humanScore
      );
      if (!position) return;
      const value =
        position === 'left'
          ? currentSequence[0]
          : currentSequence[currentSequence.length - 1];
      setAiScore((s) => s + value);
      setCurrentSequence((seq) =>
        position === 'left' ? seq.slice(1) : seq.slice(0, -1)
      );
      const move: Move = { player: 'ai', value, position };
      setLastMove(move);
      setGameHistory((h) => [...h, move]);
      setCurrentPlayer('human');
      setThinking(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPlayer, gameOver, currentSequence]);

  // Human move
  const humanMove = (position: 'left' | 'right') => {
    if (gameOver || currentPlayer !== 'human') return;
    const value =
      position === 'left'
        ? currentSequence[0]
        : currentSequence[currentSequence.length - 1];
    setHumanScore((s) => s + value);
    setCurrentSequence((seq) =>
      position === 'left' ? seq.slice(1) : seq.slice(0, -1)
    );
    const move: Move = { player: 'human', value, position };
    setLastMove(move);
    setGameHistory((h) => [...h, move]);
    setCurrentPlayer('ai');
  };

  // check end
  useEffect(() => {
    if (currentSequence.length === 0 && !gameOver) {
      setGameOver(true);
      if (humanScore > aiScore) setWinner('human');
      else if (aiScore > humanScore) setWinner('ai');
      else setWinner('tie');
    }
  }, [currentSequence]);

  return {
    sequence,
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
  };
}
