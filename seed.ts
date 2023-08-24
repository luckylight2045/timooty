import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const fakeTokens = [
  {
    title: 'bitcoin',
    price: 290000,
  },
  {
    title: 'shiba',
    price: 49903,
  },
  {
    title: 'etherium',
    price: 43230,
  },
  {
    title: 'solana',
    price: 44990,
  },
  {
    title: 'luna',
    price: 76833,
  },
  {
    title: 'XRP',
    price: 68303,
  },
  {
    title: 'algo',
    price: 7973,
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const t of fakeTokens) {
    const token = await prisma.token.create({
      data: t,
    });
    console.log(`Created user with id: ${token.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
