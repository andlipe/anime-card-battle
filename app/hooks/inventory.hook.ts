import { useState } from "react";

interface Card {
  id: number;
  name: string;
  rarity: number;
  imgSrc: string;
  border: string;
}

interface InventoryCard extends Card {
  count: number;
}

export const useInventory = () => {
  const [inventory, setInventory] = useState<Array<InventoryCard>>([]);

  function addCardToInventory(card: Card) {
    const indexOfCardAlreadyOnInventory = inventory.findIndex(
      (inventoryCards) => card.id === inventoryCards.id,
    );
    if (indexOfCardAlreadyOnInventory !== -1) {
      setInventory(
        inventory.map((inventoryCard) =>
          inventoryCard.id === card.id
            ? {
                ...inventoryCard,
                count: (inventoryCard.count += 1),
              }
            : inventoryCard,
        ),
      );
      console.log(inventory);
      return;
    }
    setInventory([{ ...card, count: 1 }, ...inventory]);
    console.log(inventory);
  }

  return {
    addCardToInventory,
    inventory,
  };
};
