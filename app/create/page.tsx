"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { createPost } from "@/lib/actions";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useActionState, useState } from "react";

export default function AddArticleForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, formAction, isSubmitting] = useActionState(createPost, {});

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">Create and publish a new post</p>
      </div>

      <form className="space-y-6" action={formAction}>
        <Input
          name="title"
          className="w-full bg-white rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter post title"
        />
        <Input
          isTextarea
          name="excerpt"
          className="resize-none w-full bg-white rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Brief summary of your post"
        />
        <Input
          isTextarea
          name="content"
          className="w-full bg-white rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Write your post content here..."
          rows={5}
        />

        <div className="space-y-3">
          <label htmlFor="featured-image">Featured Image</label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              id="feature-image"
              name="featured-image"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              className="sr-only"
              label={{
                className:
                  "flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm text-muted-background hover:bg-muted/50",
                children: (
                  <>
                    <ImageIcon className="mb-2 h-8 w-8" />
                    <span>Upload image</span>
                  </>
                ),
              }}
            />
            {imagePreview && (
              <div className="relative h-32 w-32 overflow-hidden rounded-md border">
                <Image
                  src={imagePreview || ""}
                  alt="Featured image preview"
                  className="object-cover"
                  fill
                />
              </div>
            )}
          </div>
        </div>

        {Array.isArray(error?.message) && (
          <ul>
            {error.message.map((error, idx) => (
              <li key={idx} className="text-red-500">
                {error}
              </li>
            ))}
          </ul>
        )}
        {typeof error?.message === "string" && (
          <p className="text-red-500">{error.message}</p>
        )}

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <SendIcon className="mr-2 h-4 w-4" />
                Publish Post
              </>
            )}
          </Button>
        </div>
      </form>
    </section>
  );
}
