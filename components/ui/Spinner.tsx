import { Loader } from "lucide-react";

const Spinner = ({ size }: { size: number }) => {
  return (
    <div className="fixed w-full h-dull top-0 left-0 right-0 bottom-0 z-2 bg-black bg-opacity-50">
      <div className="absolute top-1/2 left-1/2">
        <Loader className="animate-spin" size={size} />
      </div>
    </div>
  );
};

export default Spinner;
