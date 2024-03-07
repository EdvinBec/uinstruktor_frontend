import RunCodeButton from "./RunCodeButton";
import OutputTab from "./OutputTab";
import CustomButton from "@/components/CustomButton";
import { Play } from "lucide-react";

type Props = {
  isLoading: boolean;
  error: string;
  output: string;
  uploadCodeToServer: () => void;
};

const OutputWindow = ({
  isLoading,
  error,
  output,
  uploadCodeToServer,
}: Props) => {
  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-4xl">Izpis</h1>
        <CustomButton
          isLoading={isLoading}
          onClick={uploadCodeToServer}
          label="Zaženi"
          icon={Play}
        />
      </div>
      <div className="mt-6">
        <OutputTab title="Izhodno okno: " height={300} output={output} />
        <OutputTab
          title="Napake "
          height={200}
          output={error}
          isError={error ? true : false}
        />
      </div>
    </div>
  );
};

export default OutputWindow;
