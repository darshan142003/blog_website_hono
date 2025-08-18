import { Avatar } from '../components/BlogCard'
import { AppBar } from './AppBar'

export interface Blog {
    content: string,
    title: string,
    id: number,
    author: {
        name: string
    }
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
    return (
        <div className="min-h-screen bg-white">
            <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 gap-6 px-10 w-full max-w-screen-xl pt-12">
                    {/* Blog content */}
                    <div className="col-span-12 lg:col-span-8">
                        <h1 className="text-5xl font-extrabold leading-tight">
                            {blog.title}
                        </h1>
                        <p className="text-slate-500 pt-2">
                            Posted on 2nd December 2023
                        </p>
                        <div className="pt-6 text-lg leading-relaxed text-slate-700">
                            {blog.content}
                        </div>
                    </div>

                    {/* Author section */}
                    <div className="col-span-12 lg:col-span-4">
                        <div className="text-slate-600 text-lg font-semibold mb-3">
                            Author
                        </div>
                        <div className="flex items-start">
                            <div className="pr-4">
                                <Avatar size='big' name={blog.author.name || "Anonymous"} />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    {blog.author.name || "Anonymous"}
                                </div>
                                <p className="pt-2 text-slate-500 text-sm leading-snug">
                                    Random catch phrase about the author's ability
                                    to grab the user's attention.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
