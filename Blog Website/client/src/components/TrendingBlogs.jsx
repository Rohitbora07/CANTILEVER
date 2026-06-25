import { Flame, Eye, Heart, Clock3 } from "lucide-react";

const TRENDING_CARDS = [
    {
        title: "The Subtle Art of the Margin in Modern Typography",
        category: "Design",
        views: "12.4K",
        likes: 892,
        readTime: "5 min",
        image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&auto=format&fit=crop&q=80"
    },
    {
        title: "Building Beyond the Virtual DOM Realities",
        category: "Engineering",
        views: "9.1K",
        likes: 654,
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
    },
    {
        title: "Monolithic Architecture and the Indie Creator",
        category: "Business",
        views: "8.3K",
        likes: 541,
        readTime: "6 min",
        image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=400&auto=format&fit=crop&q=80"
    }
];

export default function TrendingBlogs() {
    return (
        <section className="mb-16">

            <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center bg-stone-50/50">
                    <Flame size={13} className="text-[#0077CC]" />
                </div>
                <h2 className="text-xl font-serif font-medium tracking-tight text-stone-900">Trending Now</h2>
            </div>

            <div className="overflow-hidden rounded-2xl relative">
                <div className="flex gap-6">
                    {TRENDING_CARDS.map((blog, i) => (
                        <div
                            key={i}
                            className="group w-72 bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 shrink-0"
                        >
                            <div className="relative h-40 overflow-hidden bg-stone-100">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                                />


                                <div className="absolute bottom-3 left-3">
                                    <span className="px-2.5 py-0.5 rounded bg-[#E0F0FF] border border-[#C8D8E8] text-[#005FA3] text-[10px] font-medium tracking-wider uppercase">
                                        {blog.category}
                                    </span>
                                </div>
                            </div>


                            <div className="p-4 bg-white">
                                <h3 className="font-serif font-normal text-stone-900 text-sm leading-snug mb-3 group-hover:text-[#0077CC] transition-colors duration-200 line-clamp-2">
                                    {blog.title}
                                </h3>


                                <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium pt-3 border-t border-stone-100">
                                    <span className="flex items-center gap-1">
                                        <Eye size={12} className="text-stone-400" />
                                        {blog.views}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Heart size={11} className="text-stone-400" />
                                        {blog.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock3 size={11} className="text-stone-400" />
                                        {blog.readTime}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}