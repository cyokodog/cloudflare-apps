/** @jsxImportSource hono/jsx */
import { Context } from 'hono';
import { Layout } from '../components/Layout';
import { getBlogPostById as getMockBlogPostById } from '../mockData/getBlogMock';
import { getBlogPostById } from '../db/blogDatabase';
import { parseMarkdown } from '../utils/markdownUtils';

export const BlogPost = async ({ req, env }: Pick<Context, 'req' | 'env'>) => {
  const { id } = req.param();

  // D1またはモックデータからブログ記事を取得
  let post;
  try {
    post = await getBlogPostById(id, env);
    if (!post) {
      // D1からデータが取得できなければモックデータにフォールバック
      post = getMockBlogPostById(id);
    }
  } catch (error) {
    console.error('Error fetching blog post from DB:', error);
    // エラー時はモックデータにフォールバック
    post = getMockBlogPostById(id);
  }

  if (!post) {
    // 記事が見つからない場合は、空のdivを返す（ルーティング側でリダイレクトする）
    return <div>記事が見つかりませんでした</div>;
  }

  // マークダウンをHTMLに変換 (Promiseの可能性があるので、awaitで処理)
  const contentHtml = await parseMarkdown(post.content);

  return (
    <Layout title={post.title}>
      <div className='blog-post'>
        <h1>{post.title}</h1>
        <p className='blog-date'>{post.date}</p>

        <div
          className='blog-content'
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        ></div>

        <div className='blog-navigation'>
          <a href='/blog' className='back-to-blog'>
            ← ブログトップに戻る
          </a>
        </div>
      </div>
    </Layout>
  );
};
