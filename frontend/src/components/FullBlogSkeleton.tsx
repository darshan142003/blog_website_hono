
import { Avatar } from "./BlogCard"

export const FullBlogSkeleton = () => {
    return <div className="min-h-screen bg-white w-screen">
        <div className="flex justify-center">
            <div className="grid grid-cols-12 gap-6 px-10 w-full max-w-screen-xl pt-12">
                {/* Blog content */}
                <div className="col-span-12 lg:col-span-8">
                    <h1 className="text-5xl font-extrabold leading-tight">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </h1>
                    <div className="text-slate-500 pt-2">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="pt-6 text-lg leading-relaxed text-slate-700 min-h-20 ">
                        <div className="h-2 bg-gray-200 rounded-full mb-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-5"></div>
                    </div>
                </div>

                {/* Author section */}
                <div className="col-span-12 lg:col-span-4">
                    <div className="text-slate-600 text-lg font-semibold mb-3">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                    </div>
                    <div className="flex items-start">
                        <div className="pr-4">
                            <Avatar size='big' name={""} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                            </div>
                            <div className="pt-2 text-slate-500 text-sm leading-snug">
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}