// ゲーム全体の状態を管理するContext

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { GameState, GameContextType } from '../types';

const initialState: GameState = {
  nickname: '',
  currentStage: 0,
  startTime: null,
  completedStages: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const setNickname = useCallback((nickname: string) => {
    setGameState(prev => ({ ...prev, nickname }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      startTime: Date.now(),
      currentStage: 1,
    }));
  }, []);

  const nextStage = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentStage: prev.currentStage + 1,
    }));
  }, []);

  const completeStage = useCallback((stageNumber: number) => {
    setGameState(prev => ({
      ...prev,
      completedStages: [...prev.completedStages, stageNumber],
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return (
    <GameContext.Provider
      value={{ gameState, setNickname, startGame, nextStage, completeStage, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};
