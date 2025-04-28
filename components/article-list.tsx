import { Article } from "@/types/types";
import Link from "next/link";

export default function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </li>
      ))}
    </ul>
  );
}
