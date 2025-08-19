import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from 'axios'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { blogDetailState, blogListState } from "../state/blogAtom";

export interface Blog {
    content: string,
    title: string,
    id: number,
    author: {
        name: string
    }
}


export const useBlog = ({ id }: { id: string }) => {

    const blogs = useRecoilValue(blogListState);
    const setBlogDetail = useSetRecoilState(blogDetailState);
    const blogCache = useRecoilValue(blogDetailState);

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();


    useEffect(() => {
        // 1. Try to find blog in list
        const foundInList = blogs.find((b) => String(b.id) === String(id));
        // 2. Try to find blog in detail cache
        const foundInDetail = blogCache[id];

        if (foundInList) {
            setBlog(foundInList);
            setLoading(false);
        } else if (foundInDetail) {
            setBlog(foundInDetail);
            setLoading(false);
        } else {
            // 3. Fetch from backend if not cached
            const token = localStorage.getItem("token");
            axios
                .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setBlog(response.data.blog);
                    setBlogDetail((prev) => ({ ...prev, [id]: response.data.blog }));
                    setLoading(false);
                });
        }
    }, [id, blogs, blogCache]);

    return {
        loading,
        blog
    }

}

export const useBlogs = () => {


    const [blogs, setBlogs] = useRecoilState(blogListState);
    const [loading, setLoading] = useState(blogs.length === 0);


    useEffect(() => {

        const token = localStorage.getItem("token");
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setBlogs(response.data.blogs)
                setLoading(false);
            })

    }, [setBlogs])

    return {
        loading,
        blogs
    }

}


