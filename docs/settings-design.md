# セッティング画面 設計書（確定版）

## 概要
ゲーム内の各種設定を調整できるモーダルを実装します。

---

## 画面構成

### セッティングボタンの配置
- **場所**: 全画面（StartPage, Stage1-5, ResultPage）の**左上**
- **位置**: `position: fixed; top: 20px; left: 20px;`
- **アイコン**: ⚙️（歯車アイコン）
- **動作**: クリックでセッティングモーダルを表示

### セッティングモーダル
- **表示方法**: オーバーレイモーダル（ページ遷移なし）
- **背景**: 半透明の暗い色（`rgba(0, 0, 0, 0.7)`）でページ全体を覆う
- **モーダル本体**: 中央配置のカード型
- **レイアウト**: Corporate Nightmareテーマに準拠
- **構成要素**:
  1. タイトル「SETTINGS」
  2. 各種設定項目（スライダー、トグルボタン）
  3. 「閉じる」ボタン（モーダルを閉じる）

---

## 設定項目

### 1. BGM音量調整
- **UI**: スライダー（0-100%）
- **初期値**: 15（現在の0.15を100倍した値）
- **動作**: スライダー変更時にリアルタイムでBGM音量を調整
- **保存**: LocalStorageに保存（キー: `bgmVolume`）

### 2. SE（効果音）音量調整
- **UI**: スライダー（0-100%）
- **初期値**: 30（現在の0.3を100倍した値）
- **動作**: スライダー変更時に効果音のテスト再生（クリック音）
- **保存**: LocalStorageに保存（キー: `sfxVolume`）

### 3. 言語設定
- **UI**: トグルボタン（日本語 ⇄ English）
- **選択肢**: 日本語 / English
- **初期値**: 日本語
- **状態**: 未実装（UI のみ配置、機能は将来実装）
- **保存**: LocalStorageに保存（キー: `language`）
- **注記**: 「※ Currently Japanese only / 現在は日本語のみ対応」と表示

---

## 技術仕様

### ファイル構成
```
src/
├── components/
│   ├── SettingsButton.tsx    # 歯車ボタンコンポーネント
│   ├── SettingsButton.css
│   ├── SettingsModal.tsx     # セッティングモーダル本体
│   └── SettingsModal.css     # Corporate Nightmareテーマ
└── utils/
    └── settings.ts           # LocalStorage操作ユーティリティ
```

### LocalStorage設計
```typescript
interface GameSettings {
  bgmVolume: number;        // 0-100 (デフォルト: 15)
  sfxVolume: number;        // 0-100 (デフォルト: 30)
  language: 'ja' | 'en';    // デフォルト: 'ja'
}
```

### State管理
- `SettingsButton`がモーダルの開閉状態を管理
- `useState`で`isOpen`フラグを保持
- `SettingsModal`に`isOpen`と`onClose`をpropsで渡す

### audio.ts の拡張
- `setBGMVolume(volume: number)` メソッド追加
- `setSFXVolume(volume: number)` メソッド追加
- `loadSettings()` メソッド追加（LocalStorageから読み込み）

---

## UI デザイン（Corporate Nightmare準拠）

### セッティングボタン
- サイズ: 48px × 48px
- 背景: `var(--color-surface)`
- ボーダー: `2px solid var(--color-border-dark)`
- ホバー: ブルータルシャドウ効果
- 位置: `position: fixed; top: 20px; left: 20px;`
- z-index: 100

### セッティングモーダル
- **オーバーレイ**:
  - 全画面覆う: `position: fixed; inset: 0;`
  - 背景: `rgba(0, 0, 0, 0.7)`
  - z-index: 1000
  - クリックで閉じる
- **モーダル本体**:
  - 中央配置のカード型レイアウト
  - 最大幅: 600px
  - 背景: `var(--color-surface)`
  - ボーダー: `3px solid var(--color-border-dark)`
  - シャドウ: `var(--shadow-brutal)`
  - パディング: `var(--space-2xl)`
- **各設定項目**:
  - ラベル: 大文字、レタースペーシング、`font-weight: bold`
  - スライダー: カスタムスタイル（ブルータリスト風）
    - トラック: 2px solid border
    - つまみ: 角丸なし、ボーダー付き
  - トグルボタン: 既存の start-button スタイルを踏襲
  - 閉じるボタン: 右上に×ボタン、または下部に「CLOSE」ボタン

---

## 実装の優先順位

### Phase 1（確定実装内容）
1. ✅ 設計書作成
2. LocalStorage ユーティリティ (`utils/settings.ts`)
3. audio.ts の拡張（音量調整メソッド追加）
4. SettingsButton コンポーネント
5. SettingsModal コンポーネント
6. 全ページにSettingsButton配置

---

## 確定仕様まとめ

### ✅ 確定事項
- **ボタン配置**: 画面左上（`top: 20px; left: 20px;`）
- **表示方法**: モーダルオーバーレイ（背景半透明暗色）
- **音量調整**: スライダー（0-100%）
- **設定項目**:
  1. BGM音量
  2. SE音量
  3. 言語設定（UIのみ、機能未実装）
- **追加設定**: なし

### 実装詳細
- すべての設定はLocalStorageに保存され、ページリロード後も保持
- 初回起動時はデフォルト値を使用（BGM: 15, SE: 30, 言語: ja）
- Corporate Nightmareテーマを厳守
- モーダル外クリックまたは閉じるボタンでモーダルを閉じる
