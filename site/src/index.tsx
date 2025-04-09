/** @jsxImportSource hono/jsx */
import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

type Bindings = {
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

// 共通レイアウトで SSR レンダリング
app.get('*', jsxRenderer());

// ページごとのルーティング
app.get('/', (c) => c.render(<Home />));
app.get('/about', (c) => c.render(<About />));
app.get('/contact', (c) => c.render(<Contact />));

// 静的ファイルのフォールバック
app.use('*', async (c) => {
  return await c.env.ASSETS.fetch(c.req.raw);
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
