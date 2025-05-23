import ArticleList from "@/components/article-list";
import getAllNews from "@/lib/news";

export default async function NewsList() {
  const articles = await getAllNews();

  return (
    <main className="m-8">
      <h1 className="text-3xl font-bold mb-4">All Articles</h1>
      {articles.length && <ArticleList articles={articles} />}
    </main>
  );
}
