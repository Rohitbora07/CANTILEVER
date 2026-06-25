import { Globe, ArrowRight } from "lucide-react";
import { BlogCard } from "./BlogCard";

const BLOG_CARDS = [
    {
        title: "The Quiet Evolution of Minimalist Layouts",
        description: "An evaluation of editorial design systems shifting away from over-saturated visual elements back toward classic grid typography.",
        category: "Typography",
        image: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=600&auto=format&fit=crop&q=80",
        readTime: "4 min",
        date: "June 18, 2026",
        likes: 312,
        author: {
            name: "Marcus Aurel",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&q=80"
        }
    },
    {
        title: "Rethinking Component Architecture",
        description: "How structural patterns inside component ecosystems mirror traditional print production frameworks for greater maintainability.",
        category: "Engineering",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
        readTime: "6 min",
        date: "June 14, 2026",
        likes: 521,
        author: {
            name: "Clara Vance",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&q=80"
        }
    },
    {
        title: "The Human Element in Cognitive Design",
        description: "Investigating the emotional impact of fine-tuned margins, structural tracking, and low-contrast warm palettes on long-form reading.",
        category: "Philosophy",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=80",
        readTime: "5 min",
        date: "May 29, 2026",
        likes: 443,
        author: {
            name: "Julian Cole",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&q=80"
        }
    }
];

export default function BlogGrid() {
    return (
        <section className="mb-16">

            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200/60">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg border border-stone-300 flex items-center justify-center bg-stone-50/50">
                        <Globe size={13} className="text-[#0077CC]" />
                    </div>
                    <h2 className="text-xl font-serif font-medium tracking-tight text-stone-900">Latest Articles</h2>
                </div>

                <a
                    href="#"
                    className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#0077CC] hover:text-[#005FA3] transition-colors"
                >
                    View all <ArrowRight size={13} />
                </a>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {BLOG_CARDS.map((blog, i) => (
                    <BlogCard key={i} blog={blog} index={i} />
                ))}
            </div>
        </section>
    );
}