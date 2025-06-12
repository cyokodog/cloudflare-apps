# Cloudflare Pages + D1 ブログアプリケーション

## 開発環境のセットアップ

### プロジェクトのインストール

```bash
# 依存パッケージのインストール
npm install
```

### D1 データベースのセットアップ

1. D1 データベースの作成

```bash
# blog-db という名前のD1データベースを作成
npx wrangler d1 create blog-db
```

2. wrangler.jsonc に D1 設定を追加

以下の設定を wrangler.jsonc 内の適切な場所に追加します。database_id は実行時に表示されたものを使用してください。

```json
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "blog-db",
      "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  ]
}
```

3. スキーマの作成とデータベース初期化

```bash
# スキーマディレクトリの作成
mkdir -p schema

# テーブル作成用のSQLファイル作成
cat > schema/blog.sql << 'EOL'
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  published BOOLEAN DEFAULT TRUE,
  author TEXT,
  tags TEXT
);

CREATE INDEX idx_blog_posts_date ON blog_posts(date);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
EOL

# テーブル作成の実行
npx wrangler d1 execute blog-db --file=./schema/blog.sql
```

4. サンプルデータの投入

````bash
# サンプルデータ用SQLファイル作成
cat > schema/seed.sql << 'EOL'
INSERT INTO blog_posts (id, title, date, excerpt, content)
VALUES (
  'first-post',
  '始めてのブログ記事',
  '2025年6月11日',
  'これは最初のブログ記事です。ブログの使い方について説明します。',
  '# 始めてのブログ記事\n\nこれは最初のブログ記事です。ブログの使い方について説明します。\n\n## ブログの特徴\n\n- マークダウン記法対応\n- シンプルな設計\n- 高速な表示\n\n## 使い方\n\n1. マークダウンで記事を書く\n2. データベースに保存する\n3. 記事を公開する\n\n```js\n// サンプルコード\nconst greeting = ''Hello, World!'';\nconsole.log(greeting);\n```\n\nこれからもよろしくお願いします！'
);

INSERT INTO blog_posts (id, title, date, excerpt, content)
VALUES (
  'second-post',
  '2つ目の記事タイトル',
  '2025年6月10日',
  '2つ目のブログ記事のサンプルです。ここに記事の概要が入ります。',
  '# 2つ目の記事タイトル\n\nこんにちは！2つ目のブログ記事へようこそ。\n\n## 本文\n\nこの記事では、マークダウンの基本的な使い方を紹介します。\n\n### マークダウンの魅力\n\nマークダウンは簡潔で読みやすい記法です。HTMLに変換することで、\nウェブサイトに表示することができます。\n\n#### リスト表示\n\n- 項目1\n- 項目2\n  - 子項目1\n  - 子項目2\n- 項目3\n\n#### 引用\n\n> マークダウンは素晴らしい記法です。\n> 簡単に文章を構造化できます。\n\nこれからも色々な記事を書いていきます！'
);
EOL

# サンプルデータの投入
npx wrangler d1 execute blog-db --file=./schema/seed.sql
````

## 開発サーバーの起動

### ローカル環境（D1 データベース利用）

```bash
# D1データベースを使ってローカル開発サーバーを起動
npx wrangler pages dev --compatibility-date=2023-06-12 --d1=blog-db -- npm run dev
```

### Wrangler を使ったシンプルな開発環境

```bash
# Wranglerを使った開発サーバー（D1およびその他のCloudflare環境をローカルでエミュレート）
npx wrangler dev --local
```

このコマンドは、Cloudflare の Workers 環境をローカルでエミュレートし、D1 データベースを含むすべての Cloudflare バインディングにアクセスできるようにします。`--local`フラグにより、ローカル環境のみで実行され、Cloudflare のアカウント認証が不要になります。

### 通常の開発サーバー（モックデータ利用）

```bash
# 通常の開発サーバー（D1データベースなし、モックデータ使用）
npm run dev
```

## デプロイ

```bash
# 本番環境へのデプロイ
npm run deploy
```

## D1 データベース操作コマンド（参考）

```bash
# データベースの確認
npx wrangler d1 list

# データの確認
npx wrangler d1 execute blog-db --command="SELECT * FROM blog_posts"

# 本番環境のD1データベースにスキーマを適用
npx wrangler d1 execute blog-db --file=./schema/blog.sql --remote

# 本番環境のD1データベースにサンプルデータを投入
npx wrangler d1 execute blog-db --file=./schema/seed.sql --remote
```
