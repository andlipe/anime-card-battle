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
  const [isAutoRollActive, setIsAutoRollActive] = useState(false);
  const { addCardToInventory } = useInventory();
  const { makeRoll } = useRoll();

  function handleClick() {
    const cardRolled = makeRoll(0);
    addCardToInventory(cardRolled);
    setRolledCard(cardRolled);
  }

  function handleAutoRollClick() {}

  function defineBorderColor() {
    switch (rolledCard.border) {
      case "gold":
        return "border-yellow-400";
      case "rainbow":
        return "border-red-400";
      case "universal":
        return "border-blue-600";
      default:
        return "border-gray-600";
    }
  }

  return (
    <div className="flex justify-center h-screen content-center flex-col">
      <div className="flex self-center">{rolledCard.name}</div>
      {rolledCard.imgSrc !== "" && (
        <div
          className={`border-4 ${defineBorderColor()} max-w-max flex self-center`}
        >
          <Image
            src={rolledCard.imgSrc}
            width={500}
            height={800}
            alt={rolledCard.name}
          />
        </div>
      )}
      <div className="flex self-center">
        <button
          className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900 w-32 flex self-center text-center"
          onClick={handleClick}
        >
          Roll
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900 w-32 flex self-center text-center">
          AutoRoll
        </button>
      </div>
    </div>
  );
}
