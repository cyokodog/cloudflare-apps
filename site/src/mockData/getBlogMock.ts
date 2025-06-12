export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export const getBlogMock = (): BlogPost[] => {
  return [
    {
      id: 'first-post',
      title: '始めてのブログ記事',
      date: '2025年6月11日',
      excerpt: 'これは最初のブログ記事です。ブログの使い方について説明します。',
      content: `
# 始めてのブログ記事

これは最初のブログ記事です。ブログの使い方について説明します。

## ブログの特徴

- マークダウン記法対応
- シンプルな設計
- 高速な表示

## 使い方

1. マークダウンで記事を書く
2. データベースに保存する
3. 記事を公開する

\`\`\`js
// サンプルコード
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`

これからもよろしくお願いします！
      `,
    },
    {
      id: 'second-post',
      title: '2つ目の記事タイトル',
      date: '2025年6月10日',
      excerpt: '2つ目のブログ記事のサンプルです。ここに記事の概要が入ります。',
      content: `
# 2つ目の記事タイトル

こんにちは！2つ目のブログ記事へようこそ。

## 本文

この記事では、マークダウンの基本的な使い方を紹介します。

### マークダウンの魅力

マークダウンは簡潔で読みやすい記法です。HTMLに変換することで、
ウェブサイトに表示することができます。

#### リスト表示

- 項目1
- 項目2
  - 子項目1
  - 子項目2
- 項目3

#### 引用

> マークダウンは素晴らしい記法です。
> 簡単に文章を構造化できます。

これからも色々な記事を書いていきます！
      `,
    },
  ];
};

// 特定の記事を取得する関数
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return getBlogMock().find((post) => post.id === id);
};
