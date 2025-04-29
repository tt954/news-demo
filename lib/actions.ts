"use server";

import prisma from "@/lib/prisma";
import { Article } from "@/types/types";
import { revalidatePath } from "next/cache";
import slugify from "slugify";

export async function createArticle(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const image = formData.get("image") as File; // usually a binary blob, next.js automatically parses to File
    const content = formData.get("content") as string;
    const slug = slugify(title, { lower: true });

    const errors: string[] = [];

    if (!title || title.trim().length === 0)
      errors.push("Title cannot be empty");
    if (title.length > 100) errors.push("Title cannot exceed 100 characters");
    if (!image || image.size === 0) errors.push("No image uploaded");
    if (!content || content.trim().length === 0)
      errors.push("Content cannot be empty");
    if (content.length > 5000)
      errors.push("Content cannot exceed 5000 characters");

    if (errors.length > 0) return { message: errors };

    const buffer = Buffer.from(await image.arrayBuffer());

    const rawArticleData = { title, slug, image: "", text: content };

    return { message: rawArticleData };
    // await prisma.article.create({
    //   data: {
    //     title,
    //     text: content,
    //     slug,
    //     date: new Date(),
    //     image: "",
    //   },
    // });
    // revalidatePath("/news");
  } catch (error) {
    console.error("Error creating article :>> ", error);
    return { message: "Error creating article" };
  }
}
