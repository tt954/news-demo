import ArticleList from '@/components/article-list';
import { NEWS_ARTICLES } from '@/types/news-articles';

export default function NewsList() {
  return (
    <main className="m-8">
      <h1 className="text-3xl font-bold mb-4">All Articles</h1>
      <ArticleList articles={NEWS_ARTICLES} />
    </main>
  );
}
