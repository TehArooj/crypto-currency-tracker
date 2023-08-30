import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.cryptoCurrency.create({
    data: {
      id: "thorchain",
      rank: "56",
      symbol: "RUNE",
      name: "THORChain",
      supply: "340562136.0000000000000000",
      maxSupply: "500000000.0000000000000000",
      marketCapUsd: "501549395.9084100978498696",
      volumeUsd24Hr: "16850122.2971912409207619",
      priceUsd: "1.4727103893558211",
      changePercent24Hr: "2.3521838412656418",
      vwap24Hr: "1.4401529471827739",
      explorer: "https://explorer.binance.org/asset/RUNE-B1A",
      userId: user.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
