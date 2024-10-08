"use client";

import Image from "next/image";
import { useState } from "react";
import { useInventory } from "./hooks/inventory.hook";
import { useRoll } from "./hooks/roll.hook";

export default function Home() {
  const [rolledCard, setRolledCard] = useState({
    id: 0,
    name: "",
    rarity: 0,
    imgSrc: "",
    border: "",
  });
  const { addCardToInventory } = useInventory();
  const { makeRoll } = useRoll();

  function handleClick() {
    const cardRolled = makeRoll(0);
    addCardToInventory(cardRolled);
    setRolledCard(cardRolled);
  }

  return (
    <div className="flex justify-center h-screen content-center flex-col">
      <div className="flex self-center">{rolledCard.name}</div>
      {rolledCard.imgSrc !== "" && (
        <Image
          src={rolledCard.imgSrc}
          width={500}
          height={800}
          alt={rolledCard.name}
        />
      )}

      <button
        className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900"
        onClick={handleClick}
      >
        Roll
      </button>
    </div>
  );
}
