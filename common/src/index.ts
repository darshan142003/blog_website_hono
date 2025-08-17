import { z } from "zod";

//Signup Input Validation
export const signupInput = z.object({
    email: z.email(),
    password: z.string(),
    name: z.string().optional()

})
//Signin input validation 
export const signinInput = z.object({
    email: z.email(),
    password: z.string(),

})
//blog post input
export const blogInput = z.object({
    title: z.string(),
    content: z.string()
})
//blog update input
export const blogUpdate = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})

export type blogUpdate = z.infer<typeof blogUpdate>
export type signupInput = z.infer<typeof signupInput>
export type blogInput = z.infer<typeof blogInput>
export type signinInput = z.infer<typeof signinInput>