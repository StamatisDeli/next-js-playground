import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("REQUEST", req);

  if (req.method === "POST") {
    const robots = await prisma.robot.create({ data: req.body });

    return res.status(200).json(robots);
  }
  if (req.method === "GET") {
    const robots = await prisma.robot.findMany();

    return res.status(200).json(robots);
  }
  if (req.method === "DELETE") {
    const { id } = req.body;

    const robots = await prisma.robot.delete({
      where: {
        id,
      },
    });

    return res.status(200).json(robots);
  }
}
