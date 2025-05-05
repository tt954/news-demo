import { Article } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 list-none">
      {articles.map((article) => (
        <li
          key={article.id}
          className="border border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <Link
            href={`/news/${article.slug}`}
            className="flex flex-col h-full no-underline"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={`${process.env.AWS_S3_URL}${article.imageUrl}`}
                alt={article.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-lamp-3">
                {article.text.slice(0, 50)}
                {article.text.length > 50 ? "..." : ""}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-500">
                  {new Date(article.date).toLocaleDateString()}
                </span>
                <span className="text-sm font-medium text-blue-600">
                  Read more
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
