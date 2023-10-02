import React from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";

import Button from "../components/Button";
import { axiosFetcher, MOCK_API_URL, useGetRobot, deleteRobot } from "../api";
import { UserType } from "../../types";

export default function Character() {
  const router = useRouter();

  const { robot, error, isLoading } = useGetRobot(Number(router?.query?.id));

  if (router.isFallback) {
    return <div className="max-w-2xl w-full px-8 mx-auto">Loading data...</div>;
  }

  if (!robot) {
    return (
      <div className="max-w-2xl w-full px-8 mx-auto">Loading no robot...</div>
    );
  }

  const handleDelete = async () => {
    try {
      const res = await deleteRobot(Number(router?.query?.id)).then(() => {
        router.push("/robots");
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl w-full px-8 mx-auto">
      <Link href={"/robots"}>
        <Button className="border-gray-300 border p-3 rounded-lg">
          back to robots
        </Button>
      </Link>{" "}
      <br />
      <br />
      <h1 className="text-2xl">{robot.name}</h1>
      <Image src={robot.avatar} alt={robot.name} width={200} height={200} />
      <br />
      <Button
        className="border-gray-300 border p-3 rounded-lg"
        onClick={handleDelete}
      >
        Delete {robot.name}
      </Button>
    </div>
  );
}
