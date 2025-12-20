// ステージ情報の定義

import type { StageInfo } from '../types';

export const STAGES: StageInfo[] = [
  {
    id: 1,
    name: 'BuyMore',
    title: 'オンラインショッピングサイト',
    description: '初回送料無料に釣られて登録してしまった',
  },
  {
    id: 2,
    name: 'Info-Sphere',
    title: 'ニュースアプリ',
    description: '限定記事を読むために登録',
  },
  {
    id: 3,
    name: 'Fan-Circle',
    title: 'クリエイター支援SNS',
    description: '限定コンテンツのために登録',
  },
  {
    id: 4,
    name: 'Sky-Cheap',
    title: '格安航空券予約サイト',
    description: '一度だけ利用した',
  },
  {
    id: 5,
    name: 'Everything',
    title: '総合エンタメプラットフォーム',
    description: 'あらゆる機能が統合された巨大プラットフォーム',
  },
];

export const TOTAL_STAGES = STAGES.length;
