import { Task } from "@/types";
import TaskBadges from "./TaskBadges";

type Props = {
  task: Task;
};

const TaskDescription = ({ task }: Props) => {
  return (
    <>
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <TaskBadges task={task} className="mt-4" />
      <div className="mt-6 mr-2 pr-6">
        <p
          dangerouslySetInnerHTML={{
            __html: task?.infoPage?.description,
          }}
        />
      </div>
    </>
  );
};

export default TaskDescription;
