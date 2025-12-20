// ステージ関連の型定義

export interface StageProps {
  stageNumber: number;
  onComplete: () => void;
}

export interface StageInfo {
  id: number;
  name: string;
  title: string;
  description: string;
}
