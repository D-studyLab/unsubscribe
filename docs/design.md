# 『The Unsubscribe』デザインガイドライン

## Design Theme: Corporate Nightmare（企業ディストピア）

---

## 1. デザインコンセプト

### 1.1 コアアイデア

**「信頼できそうに見えて、どこか不穏な企業デザイン」**

一見するとクリーンでプロフェッショナルな企業サイトに見えるが、よく見ると違和感や不安を感じさせる要素が散りばめられている。ユーザーを引き止めようとする企業の「表面上の親切さ」と「裏に潜む意図」を視覚的に表現する。

### 1.2 キーワード

- **Deceptively Clean**: 欺瞞的なクリーンさ
- **Corporate Uncanny**: 企業的な不気味さ
- **Subtle Unease**: 微かな不安感
- **Ironic Professionalism**: 皮肉なプロフェッショナリズム
- **Dystopian Minimalism**: ディストピア的ミニマリズム

### 1.3 ムードボード的参考イメージ

- 無機質なオフィスビルの廊下
- 形式的すぎる笑顔のストック写真
- 法的文書の小さな注釈
- 「お客様のために」と言いながら利益を優先する企業姿勢
- カフカの『城』『審判』的な官僚主義の不条理

---

## 2. カラーパレット

### 2.1 プライマリカラー

```css
:root {
  /* ベースカラー */
  --color-background: #f5f5f0;      /* オフホワイト - 少し黄ばんだ紙のような色 */
  --color-surface: #ffffff;          /* 純白 - カード・入力欄 */
  --color-text-primary: #1a1a1a;     /* ほぼ黒 - メインテキスト */
  --color-text-secondary: #666666;   /* グレー - サブテキスト */
  --color-text-muted: #999999;       /* 薄いグレー - 注釈・プレースホルダー */
  
  /* アクセントカラー */
  --color-danger: #c41e3a;           /* 深い赤 - 警告・重要な要素 */
  --color-border: #e0e0e0;           /* ボーダー */
  --color-border-dark: #1a1a1a;      /* 強調ボーダー */
  
  /* シャドウ */
  --shadow-brutal: 8px 8px 0 #1a1a1a; /* ブルータリスト的な影 */
  --shadow-subtle: 0 2px 8px rgba(0,0,0,0.08);
}
```

### 2.2 カラーの使用ルール

| 用途 | カラー | 意図 |
|------|--------|------|
| 背景 | `#f5f5f0` | 古い書類、経年劣化した紙の印象 |
| カード/コンテナ | `#ffffff` | 「公式」感を出すクリーンな白 |
| メインテキスト | `#1a1a1a` | 権威的で読みやすい |
| 危険/警告 | `#c41e3a` | 血のような赤。不安を煽る |
| ボーダー/影 | `#1a1a1a` | 硬質でブルータルな印象 |

### 2.3 禁止カラー

- 鮮やかな青（信頼感を与えすぎる）
- 暖かみのあるオレンジや黄色（親しみやすくなりすぎる）
- パステルカラー（カジュアルになりすぎる）

---

## 3. タイポグラフィ

### 3.1 フォントファミリー

```css
:root {
  /* 見出し・UI要素 */
  --font-heading: "IBM Plex Sans", "Noto Sans JP", -apple-system, sans-serif;
  
  /* 本文 */
  --font-body: "IBM Plex Sans", "Noto Sans JP", sans-serif;
  
  /* 注釈・法的文言 */
  --font-small: "IBM Plex Sans", sans-serif;
}
```

**選定理由**: IBM Plex Sansは企業的でありながら、どこか冷たさを感じさせる。Helveticaほど温かみがなく、Arialほど無個性ではない。

### 3.2 フォントサイズ・ウェイト

```css
:root {
  /* サイズ */
  --text-xs: 10px;    /* 極小注釈 - 意図的に読みにくく */
  --text-sm: 12px;    /* 小さな注釈 */
  --text-base: 14px;  /* 本文 */
  --text-lg: 16px;    /* 強調テキスト */
  --text-xl: 20px;    /* 小見出し */
  --text-2xl: 24px;   /* 見出し */
  --text-3xl: 32px;   /* 大見出し */
  --text-4xl: 48px;   /* タイトル */
  
  /* ウェイト */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-black: 800;
  
  /* レタースペーシング */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.1em;
  --tracking-widest: 0.2em;
}
```

### 3.3 タイポグラフィの使用例

