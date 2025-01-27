import { Label } from "@/components/ui/label";

type Props = {
  output: string;
  title: string;
  height: number;
  isError?: boolean;
  className?: string;
};

const OutputTab = ({ output, title, height, isError, className }: Props) => {
  return (
    <div className={`mt-6 flex flex-col gap-2`}>
      <Label className="font-semibold text-base">{title}</Label>
      <pre
        className={`${
          isError && "font-sans text-red-600 font-medium text-sm"
        } font-bold text-base whitespace-pre-wrap font-sans p-2 border rounded-md min-h-[${height}px] max-h-[400px] overflow-auto ${className}`}
      >
        {output}
      </pre>
    </div>
  );
};

export default OutputTab;
