/** @jsxImportSource hono/jsx */
import { Context } from 'hono';
import { Layout } from '../components/Layout';
import { getBlogMock } from '../mockData/getBlogMock';
import { getBlogPosts } from '../db/blogDatabase';

// メインのBlogコンポーネント
export const Blog = async ({ env }: Pick<Context, 'env'>) => {
  // D1データベースからブログ記事を取得（失敗時はモックデータを使用）
  let blogPosts;
  try {
    blogPosts = await getBlogPosts(env);
    if (!blogPosts || blogPosts.length === 0) {
      // データが取得できなかった場合はモックデータを使用
      console.log('No blog posts found in database, using mock data');
      blogPosts = getBlogMock();
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    blogPosts = getBlogMock();
  }

  return (
    <Layout title='Blog'>
      <h1>Blog</h1>
      <p>Welcome to our blog page!</p>

      {/* ブログ記事のリスト */}
      <div className='blog-list'>
        {blogPosts.map((post) => (
          <article key={post.id} className='blog-item'>
            <h2>{post.title}</h2>
            <p className='blog-date'>{post.date}</p>
            <p className='blog-excerpt'>{post.excerpt}</p>
            <a href={`/blog/${post.id}`} className='blog-link'>
              続きを読む
            </a>
          </article>
        ))}
      </div>
    </Layout>
  );
};
