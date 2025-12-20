# React + TypeScript ベストプラクティス

本ドキュメントは『The Unsubscribe』プロジェクトにおけるReact開発のガイドラインです。

---

## 1. プロジェクト構造

### 1.1 推奨ディレクトリ構成

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── common/         # 汎用コンポーネント（Button, Input等）
│   ├── layout/         # レイアウトコンポーネント（Header, Footer等）
│   └── index.ts        # エクスポートの集約
├── pages/              # ページコンポーネント
│   ├── StartPage.tsx
│   ├── ResultPage.tsx
│   └── index.ts
├── stages/             # 各ステージのコンポーネント
│   ├── Stage1/
│   │   ├── Stage1.tsx
│   │   ├── components/
│   │   └── index.ts
│   ├── Stage2/
│   └── ...
├── hooks/              # カスタムフック
│   ├── useGameState.ts
│   ├── useTimer.ts
│   └── useLocalStorage.ts
├── contexts/           # React Context
│   ├── GameContext.tsx
│   └── index.ts
├── utils/              # ユーティリティ関数
│   ├── nameGenerator.ts
│   ├── timeFormatter.ts
│   └── index.ts
├── types/              # 型定義
│   ├── game.ts
│   ├── stage.ts
│   └── index.ts
├── constants/          # 定数
│   ├── routes.ts
│   ├── messages.ts
│   └── index.ts
├── styles/             # グローバルスタイル
│   ├── global.css
│   └── variables.css
├── assets/             # 静的ファイル
│   ├── images/
│   └── sounds/
├── App.tsx
├── index.tsx
└── router.tsx
```

---

## 2. コンポーネント設計

### 2.1 関数コンポーネントを使用

クラスコンポーネントは使用せず、常に関数コンポーネントを使用します。

```typescript
// ✅ Good
const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

// ❌ Bad
class Button extends React.Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.label}</button>;
  }
}
```

### 2.2 Props の型定義

すべてのコンポーネントにProps型を定義します。

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// ❌ Bad
const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.label}</button>;
};
```

### 2.3 コンポーネントの分割

1つのコンポーネントは100行以内を目安に、責務を明確にします。

```typescript
// ✅ Good - 小さく分割
const StageHeader: React.FC<StageHeaderProps> = ({ title, stageNumber }) => {
  return (
    <header>
      <h1>{title}</h1>
      <p>Stage {stageNumber} / 5</p>
    </header>
  );
};

const StageContent: React.FC<StageContentProps> = ({ children }) => {
  return <main className="stage-content">{children}</main>;
};

const Stage1: React.FC = () => {
  return (
    <>
      <StageHeader title="BuyMore" stageNumber={1} />
      <StageContent>{/* ステージ固有のコンテンツ */}</StageContent>
    </>
  );
};
```

---

## 3. Hooks の使用

### 3.1 基本的なHooks

#### useState
状態管理に使用。初期値の型を明示します。

```typescript
// ✅ Good
const [nickname, setNickname] = useState<string>('');
const [isLoading, setIsLoading] = useState<boolean>(false);
const [count, setCount] = useState<number>(0);

// ❌ Bad
const [nickname, setNickname] = useState(''); // 型推論に頼りすぎ
```

#### useEffect
副作用の処理に使用。依存配列を必ず指定します。

```typescript
// ✅ Good
useEffect(() => {
  const timer = setInterval(() => {
    setElapsedTime(prev => prev + 1);
  }, 1000);

  return () => clearInterval(timer); // クリーンアップ関数
}, []); // 依存配列を明示

// ❌ Bad
useEffect(() => {
  setElapsedTime(elapsedTime + 1);
}); // 依存配列がないと無限ループ
```

#### useCallback
関数のメモ化に使用。子コンポーネントに渡す関数は useCallback でラップします。

```typescript
// ✅ Good
const handleStart = useCallback(() => {
  setIsPlaying(true);
  startTimer();
}, [startTimer]);

// ❌ Bad
const handleStart = () => {
  setIsPlaying(true);
  startTimer();
}; // 毎回新しい関数が生成され、子コンポーネントが再レンダリング
```

#### useMemo
計算コストの高い処理のメモ化に使用。

```typescript
// ✅ Good
const filteredStages = useMemo(() => {
  return stages.filter(stage => stage.completed);
}, [stages]);

// ❌ Bad
const filteredStages = stages.filter(stage => stage.completed); // 毎回フィルタリング実行
```

### 3.2 カスタムフックの作成

ロジックの再利用にはカスタムフックを作成します。

```typescript
// hooks/useTimer.ts
export const useTimer = () => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setElapsedTime(0);
    setIsRunning(false);
  }, []);

  return { elapsedTime, isRunning, start, stop, reset };
};

// 使用例
const Stage1: React.FC = () => {
  const { elapsedTime, start, stop } = useTimer();

  return (
    <div>
      <p>Time: {elapsedTime}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
```

---

## 4. 状態管理

### 4.1 Context API の使用

グローバルな状態管理には Context API を使用します。

