"use client";

export default function NewsError({ error }: { error: Error }) {
  return (
    <main className="mx-8">
      <h2>Something went wrong!</h2>
      <p>
        {error.message
          ? error.message
          : "Failed to load news articles. Please try again later."}
      </p>
    </main>
  );
}
