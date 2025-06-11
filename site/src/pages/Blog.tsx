/** @jsxImportSource hono/jsx */
import { Layout } from '../components/Layout';

export const Blog = () => {
  return (
    <Layout title='Blog'>
      <h1>Blog</h1>
      <p>Welcome to our blog page!</p>

      {/* ブログ記事のリスト */}
      <div className='blog-list'>
        <article className='blog-item'>
          <h2>始めてのブログ記事</h2>
          <p className='blog-date'>2025年6月11日</p>
          <p className='blog-excerpt'>
            これは最初のブログ記事です。ブログの使い方について説明します。
          </p>
          <a href='/blog/first-post' className='blog-link'>
            続きを読む
          </a>
        </article>

        <article className='blog-item'>
          <h2>2つ目の記事タイトル</h2>
          <p className='blog-date'>2025年6月10日</p>
          <p className='blog-excerpt'>
            2つ目のブログ記事のサンプルです。ここに記事の概要が入ります。
          </p>
          <a href='/blog/second-post' className='blog-link'>
            続きを読む
          </a>
        </article>
      </div>
    </Layout>
  );
};
