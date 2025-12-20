# アーキテクチャ設計書

本ドキュメントは『The Unsubscribe』プロジェクトのアーキテクチャ設計を説明します。

---

## 1. システム概要

### 1.1 アーキテクチャパターン

- **クライアントサイドレンダリング (CSR)**
- **シングルページアプリケーション (SPA)**
- **コンポーネントベースアーキテクチャ**

### 1.2 技術スタック

```
Frontend: React 18 + TypeScript
Routing: React Router v6
State Management: Context API + React Hooks
Styling: CSS Modules / Styled Components
Build Tool: Create React App
Hosting: Firebase Hosting
```

---

## 2. ディレクトリ構造

```
the-unsubscribe/
├── public/                      # 静的ファイル
│   ├── index.html
│   ├── favicon.ico
│   └── assets/                  # 画像、アイコン等
├── src/
│   ├── components/              # 再利用可能なコンポーネント
│   │   ├── common/              # 汎用コンポーネント
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── index.ts
│   │   ├── layout/              # レイアウトコンポーネント
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── pages/                   # ページコンポーネント
│   │   ├── StartPage/
│   │   │   ├── StartPage.tsx
│   │   │   ├── StartPage.module.css
│   │   │   └── index.ts
│   │   ├── ResultPage/
│   │   └── index.ts
│   ├── stages/                  # 各ステージのコンポーネント
│   │   ├── Stage1/
│   │   │   ├── Stage1.tsx
│   │   │   ├── Stage1.module.css
│   │   │   ├── components/      # ステージ固有のコンポーネント
│   │   │   │   ├── ProductList/
│   │   │   │   └── Footer/
│   │   │   └── index.ts
│   │   ├── Stage2/
│   │   ├── Stage3/
│   │   ├── Stage4/
│   │   ├── Stage5/
│   │   └── index.ts
│   ├── hooks/                   # カスタムフック
│   │   ├── useGameState.ts      # ゲーム状態管理
│   │   ├── useTimer.ts          # タイマー機能
│   │   ├── useLocalStorage.ts   # ローカルストレージ操作
│   │   └── index.ts
│   ├── contexts/                # React Context
│   │   ├── GameContext.tsx      # ゲーム全体の状態管理
│   │   └── index.ts
│   ├── utils/                   # ユーティリティ関数
│   │   ├── nameGenerator.ts     # ランダム名前生成
│   │   ├── timeFormatter.ts     # 時間フォーマット
│   │   ├── shareUtils.ts        # SNS共有機能
│   │   └── index.ts
│   ├── types/                   # 型定義
│   │   ├── game.ts              # ゲーム関連の型
│   │   ├── stage.ts             # ステージ関連の型
│   │   └── index.ts
│   ├── constants/               # 定数
│   │   ├── routes.ts            # ルート定義
│   │   ├── messages.ts          # メッセージ定義
│   │   ├── stages.ts            # ステージ情報
│   │   └── index.ts
│   ├── styles/                  # グローバルスタイル
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── reset.css
│   ├── App.tsx                  # アプリケーションルート
│   ├── router.tsx               # ルーティング設定
│   └── index.tsx                # エントリーポイント
├── docs/                        # ドキュメント
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. ルーティング設計

### 3.1 ルート定義

```typescript
// src/constants/routes.ts
export const ROUTES = {
  START: '/',
  STAGE_1: '/stage/1',
  STAGE_2: '/stage/2',
  STAGE_3: '/stage/3',
  STAGE_4: '/stage/4',
  STAGE_5: '/stage/5',
  RESULT: '/result',
} as const;
```

### 3.2 ルーティング実装

```typescript
// src/router.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { ResultPage } from './pages/ResultPage';
import { Stage1, Stage2, Stage3, Stage4, Stage5 } from './stages';
import { ROUTES } from './constants/routes';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.START} element={<StartPage />} />
        <Route path={ROUTES.STAGE_1} element={<Stage1 />} />
        <Route path={ROUTES.STAGE_2} element={<Stage2 />} />
        <Route path={ROUTES.STAGE_3} element={<Stage3 />} />
        <Route path={ROUTES.STAGE_4} element={<Stage4 />} />
        <Route path={ROUTES.STAGE_5} element={<Stage5 />} />
        <Route path={ROUTES.RESULT} element={<ResultPage />} />
        <Route path="*" element={<Navigate to={ROUTES.START} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
```

### 3.3 ステージ遷移のガード（任意）

プレイヤーが順番にステージをクリアしているかチェックする機能（将来実装）。

```typescript
// src/components/StageGuard.tsx
const StageGuard: React.FC<{ stageNumber: number; children: React.ReactNode }> = ({
  stageNumber,
  children,
}) => {
  const { gameState } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    // 前のステージがクリアされていない場合、スタート画面へリダイレクト
    if (!gameState.completedStages.includes(stageNumber - 1)) {
      navigate(ROUTES.START);
    }
  }, [gameState, stageNumber, navigate]);

  return <>{children}</>;
};
```

---

## 4. 状態管理設計

### 4.1 グローバル状態（Context API）

```typescript
// src/types/game.ts
export interface GameState {
  nickname: string;              // プレイヤーのニックネーム
  currentStage: number;          // 現在のステージ番号 (0-5)
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
```

```typescript
// src/contexts/GameContext.tsx
import { createContext, useContext, useState, useCallback } from 'react';
import type { GameState, GameContextType } from '../types/game';

const initialState: GameState = {
  nickname: '',
  currentStage: 0,
  startTime: null,
  completedStages: [],
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
```

### 4.2 ローカル状態（useState）

各コンポーネント内で管理する一時的な状態：
- フォームの入力値
- モーダルの開閉状態
- ローディング状態

### 4.3 ローカルストレージ

永続化が必要なデータ（任意）：
- プレイヤーのニックネーム（次回プレイ時に再利用）
- 設定情報（音量等）

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
```

---

## 5. コンポーネント設計

### 5.1 コンポーネント階層

```
App
├── GameProvider (Context)
└── AppRouter
    ├── StartPage
    │   ├── NicknameInput
    │   └── StartButton
    ├── Stage1
    │   ├── StageLayout
    │   ├── ProductList
    │   └── Footer (退会リンクを含む)
    ├── Stage2
    ├── Stage3
    ├── Stage4
    ├── Stage5
    └── ResultPage
        ├── ScoreDisplay
        └── ShareButton
```

### 5.2 共通コンポーネント

#### Button

```typescript
// src/components/common/Button/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

#### Input

```typescript
// src/components/common/Input/Input.tsx
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      className="input"
    />
  );
};
```

#### Modal

```typescript
// src/components/common/Modal/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
```

---

## 6. データフロー

### 6.1 ゲーム開始フロー

```
1. StartPage: プレイヤーがニックネームを入力
2. setNickname(): Context にニックネームを保存
3. startGame(): ゲーム開始時刻を記録、currentStage を 1 に設定
4. navigate(ROUTES.STAGE_1): ステージ1へ遷移
```

### 6.2 ステージクリアフロー

```
1. Stage1: プレイヤーが退会ボタンを見つけてクリック
2. completeStage(1): Context にステージ1のクリアを記録
3. nextStage(): currentStage を 2 に更新
4. navigate(ROUTES.STAGE_2): ステージ2へ遷移
```

### 6.3 ゲーム終了フロー

```
1. Stage5: プレイヤーがステージ5をクリア
2. completeStage(5): Context に記録
3. navigate(ROUTES.RESULT): 結果画面へ遷移
4. ResultPage:
   - startTime と現在時刻から総プレイ時間を計算
   - ニックネームとプレイ時間を表示
   - SNS共有ボタンを表示
