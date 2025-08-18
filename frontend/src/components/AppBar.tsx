import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {

    return (
        <div className="border-b flex justify-between px-10 py-4 border-slate-200">

            <Link to={'/blogs'}>
                <div>Medium</div>
            </Link>
            <div>
                <Link to={'/publish'}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-stretch-normal rounded-full text-sm px-3 py-2 text-center me-2 mb-2 mr-4">New</button>
                </Link>
                <Avatar size="big" name="darshan" />
            </div>
        </div>
    )
}