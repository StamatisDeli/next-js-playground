import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const robotData: Prisma.RobotCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    avatar:
      "https://robohash.org/etquibusdamnumquam.png?size=300x300\u0026set=set1",
    posts: {
      create: [
        {
          title: "Join the Prisma Slack",
          content: "https://slack.prisma.io",
          published: true,
        },
      ],
    },
  },
  {
    name: "Nilu",
    email: "nilu@prisma.io",
    avatar:
      "https://robohash.org/molestiaequisquamrepellat.png?size=300x300\u0026set=set1",
    posts: {
      create: [
        {
          title: "Follow Prisma on Twitter",
          content: "https://www.twitter.com/prisma",
          published: true,
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    avatar:
      "https://robohash.org/quiearumcommodi.png?size=300x300\u0026set=set1",
    posts: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          content: "https://www.github.com/prisma/prisma/discussions",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const u of robotData) {
    const user = await prisma.robot.create({
      data: u,
    });
    console.log(`Created robot with id: ${user.id}`);
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