```

---

## 7. ステージ設計

### 7.1 ステージ共通インターフェース

```typescript
// src/types/stage.ts
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
```

### 7.2 ステージ情報の定義

```typescript
// src/constants/stages.ts
import type { StageInfo } from '../types/stage';

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
```

### 7.3 ステージコンポーネントの実装例

```typescript
// src/stages/Stage1/Stage1.tsx
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { ROUTES } from '../../constants/routes';
import './Stage1.module.css';

export const Stage1: React.FC = () => {
  const navigate = useNavigate();
  const { completeStage, nextStage } = useGame();

  const handleUnsubscribe = () => {
    completeStage(1);
    nextStage();
    navigate(ROUTES.STAGE_2);
  };

  return (
    <div className="stage1">
      <header className="stage1-header">
        <h1>BuyMore - オンラインショッピング</h1>
      </header>

      <main className="stage1-content">
        {/* ECサイトのコンテンツ */}
        <div className="products">
          {/* 商品リスト */}
        </div>
      </main>

      <footer className="stage1-footer">
        {/* 多くのリンクの中に紛れ込む退会リンク */}
        <a href="#about">About</a>
        <a href="#terms">Terms</a>
        <a href="#privacy">Privacy</a>
        <button onClick={handleUnsubscribe} className="tiny-link">
          退会
        </button>
        <a href="#contact">Contact</a>
      </footer>
    </div>
  );
};
```

---

## 8. ユーティリティ関数

### 8.1 ランダム名前生成

```typescript
// src/utils/nameGenerator.ts
const ADJECTIVES = ['Happy', 'Lucky', 'Brave', 'Swift', 'Clever', 'Gentle'];
const NOUNS = ['Tiger', 'Eagle', 'Dolphin', 'Phoenix', 'Dragon', 'Wolf'];

