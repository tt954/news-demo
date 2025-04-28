import { NEWS_ARTICLES } from "@/types/news-articles";
import { getLatestArticles } from "@/lib/utility";

export default function Latest() {
  return (
    <section className="m-8">
      <h2 className="text-2xl font-semibold mb-4">Latest</h2>
      <ul>
        {getLatestArticles(NEWS_ARTICLES).map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </section>
  );
}
