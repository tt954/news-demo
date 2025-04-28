import prisma from "./prisma";

export default async function getAllNews() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { date: "desc" },
    });
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate slow network
    // await Promise.reject("Testing...");
    return articles;
  } catch (error) {
    // console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch all news articles");
  }
}

export async function getUniqueYears() {
  try {
    const articles = await prisma.article.findMany({
      select: { date: true },
    });
    const years = Array.from(
      new Set(articles.map((article) => new Date(article.date).getFullYear()))
    ).sort((a, b) => b - a);
    // await Promise.reject("Testing...");
    return years;
  } catch (error) {
    throw new Error("Failed to fetch unique years");
  }
}

export async function getUniqueMonths(year: number) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        date: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
      select: { date: true },
    });
    const months = Array.from(
      new Set(articles.map((article) => new Date(article.date).getMonth()))
    ).sort((a, b) => a - b);
    return months;
  } catch (error) {
    throw new Error(`Failed to fetch unique months for year ${year}`);
  }
}

export async function getLatestNews(limit: number = 5) {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { date: "desc" },
      take: limit,
    });
    return articles;
  } catch (error) {
    throw new Error("Failed to fetch the latest news articles");
  }
}
