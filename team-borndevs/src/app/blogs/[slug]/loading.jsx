// src/app/blogs/[slug]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"; // Optional if using shadcn/ui
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="bg-white min-h-screen px-4 md:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="animate-pulse">
          <div className="w-full aspect-video bg-gray-200 rounded-xl mb-6" />
          <div className="h-10 bg-gray-300 rounded w-3/4 mb-4" />
          <div className="flex gap-4 mb-6">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
