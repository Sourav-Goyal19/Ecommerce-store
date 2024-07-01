import { Cart } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/get`;

const getCart = async (id: string): Promise<Cart> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getCart;
