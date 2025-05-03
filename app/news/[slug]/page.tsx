import { getNewsBySlug } from "@/lib/news";
import Image from "next/image";

export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  return (
    <article className="mx-8 leading-relaxed">
      <Image
        src={`${process.env.NEXT_PUBLIC_S3_URL}${article.imageUrl}`}
        alt={article.title}
        width={300}
        height={200}
        className="object-cover"
      />
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <p className="text-sm text-gray-500 mb-5">{article.date.toString()}</p>
      <p className="text-base text-gray-800">{article.text}</p>
    </article>
  );
}
