import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Character } from "@/interfaces";
import { GetStaticProps } from "next";
import Layout from "@/layouts/Layout";
import Card from "@/ui/Card/Card";
import { CONTENT_BY_LOCALE } from "@/locales";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  characters: Character[];
}
export default function Home({ characters }: Props) {
	
	const { locale, locales, defaultLocale } = useRouter();
	
	const localeConten = CONTENT_BY_LOCALE[locale as keyof typeof CONTENT_BY_LOCALE]

	const {home} = localeConten
  return (
    <>
      <Layout
        title="Ecommerce App - DH"
        description="Ecommerce de Figuras coleccionables, Mario, Luigi"
      >
        <h1>{home.title}</h1>
        <div className={styles.grid}>
          {characters?.map((character) => (
            <Card key={character.tail} character={character} />
          ))}
        </div>
      </Layout>
    </>
  );
}
export const getStaticProps: GetStaticProps = async () => {
	const characters = await fetch("https://www.amiiboapi.com/api/amiibo/");
	const resp = await characters.json();
	const data = resp.amiibo.slice(0, 20);
	return {
		props: {
			characters: data
		}
	}
};
