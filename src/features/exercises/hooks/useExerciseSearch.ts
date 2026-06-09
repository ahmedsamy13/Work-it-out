import { useDebounce } from "@/shared/hooks";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { exerciseApi } from "../api/exerciseApi";

/**
 * Search exercises with debounced input.
 */
export function useExerciseSearch(delay = 300) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, delay);

  const query = useQuery({
    queryKey: ["exercise-search", debouncedTerm],
    queryFn: () => exerciseApi.search(debouncedTerm),
    enabled: debouncedTerm.length >= 2,
  });

  return {
    searchTerm,
    setSearchTerm,
    results: query.data?.data ?? [],
    isSearching: query.isLoading,
  };
}
