import prisma from "./prisma";

export default async function getNews() {
  // try {
  const articles = await prisma.article.findMany({
    orderBy: { date: "desc" },
  });
  return articles;
  // } catch (error) {
  //   console.error("Error fetching articles:", error);
  // }
}
