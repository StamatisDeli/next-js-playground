import { NextApiResponse, NextApiRequest } from "next";

import { prisma } from "../lib/prisma";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const robots = await prisma.robot.findMany();
  console.log("api robots", robots);
  return res.status(200).json(robots);
}
