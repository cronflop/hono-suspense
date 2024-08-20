import { jsxRenderer } from 'hono/jsx-renderer'

// Unused but should also work with `stream:true`
export const renderer = jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}, { stream: true })
