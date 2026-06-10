import { supabase } from "@/shared/lib/supabase";
import type { Workout, WorkoutSet } from "../types/workout.types";

export const workoutApi = {
  // Save a completed workout and its sets
  async saveWorkout(
    userId: string,
    startedAt: string,
    endedAt: string,
    exercises: {
      exercise_id: string;
      sets: {
        set_number: number;
        weight_kg: number | null;
        reps: number | null;
        is_completed: boolean;
      }[];
    }[]
  ): Promise<{ workout: Workout; sets: WorkoutSet[] }> {
    // 1. Insert Workout
    const { data: workout, error: workoutError } = await supabase
      .from("workouts")
      .insert({
        user_id: userId,
        started_at: startedAt,
        ended_at: endedAt,
      })
      .select("*")
      .single();

    if (workoutError) throw new Error(workoutError.message);

    // 2. Prepare Sets for bulk insert
    const setsToInsert = [];
    for (const ex of exercises) {
      for (const set of ex.sets) {
        // Save if completed OR if it has any data
        const hasData = set.weight_kg !== null || set.reps !== null;
        if (!set.is_completed && !hasData) continue;

        setsToInsert.push({
          workout_id: workout.id,
          exercise_id: ex.exercise_id,
          set_number: set.set_number,
          weight_kg: set.weight_kg,
          reps: set.reps,
          is_completed: set.is_completed,
        });
      }
    }

    // 3. Bulk Insert Sets
    let insertedSets: WorkoutSet[] = [];
    if (setsToInsert.length > 0) {
      const { data: sets, error: setsError } = await supabase
        .from("workout_sets")
        .insert(setsToInsert)
        .select("*");

      if (setsError) {
        // Rollback workout if sets fail
        await supabase.from("workouts").delete().eq("id", workout.id);
        throw new Error(setsError.message);
      }
      insertedSets = sets;
    }

    return { workout, sets: insertedSets };
  },

  // Get user's workout history with nested sets and exercises
  async getWorkouts(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from("workouts")
      .select(`
        *,
        workout_sets (
          *,
          exercises (*)
        )
      `)
      .eq("user_id", userId)
      .order("started_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  },
};
