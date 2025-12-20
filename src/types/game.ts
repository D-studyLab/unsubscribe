// ゲーム全体の状態を管理する型定義

export interface GameState {
  nickname: string;              // プレイヤーのニックネーム
  currentStage: number;          // 現在のステージ番号 (0: スタート, 1-5: ステージ, 6: 結果)
  startTime: number | null;      // ゲーム開始時刻（Unix timestamp）
  completedStages: number[];     // クリア済みステージ番号の配列
}

export interface GameContextType {
  gameState: GameState;
  setNickname: (nickname: string) => void;
  startGame: () => void;
  nextStage: () => void;
  completeStage: (stageNumber: number) => void;
  resetGame: () => void;
}
