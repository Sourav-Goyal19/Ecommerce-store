import { IndividualCategory } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/categories`;

const getCategory = async (id: string): Promise<IndividualCategory> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getCategory;
