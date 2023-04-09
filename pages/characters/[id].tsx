import React from "react";
import { useRouter } from "next/router";

export default function Character({ character }: { character: string }) {
  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl w-full px-8 mx-auto">
      <h1 className="text-2xl">{character.name}</h1>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Type: {character.type}</p>
      <p>Gender: {character.gender}</p>
      <img src={character.image} alt={character.name} />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();

  const paths = data.results.map((character: any) => ({
    params: { id: character.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
}
