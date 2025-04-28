import { getNewsBySlug } from "@/lib/news";

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  return (
    <article className="mx-8 leading-relaxed">
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <p className="text-sm text-gray-500 mb-5">{article.date.toString()}</p>
      <p className="text-base text-gray-800">{article.text}</p>
    </article>
  );
}
