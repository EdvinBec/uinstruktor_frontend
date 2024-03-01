import IDE from "@/components/IDE";
import { getExercise } from "@/lib/Services";
import { Exercise } from "@/types";
import React from "react";

const ExercisePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const exercise = (await getExercise(slug)) as Exercise;

  return (
    <div>
      <IDE
        type="exercise"
        title={exercise.title}
        ID={slug}
        description={exercise.description}
        taglines={exercise.tags}
        language="cpp"
      />
    </div>
  );
};

export default ExercisePage;
