"use client";
import { useEffect, useState } from "react";
import { getTask } from "@/lib/Services";
import { Task } from "@/types";
const TaskPage = ({
  params,
}: {
  params: { taskID: string; chapterID: string };
}) => {
  const [task, setTask] = useState<Task>({} as Task);
  const [code, setCode] = useState<string>("");

  
  useEffect(() => {
    getTask(params.taskID).then((data) => {
      setTask(data);
    });
  }, [params.taskID]);

  console.log(task);

  return <div>{task.title}</div>;
};

export default TaskPage;
