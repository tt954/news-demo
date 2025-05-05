"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { uploadImageToS3 } from "./aws-s3-utils";

interface ActionResponse {
  success: boolean;
  message: string | string[];
}

export async function createPost(
  prevState: unknown,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const title = formData.get("title") as string;
    const image = formData.get("feature-image") as File; // usually a binary blob, next.js automatically parses to File
    const content = formData.get("content") as string;
    const slug = slugify(title, { lower: true });

    /* START validate form data */
    const errors: string[] = [];
    if (!title || title.trim().length === 0)
      errors.push("Title cannot be empty");
    if (title.length > 100) errors.push("Title cannot exceed 100 characters");
    if (!image || image.size === 0) errors.push("No image uploaded");
    if (!content || content.trim().length === 0)
      errors.push("Content cannot be empty");
    if (content.length > 5000)
      errors.push("Content cannot exceed 5000 characters");
    if (errors.length > 0) {
      return { success: false, message: errors };
    }
    /* validate form data END */

    /* START process image */
    const imageBuffer = Buffer.from(await image.arrayBuffer()); // process image to buffer
    const fileExtension = image.name.split(".").pop() || "jpg";
    const fileName = `${slug}.${fileExtension}`; // LATER: maybe use nanoid, etc. to make file name unique
    const imageUrl = await uploadImageToS3(imageBuffer, fileName, image.type);
    /* process image END */

    await prisma.article.create({
      data: {
        title,
        text: content,
        slug,
        date: new Date(),
        imageUrl,
      },
    });
    revalidatePath("/news");

    return {
      success: true,
      message: "Post created",
    };
  } catch (error) {
    console.error("Error creating article :>> ", error);
    return { success: false, message: "Failed to create post" };
  }
}
