import React from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";

import Button from "../components/Button";
import { axiosFetcher, mockApiUrl } from "../api";
import { UserType } from "./types";

interface Props {
  user: UserType;
}

export default function Character({ user }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl w-full px-8 mx-auto">
      <Link href={"/users"}>
        <Button>back to users</Button>
      </Link>

      <h1 className="text-2xl">{user.first_name}</h1>

      <Image src={user.avatar} alt={user.first_name} width={200} height={200} />
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context;

  try {
    const data = await axiosFetcher(`${mockApiUrl}/${params?.id}`);
    return {
      props: {
        user: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
