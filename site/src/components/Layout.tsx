/** @jsxImportSource hono/jsx */

export const Layout = (props: { children: any; title?: string }) => {
  return (
    <html>
      <head>
        <title>{props.title ?? 'My Site'}</title>
        <link rel='stylesheet' href='/style.css' />
      </head>
      <body>
        <header>
          <nav>
            <a href='/'>Home</a> | <a href='/about'>About</a> |{' '}
            <a href='/contact'>Contact</a>
          </nav>
        </header>
        <main>{props.children}</main>
      </body>
    </html>
  );
};
