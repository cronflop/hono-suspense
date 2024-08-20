import { Hono } from 'hono'
import { renderToReadableStream, Suspense } from 'hono/jsx/streaming'

const app = new Hono()

const AsyncComponent = async () => {
  await new Promise((r) => setTimeout(r, 500))
  return <div>async loaded</div>
}

app.get('/', (c) => {
  const stream = renderToReadableStream(
    <html>
      <body>
        <Suspense fallback={<div>loading...</div>}>
          <AsyncComponent />
        </Suspense>
      </body>
    </html>
  )
  return c.body(stream, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Transfer-Encoding': 'chunked',
    },
  })
})

export default app
