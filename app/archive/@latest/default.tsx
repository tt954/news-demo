import ArticleList from "@/components/article-list";
import { getLatestNews } from "@/lib/news";

export default async function Latest() {
  const latestNews = await getLatestNews();
  return (
    <section className="m-8">
      <h2 className="text-2xl font-semibold mb-4">Latest</h2>
      <ArticleList articles={latestNews} />
    </section>
  );
}
