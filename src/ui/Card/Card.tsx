import { Character } from "@/interfaces";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Spinner from "../spinner/Spinner";
import styles from './Card.module.css';

interface Props {
  character: Character;
}
export default function Card({ character }: Props) {
  const router = useRouter();

	const handleClick = () => {
		router.push(`/character/${character.tail}`); // /character/000e0002
	};


	return (
		<div className={styles.card} onClick={handleClick}>
			<h3>{character.name}</h3>
			{character.image ? (
				<Image
					src={character.image}
					alt={character.name ? character.name : "No name"}
					width={180}
					height={250}
					priority={true}
				/>
			) : (
				<Spinner />
			)}
		</div>
	);
};
