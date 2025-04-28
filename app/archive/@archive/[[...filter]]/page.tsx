// [[...filter]] catch all paths nested under archive, similar to a default page
// e.g. for /archive/2025 or /archive/2025/0

import ArticleList from "@/components/article-list";
import getAllNews, { getUniqueMonths, getUniqueYears } from "@/lib/news";
import Link from "next/link";

async function FilterHeader({
  selectedYear,
}: {
  selectedYear: string | undefined;
}) {
  const uniqueYears = await getUniqueYears();
  const uniqueMonths = selectedYear
    ? await getUniqueMonths(parseInt(selectedYear))
    : [];

  const getMonthName = (monthIndex: number) =>
    new Date(0, monthIndex).toLocaleDateString("default", { month: "short" });

  return (
    <ul className="text-xl flex flex-wrap gap-4 my-4">
      {selectedYear
        ? uniqueMonths.map((month) => (
            <li key={month} className="hover:text-blue-600 transition-colors">
              <Link href={`/archive/${selectedYear}/${month}`}>
                {getMonthName(month)}
              </Link>
            </li>
          ))
        : uniqueYears.map((year) => (
            <li key={year} className="hover:text-blue-600 transition-colors">
              <Link href={`/archive/${year}`}>{year}</Link>
            </li>
          ))}
    </ul>
  );
}

export default async function FilteredArticles({
  params,
}: {
  params: Promise<{ filter?: string[] }>;
}) {
  const { filter } = await params;
  const selectedYear = filter?.[0];
  const selectedMonth = filter?.[1];

  const allNews = await getAllNews();

  const filteredArticles = allNews.filter((article) => {
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
      <FilterHeader selectedYear={selectedYear} />
      {filteredArticles.length === 0 ? (
        <p>No articles found for selected filters.</p>
      ) : (
        <ArticleList articles={filteredArticles} />
      )}
    </section>
  );
}
