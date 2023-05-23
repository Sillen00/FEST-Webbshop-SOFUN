export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageURL: string;
}

/**
 * function that returns a unique Id, both numbers and letters
 */
export const generateId = () => {
  const newId = Math.floor(1 + Math.random() * 0x1000)
    .toString(16)
    .substring(1);
  return newId;
};


