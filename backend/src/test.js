
import prisma from './config/prisma.js';

async function main() {
  const result = await prisma.$queryRaw`SELECT 1`;
  console.log(result);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });