import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { decode, sign, verify } from 'hono/jwt'


const app = new Hono<{ Bindings: { DATABASE_URL: string } }>()


app.use('/api/v1/blog/*', async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token, "secret");
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  await next()
})

app.get('/', (c) => {
  return c.text("hellooooo");
})


app.post('/api/v1/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  })

  const token = await sign({ id: user.id }, "secret");
  return c.json({
    jwt: token
  })
})

app.post('/api/v1/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" })
  }

  const token = sign({ id: user.id }, "secret");
  return c.json({ jwt: token });


})

// app.post('/api/v/blog', (c) => {
//   return c.text("hello");
// })

// app.put('/api/v1/blog', (c) => {

// })

// app.get('/api/v1/blog/:id', (c) => {

// })

export default app
