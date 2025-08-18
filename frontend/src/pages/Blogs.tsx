import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
    return (
        <div>
            <AppBar />

            <div className="flex justify-center">
                <div className=" max-w-xl">
                    <BlogCard
                        authorName="darshan"
                        title="How an Ugly Single-Page Website makes $5000 a month with Affiliate Marketing"
                        content="No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man nowadays "
                        publishedDate=" 27 feb 2025"
                    />
                    <BlogCard
                        authorName="darshan"
                        title="How an Ugly Single-Page Website makes $5000 a month with Affiliate Marketing"
                        content="No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man nowadays "
                        publishedDate=" 27 feb 2025"
                    />
                    <BlogCard
                        authorName="darshan"
                        title="How an Ugly Single-Page Website makes $5000 a month with Affiliate Marketing"
                        content="No need to create a fancy and modern website with hundreds of pages to make money online. -Making money online is the dream for man nowadays "
                        publishedDate=" 27 feb 2025"
                    />
                </div>
            </div>
        </div>
    )
}