import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const fakeTokens = [
  {
    title: 'bitcoin',
    description: 'hello',
    price: 290000,
  },
  {
    title: 'shiba',
    description: 'life',
    price: 49903,
  },
  {
    title: 'etherium',
    description: 'love',
    price: 43230,
  },
  {
    title: 'solana',
    description: 'magic',
    price: 44990,
  },
  {
    title: 'luna',
    description: 'knife',
    price: 76833,
  },
  {
    title: 'XRP',
    description: 'perfect',
    price: 68303,
  },
  {
    title: 'algo',
    description: 'candle',
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
