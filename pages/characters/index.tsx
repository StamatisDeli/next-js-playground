import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  characters: any[];
}

export default function Characters({ characters }: Props) {
  return (
    <div className="max-w-2xl w-full mx-auto px-8">
      <h1 className="text-3xl">Ricky and Morty</h1>

      <div className="grid grid-cols-4 gap-5">
        {characters?.map((item) => (
          <Link key={item.id} href={`/characters/${item.id}`}>
            <h2>{item.name}</h2>
            <Image alt={item.name} src={item.image} width={200} height={200} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const char = await res.json();
  const characters = char.results;

  return {
    props: {
      characters,
    },
  };
}