```typescript
// contexts/GameContext.tsx
interface GameState {
  nickname: string;
  currentStage: number;
  startTime: number | null;
  completedStages: number[];
}

interface GameContextType {
  gameState: GameState;
  setNickname: (nickname: string) => void;
  nextStage: () => void;
  completeStage: (stageNumber: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    nickname: '',
    currentStage: 0,
    startTime: null,
    completedStages: [],
  });

  const setNickname = useCallback((nickname: string) => {
    setGameState(prev => ({ ...prev, nickname }));
  }, []);

  const nextStage = useCallback(() => {
    setGameState(prev => ({ ...prev, currentStage: prev.currentStage + 1 }));
  }, []);

  const completeStage = useCallback((stageNumber: number) => {
    setGameState(prev => ({
      ...prev,
      completedStages: [...prev.completedStages, stageNumber],
    }));
  }, []);

  return (
    <GameContext.Provider value={{ gameState, setNickname, nextStage, completeStage }}>
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

---

## 5. TypeScript のベストプラクティス

### 5.1 型の明示

```typescript
// ✅ Good
const stages: string[] = ['BuyMore', 'Info-Sphere', 'Fan-Circle', 'Sky-Cheap', 'Everything'];
const stageCount: number = 5;

// ❌ Bad
const stages = ['BuyMore', 'Info-Sphere', 'Fan-Circle', 'Sky-Cheap', 'Everything'];
const stageCount = 5; // 型推論に頼る
```

### 5.2 インターフェースとタイプエイリアス

オブジェクトの形状には `interface`、ユニオン型には `type` を使用します。

```typescript
// ✅ Good
interface Stage {
  id: number;
  name: string;
  completed: boolean;
}

type StageStatus = 'pending' | 'in-progress' | 'completed';

// ❌ Bad
type Stage = {
  id: number;
  name: string;
  completed: boolean;
}; // オブジェクトには interface を推奨
```

### 5.3 Enum の使用

定数のグループには Enum を使用します。

```typescript
// ✅ Good
enum StageId {
  BuyMore = 1,
  InfoSphere = 2,
  FanCircle = 3,
  SkyCheap = 4,
  Everything = 5,
}

// 使用例
const currentStage = StageId.BuyMore;
```

---

## 6. パフォーマンス最適化

### 6.1 不要な再レンダリングを避ける

```typescript
// ✅ Good - React.memo で不要な再レンダリングを防ぐ
const Button = React.memo<ButtonProps>(({ label, onClick }) => {
  console.log('Button rendered');
  return <button onClick={onClick}>{label}</button>;
});

// useCallback で関数の再生成を防ぐ
const Parent: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <Button label="Click me" onClick={handleClick} />;
};
```

### 6.2 遅延ローディング

```typescript
// ✅ Good - コード分割で初期ロードを軽量化
import { lazy, Suspense } from 'react';

const Stage1 = lazy(() => import('./stages/Stage1'));
const Stage2 = lazy(() => import('./stages/Stage2'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Stage1 />
    </Suspense>
  );
};
```

---

## 7. エラーハンドリング

### 7.1 Error Boundary

```typescript
// components/ErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }

    return this.props.children;
  }
}
```

---

## 8. テスト

### 8.1 ユニットテスト

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 9. アクセシビリティ

### 9.1 セマンティックHTML

```typescript
// ✅ Good
<button onClick={handleClick}>Click me</button>
<nav>
  <ul>
    <li><a href="/stage1">Stage 1</a></li>
  </ul>
</nav>

// ❌ Bad
<div onClick={handleClick}>Click me</div>
<div>
  <div>
    <div><span onClick={goToStage1}>Stage 1</span></div>
  </div>
</div>
```

### 9.2 ARIA属性

```typescript
// ✅ Good
<button aria-label="Close modal" onClick={closeModal}>
  ×
</button>

<input type="text" aria-describedby="nickname-help" />
<span id="nickname-help">Enter your nickname (3-20 characters)</span>
```

---

## 10. コーディング規約

### 10.1 命名規則

- **コンポーネント**: PascalCase（例: `StartPage`, `StageHeader`）
- **関数**: camelCase（例: `handleClick`, `generateRandomName`）
- **定数**: UPPER_SNAKE_CASE（例: `MAX_STAGE_COUNT`, `DEFAULT_NICKNAME`）
- **型/インターフェース**: PascalCase（例: `GameState`, `StageProps`）

### 10.2 インポート順序

```typescript
// 1. React関連
import React, { useState, useEffect } from 'react';

// 2. 外部ライブラリ
import { useNavigate } from 'react-router-dom';

// 3. 内部モジュール
import { useGame } from '@/contexts/GameContext';
import Button from '@/components/common/Button';
import { generateRandomName } from '@/utils/nameGenerator';

// 4. 型定義
import type { Stage } from '@/types/stage';

// 5. スタイル
import './Stage1.css';
```

---

## 11. プロジェクト固有のガイドライン

### 11.1 ダークパターンの実装

各ステージのダークパターンは**意図的に使いにくく**設計しますが、以下の点に注意します：

- ゲームとして楽しめるバランスを保つ
- 完全に詰まないようにする（必ずクリア方法がある）
- プレイヤーに「気づき」を与える設計

```typescript
// 例: 小さな退会リンク
<footer className="footer">
  {/* 多くのリンクの中に紛れ込む */}
  <a href="/about">About</a>
  <a href="/terms">Terms</a>
  <a href="/privacy">Privacy</a>
  <a href="/unsubscribe" className="tiny-link">退会</a> {/* 意図的に小さく */}
  <a href="/contact">Contact</a>
</footer>
```

### 11.2 ステージ間の一貫性

各ステージは独立していますが、以下の要素は統一します：

- ゲーム進行状態の管理方法
- ステージクリアの判定方法
- 次のステージへの遷移方法

---

**最終更新**: 2025-12-20