```css
/* メインタイトル */
.title-main {
  font-size: var(--text-3xl);
  font-weight: var(--font-black);
  letter-spacing: var(--tracking-tight);
  line-height: 1.2;
}

/* ラベル（フォーム上など） */
.label {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
}

/* 不穏な小さい注釈 */
.fine-print {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* 警告テキスト（赤） */
.warning-text {
  color: var(--color-danger);
}
```

---

## 4. レイアウト・スペーシング

### 4.1 スペーシングシステム

```css
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;
}
```

### 4.2 コンテナ

```css
.container {
  max-width: 600px;      /* 意図的に狭め - 圧迫感 */
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.container-wide {
  max-width: 800px;
}
```

### 4.3 カード・ボックス

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-brutal);
  padding: var(--space-2xl);
}

/* ブルータリストシャドウの意図：
   - 柔らかいドロップシャドウではなく、硬質な影
   - 「逃げ場がない」印象を与える
   - レトロな書類・ハンコのような権威性 */
```

---

## 5. UIコンポーネント

### 5.1 ボタン

#### プライマリボタン（メインアクション）

```css
.button-primary {
  width: 100%;
  padding: 20px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  border: none;
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 4px 4px 0 var(--color-text-primary);
}
```

#### セカンダリボタン（サブアクション）

```css
.button-secondary {
  padding: 16px 24px;
  background: transparent;
  color: var(--color-text-primary);
  border: 2px solid var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
```

#### 危険なボタン（退会など - 意図的に目立たなく）

```css
.button-danger-subtle {
  padding: 12px 16px;
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  font-size: var(--text-sm);
  /* 意図的に目立たないデザイン */
}
```

### 5.2 入力フォーム

```css
.input {
  width: 100%;
  padding: var(--space-md);
  background: #fafafa;
  border: 2px solid var(--color-text-primary);
  font-size: var(--text-lg);
  font-family: var(--font-body);
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  background: var(--color-surface);
}

.input-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}
```

### 5.3 ロゴ/ブランドマーク

```css
.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  border: 3px solid var(--color-text-primary);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: var(--color-text-primary);
  color: var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
}

.logo-text {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
}
```

### 5.4 プログレスインジケーター

```css
.stage-indicator {
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
}

.stage-dot {
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  font-weight: var(--font-bold);
}

.stage-dot--active {
  background: var(--color-text-primary);
  color: var(--color-surface);
}

.stage-dot--inactive {
  opacity: 0.3;
}

.stage-label {
  font-size: 9px;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  margin-top: var(--space-sm);
}
```

---

## 6. 不安を煽るデザインテクニック

### 6.1 視覚的テクニック

#### 微妙なズレ・非対称

```css
/* カードを微妙に傾ける */
.card--uneasy {
  transform: rotate(0.3deg);
}

/* 影のズレを強調 */
.shadow--offset {
  box-shadow: 12px 12px 0 var(--color-text-primary);
}
```

#### 読みにくい重要情報

```css
/* 重要な注意書きを意図的に読みにくく */
.fine-print-hidden {
  font-size: 9px;
  color: #bbb;
  line-height: 1.4;
}

/* 赤いアスタリスクで不安を煽る */
.asterisk-warning {
  color: var(--color-danger);
  font-size: 10px;
}
```

#### 圧迫感のあるレイアウト

```css
/* 狭いコンテナ幅 */
.container-narrow {
  max-width: 500px;
}

/* 余白を少なくして窮屈に */
.section--cramped {
  padding: var(--space-md);
}
```

### 6.2 コピーライティングとの連携

デザインは以下のような不穏なコピーと組み合わせて効果を発揮する：

- 「お客様のことを第一に考えています*」（*条件あり）
- 「退会手続きは簡単です」（実際は複雑）
- 「いつでもキャンセルできます」（小さな文字で「ただし...」）

### 6.3 アニメーション

```css
/* ホバー時の不穏な動き */
.button:hover {
  animation: subtle-shake 0.5s ease;
}

@keyframes subtle-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-1px); }
  75% { transform: translateX(1px); }
}

/* ローディング時の不安なパルス */
@keyframes uneasy-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## 7. ステージ別デザインバリエーション

各ステージは基本デザインを維持しながら、そのサービスの特徴を反映する：

### Stage 1: BuyMore（ECサイト）
- アクセントカラー: オレンジ（`#ff6600`）を追加
- 商品カード、カート風UI
- 「お買い得！」バナーの過剰さ

