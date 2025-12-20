# Firebase セットアップガイド

本ドキュメントは『The Unsubscribe』プロジェクトにおけるFirebaseの設定とデプロイ方法を説明します。

---

## 1. Firebase プロジェクトの作成

### 1.1 Firebase Console でプロジェクトを作成

1. [Firebase Console](https://console.firebase.google.com/) にアクセス
2. 「プロジェクトを追加」をクリック
3. プロジェクト名を入力（例: `the-unsubscribe`）
4. Google アナリティクスの設定（任意、スキップ可能）
5. プロジェクト作成完了

### 1.2 Webアプリの追加

1. プロジェクトダッシュボードで「Webアプリを追加」をクリック
2. アプリのニックネームを入力（例: `the-unsubscribe-web`）
3. 「Firebase Hosting も設定する」にチェック（推奨）
4. 「アプリを登録」をクリック
5. Firebase設定情報（API Key等）をメモしておく

---

## 2. Firebase CLI のインストール

### 2.1 Node.js と npm の確認

Firebase CLIを使用するには、Node.js（バージョン16以上）が必要です。

```bash
node -v  # v16以上であることを確認
npm -v
```

### 2.2 Firebase CLI のインストール

```bash
npm install -g firebase-tools
```

### 2.3 Firebase へのログイン

```bash
firebase login
```

ブラウザが開き、Googleアカウントでログインします。

### 2.4 ログインの確認

```bash
firebase projects:list
```

作成したプロジェクトが表示されればOKです。

---

## 3. プロジェクトの初期化

### 3.1 Firebase の初期化

プロジェクトのルートディレクトリで以下のコマンドを実行します。

```bash
firebase init
```

### 3.2 設定の選択

1. **使用する機能を選択**
   - `Hosting: Configure files for Firebase Hosting` を選択（スペースキーで選択）
   - Enterキーで確定

2. **プロジェクトの選択**
   - `Use an existing project` を選択
   - 作成したプロジェクト（例: `the-unsubscribe`）を選択

3. **Hosting の設定**
   - **Public directory**: `build` と入力（Create React Appのビルド出力先）
   - **Configure as a single-page app**: `Yes` を選択
   - **Set up automatic builds with GitHub**: `No` を選択（任意）
   - **Overwrite index.html**: `No` を選択

### 3.3 生成されるファイル

初期化が完了すると、以下のファイルが生成されます。

```
.firebaserc         # Firebase プロジェクトの設定
firebase.json       # Firebase Hosting の設定
.gitignore          # Git除外設定（更新される）
```

---

## 4. firebase.json の設定

### 4.1 基本設定

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 4.2 推奨設定（追加）

キャッシュ制御やヘッダー設定を追加します。

```json
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "index.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ],
    "cleanUrls": true,
    "trailingSlash": false
  }
}
```

---

## 5. ビルドとデプロイ

### 5.1 本番用ビルド

```bash
npm run build
```

`build/` ディレクトリにビルド成果物が生成されます。

### 5.2 ローカルでプレビュー（任意）

デプロイ前にローカルで動作確認できます。

```bash
firebase serve
```

ブラウザで `http://localhost:5000` にアクセスして確認します。

### 5.3 デプロイ

```bash
firebase deploy
```

デプロイが完了すると、以下のようなURLが表示されます。

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/the-unsubscribe/overview
Hosting URL: https://the-unsubscribe.web.app
```

---

## 6. デプロイ後の確認

### 6.1 動作確認

1. デプロイされたURLにアクセス
2. 各ステージの動作確認
3. ブラウザの開発者ツールでエラーがないか確認

### 6.2 キャッシュのクリア

デプロイ後、古いバージョンがキャッシュされている場合があります。

- ブラウザで `Ctrl + Shift + R`（Windows/Linux）または `Cmd + Shift + R`（Mac）でハードリロード

---

## 7. カスタムドメインの設定（任意）

### 7.1 ドメインの追加

1. Firebase Console の「Hosting」セクションへ移動
2. 「カスタムドメインを追加」をクリック
3. 所有しているドメインを入力（例: `unsubscribe.example.com`）
4. 指示に従ってDNSレコードを設定

### 7.2 SSL証明書

Firebase Hostingは自動的にSSL証明書（Let's Encrypt）を発行します。
DNSレコードの設定後、数時間以内に証明書が有効になります。

---

## 8. 環境変数の管理（今回は不要）

本プロジェクトではFirebase Hostingのみを使用するため、環境変数の設定は不要です。
将来的にFirestoreやAuthenticationを使用する場合、以下の方法で環境変数を管理します。

### 8.1 `.env` ファイルの作成

```bash
# .env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 8.2 `.gitignore` への追加

```bash
# .gitignore
.env
.env.local
.env.production
```

### 8.3 Reactでの使用

```typescript
// src/firebase.ts
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
```

---

## 9. デプロイの自動化（将来的な拡張）

### 9.1 GitHub Actions を使った自動デプロイ

`.github/workflows/deploy.yml` を作成

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

---

## 10. トラブルシューティング

### 10.1 デプロイが失敗する

```bash
# キャッシュをクリアして再試行
firebase deploy --only hosting --force
```

### 10.2 古いバージョンが表示される

```bash
# ブラウザのキャッシュをクリア
# または
# firebase.json でキャッシュ設定を確認
```

### 10.3 404エラーが出る

```bash
# firebase.json の rewrites 設定を確認
# SPAの場合、すべてのルートを index.html に向ける必要がある
```

---

## 11. Firebase Hosting の機能

### 11.1 複数サイトのホスティング

1つのプロジェクトで複数のサイトをホスティング可能。

```bash
firebase hosting:sites:create staging-site
```

### 11.2 プレビューチャンネル

本番環境に影響を与えずにプレビュー可能。

```bash
firebase hosting:channel:deploy preview
```

### 11.3 ロールバック

以前のバージョンに戻すことができます。

1. Firebase Console の「Hosting」セクション
2. 「リリース履歴」タブ
3. 戻したいバージョンの「...」メニューから「ロールバック」

---

## 12. コスト管理

Firebase Hostingの無料枠：
- **ストレージ**: 10 GB
- **転送量**: 360 MB/日

本プロジェクトは静的サイトのみなので、無料枠内で運用可能です。

---

## 13. 定期的なメンテナンス

### 13.1 Firebase CLI のアップデート

```bash
npm update -g firebase-tools
```

### 13.2 依存関係のアップデート

```bash
npm outdated
npm update
```

---

## 参考リンク

- [Firebase Hosting 公式ドキュメント](https://firebase.google.com/docs/hosting)
- [Firebase CLI リファレンス](https://firebase.google.com/docs/cli)
- [Create React App デプロイガイド](https://create-react-app.dev/docs/deployment/)

---

**最終更新**: 2025-12-20
