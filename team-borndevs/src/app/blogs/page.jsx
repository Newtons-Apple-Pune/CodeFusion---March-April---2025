"use client";

import { BlogData } from "@/lib/blogData";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function BlogList() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-10 lg:mt-20">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Latest Blog Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {BlogData.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`} passHref>
            <Card className="cursor-pointer hover:shadow-2xl shadow-md transition duration-300 p-0">
              <CardHeader className="p-0 mb-4">
                <div className="relative w-full aspect-video rounded-t-md overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.date} • {post.readTime}
                </p>
                <p className="text-sm text-primary mt-1">{post.author}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
