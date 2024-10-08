const cards = [
  {
    id: 1,
    name: "Bandit",
    rarity: 0.9,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/2/24/Bandit_norm.png/revision/latest?cb=20240818184819",
    border: "normal",
  },

  {
    id: 2,
    name: "Pirate",
    rarity: 0.8,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/b/bf/Pirate_Norm.png/revision/latest?cb=20240818185032",
    border: "normal",
  },
  {
    id: 3,
    name: "Green Fiend",
    rarity: 0.7,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/8/8e/Green_Fiend_Norm.png/revision/latest?cb=20240818185403 ",
    border: "normal",
  },
  {
    id: 4,
    name: "Slime",
    rarity: 0.3,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/7/75/Slime_Norm.png/revision/latest?cb=20240806000545",
    border: "normal",
  },
  {
    id: 5,
    name: "Shade",
    rarity: 0.1,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/9/99/Shade.jpg/revision/latest?cb=20240818233215",
    border: "normal",
  },
  {
    id: 6,
    name: "Prince",
    rarity: 0.085,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/1/1c/Prince_Norm.png/revision/latest?cb=20240806002253",
    border: "normal",
  },
  {
    id: 7,
    name: "Pirate Hunter",
    rarity: 0.065,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/b/b6/PirateHunter.jpg/revision/latest?cb=20240818233310",
    border: "normal",
  },
  {
    id: 8,
    name: "Wild Gon",
    rarity: 0.05,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/6/65/WildChild.jpg/revision/latest?cb=20240818233351",
    border: "normal",
  },
  {
    id: 9,
    name: "Substitute Reaper",
    rarity: 0.01,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/6/6b/SubstituteReaper.png/revision/latest?cb=20240818233437",
    border: "normal",
  },
  {
    id: 10,
    name: "Knucklehead Ninja",
    rarity: 0.009,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/9/9c/KnuckleheadNinja.png/revision/latest?cb=20240906141318",
    border: "normal",
  },
  {
    id: 11,
    name: "Rubber Boy",
    rarity: 0.007,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/5/5f/RubberBoy.png/revision/latest?cb=20240818233622",
    border: "normal",
  },
  {
    id: 12,
    name: "Nail Master",
    rarity: 0.0055,
    imgSrc:
      "https://static.wikia.nocookie.net/anime-card-battle/images/6/64/NailMaster.png/revision/latest?cb=20240818233709",
    border: "normal",
  },
];

const borders = [
  {
    name: "normal",
    rarity: 0.9,
  },
  {
    name: "gold",
    rarity: 0.01,
  },
  {
    name: "rainbow",
    rarity: 0.00001,
  },
  {
    name: "universal",
    rarity: 0.0000001,
  },
];

interface Card {
  id: number;
  name: string;
  rarity: number;
  imgSrc: string;
  border: string;
}

export const useRoll = () => {
  function makeRoll(luck: number) {
    const cardRolled = weightedRandom(cards, luck);
    const borderedCard = validateBorder(cardRolled);
    return borderedCard;
  }

  function validateBorder(card: Card) {
    const borderRolled = weightedRandom(borders);
    const borderedCard = { ...card };
    borderedCard.border = borderRolled.name;
    switch (borderedCard.border) {
      case "gold":
        borderedCard.id = borderedCard.id * 365 + 10000;
        break;
      case "rainbow":
        borderedCard.id = borderedCard.id * 365 + 20000;
        break;
      case "universal":
        borderedCard.id = borderedCard.id * 365 + 30000;
        break;
      default:
        break;
    }
    return borderedCard;
  }

  function weightedRandom(
    array: Required<{ rarity: number; name: string }>[],
    luck?: undefined | number,
  ) {
    const emptyArray: Array<{ name: string; rarity: number }> = [];
    const weightedArray = emptyArray.concat(
      ...array.map((item: { rarity: number; name: string }) => {
        let adjustedRarity: number;
        if (typeof luck === "number") {
          adjustedRarity = item.rarity * (1 + (1 - item.rarity) * luck!); // Aumenta a raridade com base na "luck"
        } else {
          adjustedRarity = item.rarity * (1 + (1 - item.rarity));
        }

        return Array(Math.ceil(adjustedRarity * 100)).fill(item);
      }),
    );
    const itemSelected =
      weightedArray[Math.floor(Math.random() * weightedArray.length)];
    return itemSelected;
  }

  return {
    makeRoll,
  };
};
