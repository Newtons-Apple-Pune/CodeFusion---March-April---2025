
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogData } from "@/lib/blogData";
import remarkHtml from "remark-html";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import Image from "next/image";
import fs from 'fs/promises'
import path from 'path';

export const dynamic = "force-static";
export const revalidate = false;

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const blog = BlogData.find((blog) => blog.slug === slug);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.title,
    openGraph: {
      title: blog.title,
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      article: {
        publishedTime: blog.date,
        authors: [blog.author],
      },
    },
  };
}

export async function generateStaticParams() {
  return BlogData.map((blog) => ({
    slug: blog.slug,
  }));
}

async function getPost(slug) {
  try {
    const filePath = path.join(process.cwd(), "public", "blogs", `${slug}.md`);
    const fileContents = await fs.readFile(filePath, "utf8");

    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkHtml)
      .process(fileContents);

    const contentHtml = processedContent.toString();
    const blog = BlogData.find((blog) => blog.slug === slug);

    return { ...blog, contentHtml };
  } catch (err) {
    console.error("Error fetching post:", err);
    return null;
  }
}

export default async function Page({ params }) {
  const slug = (await params).slug;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen px-4 md:px-8 py-10 mt-10 lg:mt-20">
      <div className="max-w-4xl mx-auto">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-sm text-secondary-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {post.coverImage && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 shadow-sm">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          {post.date && <span>{post.date}</span>}
          {post.readTime && <span>{post.readTime}</span>}
          {post.author && (
            <Link
              href={post.linkedin || "#"}
              className="hover:underline text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.author}
            </Link>
          )}
        </div>

        <div className="prose prose-lg max-w-none prose-slate">
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }}/>
          </div>
      </div>
    </div>
  );
}
