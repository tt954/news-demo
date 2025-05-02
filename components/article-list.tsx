import { Article } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-0 list-none">
      {articles.map((article) => (
        <li
          key={article.id}
          className="border rounded overflow-hidden flex flex-col justify-between"
        >
          <Link href={`/news/${article.slug}`}>
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_DOMAIN}${article.imageUrl}`}
              alt={article.title}
              width={400}
              height={250}
              className="w-full object-cover"
            />
            <p className="p-2 text-center font-medium">{article.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
