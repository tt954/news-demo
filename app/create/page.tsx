"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { createArticle } from "@/lib/actions";
import { useActionState } from "react";

const formInitialState = { message: "" };

export default function AddArticleForm() {
  const [error, formAction, isPending] = useActionState(
    createArticle,
    formInitialState
  );

  return (
    <section className="mx-8">
      <h1 className="text-3xl font-bold mb-4">Write a new article</h1>
      <form className="space-y-6" action={formAction}>
        <Input
          name="title"
          className="w-full bg-white rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <Input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          className="mt-1 w-full bg:red text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          label={{ className: "text-sm font-medium text-gray-700" }}
        />
        <Input
          isTextarea
          name="content"
          className="w-full bg-white rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows={5}
        />
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
