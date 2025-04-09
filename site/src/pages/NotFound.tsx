// src/pages/NotFound.tsx
/** @jsxImportSource hono/jsx */
import { Layout } from '../components/Layout';

export const NotFound = () => (
  <Layout title='404 Not Found'>
    <h1>ページが見つかりません</h1>
    <p>お探しのページは存在しないか、移動された可能性があります。</p>
    <a href='/'>ホームに戻る</a>
  </Layout>
);
