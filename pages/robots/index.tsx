import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useGetRobots } from "../api";
import Button from "../components/Button";

export default function Users() {
  const { robots, error, isLoading } = useGetRobots();

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!robots) return null;

  return (
    <div className="max-w-2xl w-full mx-auto px-8">
      <h1 className="text-3xl">ROBOTS</h1>
      <br />
      <br />
      <Link href={"/create-robot"}>
        <Button className="border-gray-300 border p-3 rounded-lg">
          Create Robot
        </Button>
      </Link>

      <br />
      <br />
      <div className="grid grid-cols-4 gap-5">
        {robots?.map((item: any) => (
          <Link key={item.id} href={`/robots/${item.id}/`}>
            <h2>{item.name}</h2>
            <Image alt={item.name} src={item.avatar} width={200} height={200} />
          </Link>
        ))}
      </div>
    </div>
  );
}
