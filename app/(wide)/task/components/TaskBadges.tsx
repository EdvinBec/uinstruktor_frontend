import { Badge } from "@/components/ui/badge";
import { Task } from "@/types";

type Props = {
  task: Task;
  className?: string;
};

const TaskBadges = ({ task, className }: Props) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      {task?.taglines.split(",").map((item, index) => {
        return (
          <Badge
            key={index}
            variant={"outline"}
            className="bg-[#2B44E7] border-none text-white tracking-wide font-medium"
          >
            {item}
          </Badge>
        );
      })}
    </div>
  );
};

export default TaskBadges;
