import { useParams } from "react-router-dom";

export function ExerciseDetailPage() {
  const { exerciseId } = useParams<{ exerciseId: string }>();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Exercise Detail</h1>
      <p className="text-text-secondary">Viewing exercise: {exerciseId}</p>
    </div>
  );
}
