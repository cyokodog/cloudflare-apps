/** @jsxImportSource hono/jsx */
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { NotFound } from './pages/NotFound';
import { getBlogPostById as getMockBlogPostById } from './mockData/getBlogMock';
import { getBlogPosts, getBlogPostById } from './db/blogDatabase';

type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// 共通レイアウトで SSR レンダリング
app.get('*', jsxRenderer());

// ページごとのルーティング
app.get('/', (c) => c.render(<Home />));
app.get('/about', (c) => c.render(<About />));
app.get('/contact', (c) => c.render(<Contact />));
app.get('/blog', (c) => c.render(<Blog env={c.env} />));
app.get('/blog/:id', async (c) => {
  const id = c.req.param('id');
  try {
    // D1データベースからブログ記事を取得
    const post = await getBlogPostById(id, c.env);
    if (!post) {
      return c.redirect('/blog');
    }
    return c.render(<BlogPost req={c.req} env={c.env} />);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // エラー時はモックデータにフォールバック
    const mockPost = getMockBlogPostById(id);
    if (!mockPost) {
      return c.redirect('/blog');
    }
    return c.render(<BlogPost req={c.req} env={c.env} />);
  }
});
// app.notFound((c) => c.render(<NotFound />));

// // 静的ファイルのフォールバック
// app.use('*', async (c) => {
//   return await c.env.ASSETS.fetch(c.req.raw);
// });

// notFound にて SSR or 静的ファイル返却 or 404
app.notFound(async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw);
  if (res.status === 404) {
    return c.render(<NotFound />);
  }
  return res;
});

export default app;

//////////////////////////////////////////////////

// /** @jsxImportSource hono/jsx */
// import { Hono } from 'hono';
// import { jsxRenderer } from 'hono/jsx-renderer';

// type Bindings = {
//   ASSETS: Fetcher;
// };

// const app = new Hono<{ Bindings: Bindings }>();

// app.get(
//   '*',
//   jsxRenderer(({ children }) => {
//     return (
//       <html>
//         <head>
//           <link rel='stylesheet' href='/style.css' />
//           <title>My SSR Page</title>
//         </head>
//         <body>{children}</body>
//       </html>
//     );
//   })
// );

// app.get('/', (c) => {
//   return c.render(
//     <div>
//       <h1>Hello, Hono with JSX</h1>
//     </div>
//   );
// });

// // 静的ファイルへのフォールバック（SSRにマッチしなければここに来る）
// app.use('*', async (c) => {
//   return await c.env.ASSETS.fetch(c.req.raw);
// });

// export default app;

//////////////////////////////////////////////

// import { Hono } from 'hono';

// type Bindings = {
//   ASSETS: Fetcher;
// };

// const app = new Hono<{ Bindings: Bindings }>();

// // SSR ルート
// app.get('/', (c) => {
//   return c.html(/* html */ `
//     <!doctype html>
//     <html>
//       <head>
//         <link rel="stylesheet" href="/style.css" />
//         <title>SSR + Static</title>
//       </head>
//       <body>
//         <h1>Hello from SSR!</h1>
//         <img src="/image.png" alt="Static image" />
//       </body>
//     </html>
//   `);
// });

// // 静的ファイルへのフォールバック（SSRにマッチしなければここに来る）
// app.use('*', async (c) => {
//   return await c.env.ASSETS.fetch(c.req.raw);
// });

// export default app;

//////////////////////////////////////////////

// import { Hono } from 'hono';

// const app = new Hono();

// app.get('/', (c) => {
//   return c.html(/* html */ `
//     <!doctype html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Hello, SSR</title>
//       </head>
//       <body>
//         <h1>Hello Hono!</h1>
//       </body>
//     </html>
//   `);
// });

// export default app;

/////////////////////////////

// import { Hono } from 'hono';

// const app = new Hono<{ Bindings: CloudflareBindings }>();

// app.get('/message', (c) => {
//   return c.text('Hello Hono!');
// });

// export default app;
