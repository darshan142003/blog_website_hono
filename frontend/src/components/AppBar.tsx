import { Avatar } from "./BlogCard"

export const AppBar = () => {

    return (
        <div className="border-b flex justify-between px-10 py-4 border-slate-200">

            <div>Medium</div>
            <div>
                <Avatar name="darshan" />
            </div>
        </div>
    )
}