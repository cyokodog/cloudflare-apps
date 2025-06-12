import { marked } from 'marked';

// マークダウンをHTMLに変換する関数
export const parseMarkdown = (
  markdownText: string
): string | Promise<string> => {
  return marked(markdownText);
};

// 最初のn文字をマークダウンからプレーンテキストとして取得する関数
export const getExcerpt = (
  markdownText: string,
  maxLength: number = 100
): string => {
  // HTMLタグを除去してプレーンテキストを取得
  const plainText = markdownText
    .replace(/#+\s+/g, '') // 見出し記号を削除
    .replace(/[*_`]/g, '') // 強調、コード記号を削除
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // リンクをテキストだけに
    .replace(/\n/g, ' ') // 改行をスペースに変換
    .trim();

  // 指定された長さで切り取り
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.substring(0, maxLength) + '...';
};
