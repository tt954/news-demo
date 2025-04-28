import { Article } from '@/types/types';

export const extractYearFromDate = (dateString: string | Date) => {
  if (typeof dateString === 'string' && dateString.match(/^\d{4}-/)) {
    return dateString.substring(0, 4);
  } else {
    try {
      const date = new Date(dateString);
      return date.getFullYear().toString();
    } catch {
      return null;
    }
  }
};

export const getUniqueYearsFromArticles = (articles: Article[]) => {
  const years = articles
    .map((article) => extractYearFromDate(article.date))
    .filter((year) => year !== null)
    .map((year) => parseInt(year));
  const uniqueYears = new Set(years);
  return Array.from(uniqueYears).sort((a, b) => b - a);
};

export const getLatestArticles = (articles: Article[], num: number = 3) => {
  return [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, num);
};

export const filterArticlesByYear = (year: number | string) => {
  const yr = typeof year === 'string' && parseInt(year);
};
