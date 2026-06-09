/**
 * Get a human-readable label for a muscle group slug.
 */
export function formatMuscleGroupLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
