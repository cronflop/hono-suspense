import { Hono } from 'hono'
import { renderToReadableStream, Suspense } from 'hono/jsx/streaming'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

const AsyncComponent = async () => {
  await new Promise((r) => setTimeout(r, 1000)) // sleep 1s
  return <div>Done!</div>
}

// app.get('/', (c) => {
//   return c.html(
//     <>
//       <h1>Headline</h1>
//       <AsyncComponent />
//     </>
//   )
// })

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
