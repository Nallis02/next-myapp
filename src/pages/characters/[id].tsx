import { Character } from "@/interfaces";
import Layout from "@/layouts/Layout";
import Card from "@/ui/Card/Card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CharacterPage() {
  const [character, setCharacter] = useState<Character>({} as Character);

  const router = useRouter();

  
  const getCharacter = async () => {
    const rest = await fetch(
      `https://www.amiiboapi.com/api/amiibo/?tail=${router.query.id}`
    );
    const data = await rest.json();
    const characterApi = data.amiibo[0];
    setCharacter(characterApi);
  };

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <Layout
      title={character.name}
      description={`Pagina del personaje ${character.name}`}
    >
      <h1>Character Page</h1>
      <Card character={character} />
    </Layout>
  );
}
