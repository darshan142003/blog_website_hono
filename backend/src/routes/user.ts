import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupInput } from "../zod";
import { decode, sign, verify } from 'hono/jwt'



export const userRouter = new Hono<{ Bindings: { DATABASE_URL: string } }>()


userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(403)
        return c.json({ error: "ivalid input format" })
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    try {
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
    } catch (e) {
        console.error("Signup error:", e); // Helps you debug
        c.status(400); // Use 400 for bad request
        return c.json({ error: "Request failed", details: String(e) });
    }
})

userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });

        if (!user) {
            c.status(403);
            return c.json({ error: "Invalid Cred" })
        }

        const token = await sign({ id: user.id }, "secret");
        return c.json({ jwt: token });
    } catch (e) {
        c.status(403);
        return c.json({ error: "Invalid" })
    }


})