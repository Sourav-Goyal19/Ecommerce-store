import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${id}`);

  return res.json();
};

export default getBillboard;
