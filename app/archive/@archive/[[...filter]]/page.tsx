// [[...filter]] catch all paths nested under archive, similar to a default page
// e.g. for /archive/2025 or /archive/2025/jan

import ArticleList from '@/components/article-list';
import { getUniqueYearsFromArticles } from '@/libs/utility';
import { NEWS_ARTICLES } from '@/types/news-articles';
import Link from 'next/link';

export default function FilteredArticles({ params }) {
  const selectedYear = params.filter?.[0];
  const selectedMonth = params.filter?.[1];

  const uniqueYears = getUniqueYearsFromArticles(NEWS_ARTICLES);
  const uniqueMonths = selectedYear
    ? Array.from(
        new Set(
          NEWS_ARTICLES.filter(
            (article) =>
              new Date(article.date).getFullYear().toString() === selectedYear
          )
            .map((article) => new Date(article.date).getMonth())
            .sort((a, b) => a - b)
        )
      )
    : [];

  const getMonthName = (monthIndex: number) =>
    new Date(0, monthIndex).toLocaleDateString('default', { month: 'short' });

  const filteredArticles = NEWS_ARTICLES.filter((article) => {
    const articleDate = new Date(article.date);
    const articleYear = articleDate.getFullYear().toString();
    const articleMonth = articleDate.getMonth();

    if (selectedYear && articleYear !== selectedYear) return false;
    if (selectedMonth && articleMonth !== parseInt(selectedMonth)) return false;
    return true;
  });

  return (
    <section className="m-8">
      <h1 className="text-3xl font-bold mb-4">News Archive</h1>
      <ul className="text-xl flex flex-wrap gap-2">
        {selectedYear
          ? uniqueMonths.map((month) => (
              <li key={month}>
                <Link href={`/archive/${selectedYear}/${month}`}>
                  {getMonthName(month)}
                </Link>
              </li>
            ))
          : uniqueYears.map((year) => (
              <li key={year}>
                <Link href={`/archive/${year}`}>{year}</Link>
              </li>
            ))}
      </ul>
      {filteredArticles.length === 0 ? (
        <p>No articles found for selected filters.</p>
      ) : (
        <ArticleList articles={filteredArticles} />
      )}
    </section>
  );
}