export const generateRandomName = (): string => {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${number}`;
};
```

### 8.2 時間フォーマット

```typescript
// src/utils/timeFormatter.ts
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const formatDetailedTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}時間${minutes}分${seconds}秒`;
  } else if (minutes > 0) {
    return `${minutes}分${seconds}秒`;
  } else {
    return `${seconds}秒`;
  }
};
```

### 8.3 SNS共有

```typescript
// src/utils/shareUtils.ts
export const shareToTwitter = (nickname: string, elapsedTime: string) => {
  const text = `「The Unsubscribe」を${elapsedTime}でクリアしました！\nニックネーム: ${nickname}\n\nあなたも退会の困難さを体験してみませんか？`;
  const url = window.location.origin;
  const hashtags = 'TheUnsubscribe,ダークパターン';

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;

  window.open(twitterUrl, '_blank', 'width=550,height=420');
};
```

---

## 9. スタイリング設計

### 9.1 CSS Modules を使用

各コンポーネントに対応するCSSファイルを作成。

```css
/* src/components/common/Button/Button.module.css */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-small {
  padding: 5px 10px;
  font-size: 14px;
}

.btn-large {
  padding: 15px 30px;
  font-size: 18px;
}
```

### 9.2 CSS変数でテーマ管理

```css
/* src/styles/variables.css */
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  --color-info: #17a2b8;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Typography */
  --font-family: 'Helvetica Neue', Arial, sans-serif;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;

  /* Transitions */
  --transition-fast: 0.15s;
  --transition-normal: 0.3s;
  --transition-slow: 0.5s;
}
```

---

## 10. パフォーマンス最適化

### 10.1 コード分割

```typescript
// src/router.tsx
import { lazy, Suspense } from 'react';

const Stage1 = lazy(() => import('./stages/Stage1'));
const Stage2 = lazy(() => import('./stages/Stage2'));
const Stage3 = lazy(() => import('./stages/Stage3'));
const Stage4 = lazy(() => import('./stages/Stage4'));
const Stage5 = lazy(() => import('./stages/Stage5'));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={ROUTES.STAGE_1} element={<Stage1 />} />
          {/* ... */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

### 10.2 メモ化

```typescript
// 不要な再レンダリングを防ぐ
const MemoizedButton = React.memo(Button);

// 計算コストの高い処理をメモ化
const totalTime = useMemo(() => {
  if (!startTime) return 0;
  return Date.now() - startTime;
}, [startTime]);
```

---

## 11. エラーハンドリング

### 11.1 Error Boundary

```typescript
// src/components/ErrorBoundary.tsx
// (react-best-practices.md を参照)
```

### 11.2 404ページ

```typescript
// すべてのルートをスタートページにリダイレクト
<Route path="*" element={<Navigate to={ROUTES.START} replace />} />
```

---

## 12. セキュリティ考慮事項

### 12.1 XSS対策

- ユーザー入力（ニックネーム）はReactが自動でエスケープ
- `dangerouslySetInnerHTML` は使用しない

### 12.2 Content Security Policy (CSP)

```html
<!-- public/index.html -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';">
```

---

## 13. 将来的な拡張性

### 13.1 i18n対応

```typescript
// src/hooks/useTranslation.ts
export const useTranslation = () => {
  const [locale, setLocale] = useState<'ja' | 'en'>('ja');
  // 翻訳ロジック
};
```

### 13.2 ランキング機能

Firestoreを導入してランキングデータを保存。

```typescript
// src/services/firestore.ts
export const saveScore = async (nickname: string, time: number) => {
  // Firestoreにスコアを保存
};

export const getTopScores = async () => {
  // トップスコアを取得
};
```

---

**最終更新**: 2025-12-20
