import { IndiviualProduct } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/products`;

const getProduct = async (id: string): Promise<IndiviualProduct> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getProduct;
