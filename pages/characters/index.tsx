import React from "react";
import Image from "next/image";
import Link from "next/link";
import { axiosFetcher } from "../api";

type CharacterProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};

interface Props {
  characters: CharacterProps[];
}

export default function Characters({ characters }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl w-full mx-auto px-8">
      <h1 className="text-3xl">Ricky and Morty</h1>
      <br />
      <h2 className="text-2xl">getServerSideProps</h2>
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
          <Link key={item.id} href={`/characters/${item.id}`}>
            <h2>{item.name}</h2>
            <Image alt={item.name} src={item.image} width={200} height={200} />
          </Link>
        ))}
      </div>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://rickandmortyapi.com/api/character");
//   const char = await res.json();
//   const characters = char.results;

//   return {
//     props: {
//       characters,
//     },
//   };
// }

// export const getServerSideProps = async () => {
//   const { data } = await axios.get("https://rickandmortyapi.com/api/character");
//   console.log(data);
//   return {
//     props: {
//       characters: data.results,
//     },
//   };
// };
export const getServerSideProps = async () => {
  try {
    const data = await axiosFetcher(
      "https://rickandmortyapi.com/api/character"
    );
    // console.log("DATA", data);
    return {
      props: {
        characters: data.results,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