### Stage 2: Info-Sphere（ニュースアプリ）
- アクセントカラー: 青（`#0066cc`）を追加
- ニュース記事風レイアウト
- 「BREAKING」「速報」の緊急感

### Stage 3: Fan-Circle（SNS）
- アクセントカラー: 紫（`#6b46c1`）を追加
- プロフィールカード、フォロワー数表示
- 「つながり」を強調するUI

### Stage 4: Sky-Cheap（航空券サイト）
- アクセントカラー: 空色（`#0099cc`）を追加
- 航空券予約フォーム風UI
- 隠れたオプションのチェックボックス

### Stage 5: Everything（巨大プラットフォーム）
- 全てのアクセントカラーを混在
- 複雑で迷路のようなUI
- 「どこにも退会がない」絶望感

---

## 8. レスポンシブデザイン

### 8.1 ブレイクポイント

```css
/* Mobile First */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
```

### 8.2 モバイル対応

```css
@media (max-width: 640px) {
  .card {
    padding: var(--space-lg);
    box-shadow: 6px 6px 0 var(--color-text-primary);
  }
  
  .title-main {
    font-size: var(--text-2xl);
  }
  
  .stage-indicator {
    gap: var(--space-sm);
  }
  
  .stage-dot {
    width: 28px;
    height: 28px;
  }
}
```

---

## 9. 実装時の注意事項

### 9.1 DO（やるべきこと）

- ✅ 常に `box-sizing: border-box` を使用
- ✅ フォームには適切なラベルを付ける（アクセシビリティ）
- ✅ ボタンには明確なホバー・フォーカス状態を
- ✅ 色のコントラスト比は最低限確保（WCAG AA）
- ✅ ブルータルシャドウは一貫して使用

### 9.2 DON'T（やってはいけないこと）

- ❌ 柔らかいドロップシャドウ（`box-shadow: 0 4px 12px rgba(0,0,0,0.1)`）
- ❌ 角丸（`border-radius`）の多用
- ❌ グラデーションの多用
- ❌ 親しみやすいイラストやアイコン
- ❌ 明るく温かみのある色

### 9.3 ゲームとしてのバランス

不安を煽るデザインだが、以下は守る：

- プレイヤーが完全に詰まらないこと
- 最終的には退会できること（ゲームクリア可能）
- 不快すぎて離脱しないこと

---

## 10. サンプルコード

### 10.1 スタート画面の基本構造

```tsx
<div className="page">
  <div className="container">
    {/* ロゴ */}
    <div className="logo">
      <div className="logo-icon">U</div>
      <span className="logo-text">UNSUBSCRIBE™</span>
    </div>

    {/* メインカード */}
    <div className="card">
      <span className="label">退会体験シミュレーター</span>
      
      <h1 className="title-main">
        そのサービス、<br />
        <span className="warning-text">本当に</span>退会できますか？
      </h1>
      
      <p className="description">
        ダークパターンに満ちた5つのサービスから脱出せよ。
      </p>

      {/* フォーム */}
      <div className="form-group">
        <label className="input-label">ユーザー名</label>
        <input type="text" className="input" defaultValue="HappyDolphin742" />
      </div>

      <button className="button-primary">退会を開始する →</button>

      <p className="fine-print">
        ※ 本ゲームはフィクションです。
        <span className="asterisk-warning">*</span>
      </p>
    </div>

    {/* ステージインジケーター */}
    <div className="stage-indicator">
      {stages.map((stage, i) => (
        <div key={stage.name}>
          <div className={`stage-dot ${i === 0 ? 'stage-dot--active' : 'stage-dot--inactive'}`}>
            {i + 1}
          </div>
          <div className="stage-label">{stage.name}</div>
        </div>
      ))}
    </div>
  </div>
</div>
```

---

## 11. まとめ

**Corporate Nightmare** デザインテーマは、以下を表現する：

1. **表面的なクリーンさ** - プロフェッショナルで信頼できそうに見える
2. **潜在的な不安** - よく見ると違和感、不穏さを感じる
3. **皮肉なトーン** - 企業の「ユーザーファースト」を風刺
4. **ブルータリスト要素** - 硬質で逃げ場のない印象

このデザインは『The Unsubscribe』の「ダークパターンを体験する」というコンセプトを視覚的に強化し、プレイヤーに「企業サービスの裏側」を感じさせる。

---

**作成日**: 2024-12-20  
**バージョン**: 1.0