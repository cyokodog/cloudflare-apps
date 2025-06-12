import { BlogPost } from '../mockData/getBlogMock';

export interface Env {
  DB: D1Database;
}

// D1からブログ記事を取得する関数
export async function getBlogPosts(env: Env): Promise<BlogPost[]> {
  const { results } = await env.DB.prepare(
    'SELECT id, title, date, excerpt, content FROM blog_posts WHERE published = true ORDER BY date DESC'
  ).all();

  // D1の結果を明示的にBlogPostの形式に変換
  return results.map((item) => ({
    id: String(item.id),
    title: String(item.title),
    date: String(item.date),
    excerpt: String(item.excerpt),
    content: String(item.content),
  }));
}

// ID指定でブログ記事を取得する関数
export async function getBlogPostById(
  id: string,
  env: Env
): Promise<BlogPost | null> {
  const result = await env.DB.prepare(
    'SELECT id, title, date, excerpt, content FROM blog_posts WHERE id = ?'
  )
    .bind(id)
    .first();

  // 結果がnullの場合はnullを返す
  if (!result) return null;

  // D1の結果を明示的にBlogPostの形式に変換
  return {
    id: String(result.id),
    title: String(result.title),
    date: String(result.date),
    excerpt: String(result.excerpt),
    content: String(result.content),
  };
}
