"use client";

import { Button, Input, Label, Textarea } from "@/components/ui";
import { createPost } from "@/lib/actions";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useActionState, useState } from "react";

const initialFormState = {
  success: false,
  message: "",
};

export default function AddArticleForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, formAction, isSubmitting] = useActionState(
    createPost,
    initialFormState
  );

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-muted-foreground">Create and publish a new post</p>
      </div>

      <form className="space-y-6" action={formAction}>
        <Label htmlFor="title">Title</Label>
        <Input placeholder="Enter post title" name="title" />

        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          placeholder="Brief summary of your post"
          className="resize-none"
        />

        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write your post content here..."
          className="min-h-[300px]"
        />

        <div className="space-y-3">
          <Label htmlFor="featured-image">Featured Image</Label>
          <div className="flex items-center gap-4">
            <Label
              htmlFor="featured-image"
              className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed text-sm text-muted-background hover:bg-muted/50"
            >
              <ImageIcon className="mb-2 h-8 w-8" />
              <span>Upload image</span>
              <Input
                type="file"
                id="featured-image"
                name="featured-image"
                accept="image/png, image/jpeg"
                onChange={(e) => handleImageChange(e)}
                className="sr-only"
              />
            </Label>

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
