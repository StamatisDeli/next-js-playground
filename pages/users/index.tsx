import React from "react";
import Image from "next/image";
import Link from "next/link";

import { UserType } from "../../types";
import { axiosFetcher, mockApiUrl } from "../api";
import Button from "../components/Button";

interface Props {
  users: UserType[];
}

export default function Users({ users }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCharacters = users?.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl w-full mx-auto px-8">
      <h1 className="text-3xl">Users</h1>
      <br />
      <br />
      <h2 className="text-2xl">getServerSideProps</h2>
      <br />
      <br />
      <Link href={"/create-user"}>
        <Button>Create User</Button>
      </Link>
      <br />
      <br />
      <input
        className="text-black"
        type="text"
        placeholder="Search characters"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <br />
      <br />
      <div className="grid grid-cols-4 gap-5">
        {filteredCharacters?.map((item) => (
          <Link key={item.id} href={`/users/${item.id}`}>
            <h2>{item.first_name}</h2>
            <Image
              alt={item.first_name}
              src={item.avatar}
              width={200}
              height={200}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    const data = await axiosFetcher(mockApiUrl);
    // console.log("DATA", data);
    console.log("GETTING USERS", data);
    return {
      props: {
        users: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
