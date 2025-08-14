import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  // Get query parameter like /?param=test
  const param = c.req.query('param')
  console.log('Query param:', param)

  // Get header like Authorization: Bearer token
  const authHeader = c.req.header('Authorization')
  console.log('Authorization header:', authHeader)

  // No need to parse JSON body on GET (it should be in POST/PUT)
  return c.text('Hello Hono!')
})

export default app
