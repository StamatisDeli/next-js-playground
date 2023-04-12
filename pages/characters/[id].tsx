import React from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { axiosFetcher } from "../api";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  type: string;
  gender: string;
};

export default function Character({ character }: { character: Character }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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
      <Image
        src={character.image}
        alt={character.name}
        width={200}
        height={200}
      />
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
  // OR
  // { params }: GetServerSidePropsContext<Params>
) => {
  const { params } = context;
  // console.log("context", context);

  try {
    const data = await axiosFetcher(
      `https://rickandmortyapi.com/api/character/${params?.id}`
    );
    return {
      props: {
        character: data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

// export async function getStaticPaths() {
//   const res = await fetch("https://rickandmortyapi.com/api/character");
//   const data = await res.json();

//   const paths = data.results.map((character: any) => ({
//     params: { id: character.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }: any) {
//   const res = await fetch(
//     `https://rickandmortyapi.com/api/character/${params.id}`
//   );
//   const character = await res.json();

//   return {
//     props: {
//       character,
//     },
//   };
// }
