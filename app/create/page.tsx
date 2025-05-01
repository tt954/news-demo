"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { createArticle } from "@/lib/actions";
import { useActionState } from "react";

export default function AddArticleForm() {
  const [error, formAction, isPending] = useActionState(createArticle, {});

  return (
    <section className="mx-8">
      <h1 className="text-3xl font-bold mb-4">Write a new article</h1>
      <form className="space-y-6" action={formAction}>
        <Input name="title" />
        <div className="form-control">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
        </div>
        <Input type="textarea" name="content" rows={5} />
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
        <Button type="submit">Create post</Button>
        {isPending && <p>Creating post...</p>}
      </form>
    </section>
  );
}
