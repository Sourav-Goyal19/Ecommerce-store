import { BillboardData } from "@/types";

interface BillboardProps {
  data: BillboardData;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl aspect-square md:aspect-[2.4/1] bg-center overflow-hidden bg-cover"
        style={{ backgroundImage: `url(${data.imageUrl})` }}
      />
    </div>
  );
};

export default Billboard;
