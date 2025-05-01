"use client";

import Button from "@/components/button";
import { createArticle } from "@/lib/actions";
import { useActionState } from "react";

export default function AddArticleForm() {
  const [error, formAction, isPending] = useActionState(createArticle, {});

  return (
    <section className="mx-8">
      <h1 className="text-3xl font-bold mb-4">Write a new article</h1>
      <form className="space-y-6" action={formAction}>
        <div className="form-control">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-1 bg-white w-full rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
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
        <div className="form-control">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={5}
            className="mt-1 bg-white w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
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
        <Button type="submit">Create post</Button>
        {isPending && <p>Creating post...</p>}
      </form>
    </section>
  );
}
