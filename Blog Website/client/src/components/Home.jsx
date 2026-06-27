import Hero from './Hero'
import Sidebar from './SideBar'
import FeaturedBlog from './FeaturedBlog'
import BlogGrid from './BlogGrid'
import TrendingBlogs from './TrendingBlogs'

function Home() {
    return (
        <div className="min-h-screen bg-[#F4F7FB] font-sans antialiased text-stone-900">



            <main>
                <Hero />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-200/60">
                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start">

                        <aside className="w-full lg:w-72 xl:w-80 shrink-0 order-2 lg:order-1 sticky top-28">
                            <Sidebar />
                        </aside>
                        <div className="flex-1 min-w-0 order-1 lg:order-2 space-y-12">
                            <FeaturedBlog />
                            <BlogGrid />
                            <TrendingBlogs />
                        </div>

                    </div>
                </div>
            </main>


        </div>
    )
}

export default Home
