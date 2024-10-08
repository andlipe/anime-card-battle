
"use client";

import Image from "next/image";
import { useState } from "react";
import { useInventory } from "./hooks/inventory";

export default function Home() {
  const {addCardToInventory} = useInventory()
  const [rolledCard, setRolledCard] = useState(
    {
      id: 0,
      name: '',
      rarity: 0,
      imgSrc: ''
    }, 
  )
  const cards = [
  {
    id: 1,
    name: 'Bandit',
    rarity: 0.9,
    imgSrc:'https://static.wikia.nocookie.net/anime-card-battle/images/2/24/Bandit_norm.png/revision/latest?cb=20240818184819'
  }, 

  {
    id: 2,
    name: 'Pirate',
    rarity: 0.8,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/b/bf/Pirate_Norm.png/revision/latest?cb=20240818185032'
  },
  {
    id: 3,
    name: 'Green Fiend',
    rarity: 0.7,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/8/8e/Green_Fiend_Norm.png/revision/latest?cb=20240818185403 '
  },
  {
    id: 4,
    name: 'Slime',
    rarity: 0.3,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/7/75/Slime_Norm.png/revision/latest?cb=20240806000545'
  },
  {
    id: 5,
    name: 'Shade',
    rarity: 0.1,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/9/99/Shade.jpg/revision/latest?cb=20240818233215'
  },
  {
    id: 6,
    name: 'Prince',
    rarity: 0.085,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/1/1c/Prince_Norm.png/revision/latest?cb=20240806002253'
  },
  {
    id: 7,
    name: 'Pirate Hunter',
    rarity: 0.065,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/b/b6/PirateHunter.jpg/revision/latest?cb=20240818233310'
  },
  {
    id: 8,
    name: 'Wild Gon',
    rarity: 0.05,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/6/65/WildChild.jpg/revision/latest?cb=20240818233351'
  },
  {
    id: 9,
    name: 'Substitute Reaper',
    rarity: 0.01,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/6/6b/SubstituteReaper.png/revision/latest?cb=20240818233437'
  },
  {
    id: 10,
    name: 'Knucklehead Ninja',
    rarity: 0.009,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/9/9c/KnuckleheadNinja.png/revision/latest?cb=20240906141318'
  },
  {
    id: 11,
    name: 'Rubber Boy',
    rarity: 0.007,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/5/5f/RubberBoy.png/revision/latest?cb=20240818233622'
  },
 {
    id: 12,
    name: 'Nail Master',
    rarity: 0.0055,
    imgSrc: 'https://static.wikia.nocookie.net/anime-card-battle/images/6/64/NailMaster.png/revision/latest?cb=20240818233709'
  },
 
  ]

  const makeRoll = (luck: number) => {
    const weight = (cards) => {
      return [].concat(
        ...cards.map((card: { rarity: number; }) => {
          const adjustedRarity = card.rarity * (1 + (1 - card.rarity) * luck); // Aumenta a raridade com base na "luck"
          return Array(Math.ceil(adjustedRarity * 100)).fill(card);
        })
      );
    };
    const weighted = weight(cards);
    const cardRolled = weighted[Math.floor((Math.random()) * weighted.length)]
    addCardToInventory(cardRolled)
    setRolledCard(cardRolled)

  }

  return (
    <div className="flex justify-center h-screen content-center flex-col">
      <div className="flex self-center">{rolledCard.name}</div>
      {rolledCard.imgSrc !== '' && (<Image src={rolledCard.imgSrc} width={500} height={800} alt={rolledCard.name}/>)}
      
      <button className="bg-gray-500 hover:bg-gray-700 active:bg-gray-900" onClick={() => makeRoll(0)}>Roll</button>
    </div>
  );
}
