import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { decode, sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
    },
    Variables: {
        userId: string,
    }
}>()


blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header('Authorization') || "";
    if (!authHeader) {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }
    const token = authHeader.split(' ')[1];

    const user = await verify(token, "secret") as { id: string };

    if (user) {
        c.set("userId", user.id);
        await next()
    }
    else {
        c.status(401);
        return c.json({ error: "unauthorized" });
    }

})



blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })


    return c.json({
        id: blog.id
    })

})


blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany();

        return c.json({
            blogs
        })
    } catch (e) {
        return c.json({
            error: "error geting the blogs"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            }
        })

        return c.json({
            blog
        })
    } catch (e) {
        c.status(401);
        return c.json({
            error: "error while fetching"
        })
    }
})




