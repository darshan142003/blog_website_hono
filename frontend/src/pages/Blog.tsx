import { useBlog } from '../hooks'
import { FullBlog } from '../components/FullBlog';
import { useParams } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import { FullBlogSkeleton } from '../components/FullBlogSkeleton';

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            <AppBar />

            <div className="h-screen flex flex-col justify-center">

                <div className="flex justify-center">
                    <FullBlogSkeleton />
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    )
}