import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_ARTICLES = [
  {
    id: 1,
    slug: "monchhichi-collectors-guide",
    title: "The Ultimate Monchhichi Collector's Guide",
    imageUrl: "/collectors-guide.jpg",
    date: "2025-01-11",
    text: "Explore the fascinating history of Monchhichi and learn how to spot rare editions. Whether you're a seasoned collector or just getting started, this guide has something for everyone!",
  },
  {
    id: 2,
    slug: "bebichhichi-vs-monchhichi",
    title: "Bebichhichi vs. Monchhichi: What’s the Difference?",
    imageUrl: "/bebichhichi-vs-monchhichi.jpg",
    date: "2025-04-15",
    text: "Both adorable and full of charm, but what's the real difference between a Monchhichi and a Bebichhichi? We break down the origins, features, and vibes of each.",
  },
  {
    id: 3,
    slug: "monchhichi-gift-guide",
    title: "Monchhichi Gift Guide for Every Occasion",
    imageUrl: "/gift-guide.jpg",
    date: "2025-04-18",
    text: "Looking for the perfect gift? From plushies to keychains, our Monchhichi Gift Guide will help you find something heartwarming for birthdays, holidays, and just-because days.",
  },
  {
    id: 4,
    slug: "how-to-style-with-monchhichi",
    title: "How to Style Your Space with Monchhichi",
    imageUrl: "/style-your-space.jpg",
    date: "2025-01-20",
    text: "Turn your room into a cozy, kawaii dreamland with our top tips for decorating with Monchhichi and Bebichhichi. From shelves to sticker walls — cute vibes only!",
  },
  {
    id: 5,
    slug: "rare-monchhichi-spotlight",
    title: "Spotlight on Rare Monchhichi Releases",
    imageUrl: "/rare-monchhichi.jpg",
    date: "2024-04-22",
    text: "These elusive Monchhichi designs are hard to find but worth the hunt. Dive into our spotlight on the rarest and most coveted pieces from past collections.",
  },
  {
    id: 6,
    slug: "monchhichi-through-the-decades",
    title: "Monchhichi Through the Decades",
    imageUrl: "/monchhichi-history.jpg",
    date: "2023-11-05",
    text: "Take a nostalgic stroll through the decades and see how Monchhichi has evolved over time — from vintage styles to modern-day cuteness.",
  },
  {
    id: 7,
    slug: "top-10-monchhichi-plushies",
    title: "Top 10 Monchhichi Plushies of All Time",
    imageUrl: "/top-10-plushies.jpg",
    date: "2024-06-21",
    text: "From the classic original to the seasonal favorites, we rank the top 10 Monchhichi plushies that stole our hearts (and shelves).",
  },
  {
    id: 8,
    slug: "diy-monchhichi-keychain-display",
    title: "DIY Monchhichi Keychain Display Ideas",
    imageUrl: "/diy-keychains.jpg",
    date: "2024-09-10",
    text: "Looking for a cute way to show off your Monchhichi keychains? Here are a few easy and aesthetic DIY display ideas to brighten your space.",
  },
  {
    id: 9,
    slug: "monchhichi-around-the-world",
    title: "Monchhichi Around the World",
    imageUrl: "/monchhichi-world.jpg",
    date: "2023-04-19",
    text: "From Japan to Europe, Monchhichi has fans across the globe. Discover how different countries celebrate this timeless icon.",
  },
  {
    id: 10,
    slug: "holiday-gift-box-launch",
    title: "Holiday Monchhichi Gift Box Launch!",
    imageUrl: "/holiday-box.jpg",
    date: "2025-12-01",
    text: "Just in time for the holidays — our limited-edition Monchhichi Gift Box is here! Packed with exclusive merch, this box is a cozy surprise waiting to happen.",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const article of SEED_ARTICLES) {
    const created = await prisma.article.create({
      data: {
        id: article.id,
        slug: article.slug,
        title: article.title,
        imageUrl: article.imageUrl,
        date: new Date(article.date),
        text: article.text,
      },
    });
    console.log(`Created article with id: ${created.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
