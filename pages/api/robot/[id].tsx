import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  switch (req.method) {
    case "GET":
      const robots = await prisma.robot.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json(robots);

    case "DELETE":
      const robot = await prisma.robot.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json(robot);

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      );
  }
}
