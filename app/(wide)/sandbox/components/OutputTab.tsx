import { Label } from "@/components/ui/label";

type Props = {
  output: string;
  title: string;
  height: number;
  isError?: boolean;
};

const OutputTab = ({ output, title, height, isError }: Props) => {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <Label className="font-semibold text-base">{title}</Label>
      <pre
        className={`${
          isError && "font-sans text-red-600 font-medium text-sm"
        } font-bold text-base font-sans p-2 border rounded-md min-h-[${height}px] max-h-[400px] overflow-auto`}
      >
        {output}
      </pre>
    </div>
  );
};

export default OutputTab;
