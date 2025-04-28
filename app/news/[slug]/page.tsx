import { NEWS_ARTICLES } from '@/types/news-articles';
import { Article as ArticleType } from '@/types/types';

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find(
    (article) => article.id === parseInt(slug)
  ) as ArticleType;

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.text}</p>
    </article>
  );
}
