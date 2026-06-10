import { useMemo, useState } from "react";
import { Tabs, Modal } from "@/shared/ui";
import { useExercises } from "@/features/exercises/hooks/useExercises";
import { ExerciseGrid } from "@/features/exercises/components/ExerciseGrid";
import { MUSCLE_GROUPS } from "@/shared/constants";
import { Search, ChevronDown } from "lucide-react";

export function ExerciseListPage() {
  const { data: exercises = [], isLoading } = useExercises();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesMuscle =
        activeFilter === "all" || exercise.target_muscle === activeFilter;
      const matchesSearch =
        !searchTerm ||
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesMuscle && matchesSearch;
    });
  }, [exercises, activeFilter, searchTerm]);

  const gridContent = (
    <ExerciseGrid exercises={filteredExercises} isLoading={isLoading} />
  );

  const tabs = [
    { id: "all", label: "All Exercises", content: gridContent },
    ...MUSCLE_GROUPS.map((muscle) => ({
      id: muscle,
      label: muscle,
      content: gridContent,
      hideOnMobile: true,
    })),
  ];

  return (
    <div className="space-y-6 bg-bg-subtle p-4 rounded-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Exercise Library 
          </h1>
          <p className="text-text-secondary mt-1 text-[13px]">
            Browse and discover exercises for every muscle group.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search exercises..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 pl-9 text-base text-text-primary placeholder:text-text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <Search size={16} />
          </span>
        </div>
      </div>

      <Tabs
        rightSlot={
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden px-3 mb-1 py-1 bg-brand-DEFAULT text-white rounded-lg text-[13px] font-medium cursor-pointer hover:bg-brand-hover transition-colors whitespace-nowrap flex items-center gap-2"
          >
            <span>{activeFilter === "all" ? "Filters" : activeFilter}</span>
            <ChevronDown size={14} />
          </button>
        }
        tabs={tabs}
        defaultTab="all"
        onTabChange={(tabId) => setActiveFilter(tabId)}
      />

      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} title="Filter by Muscle">
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button
            onClick={() => { setActiveFilter("all"); setIsFilterOpen(false); }}
            className={`p-3 rounded-xl border text-sm font-bold transition-all ${
              activeFilter === "all"
                ? "bg-brand-DEFAULT text-white border-brand-DEFAULT shadow-md"
                : "bg-surface border-border text-text-secondary hover:border-brand-muted"
            }`}
          >
            All Exercises
          </button>
          {MUSCLE_GROUPS.map((muscle) => (
            <button
              key={muscle}
              onClick={() => { setActiveFilter(muscle); setIsFilterOpen(false); }}
              className={`p-3 rounded-xl border text-sm font-bold transition-all ${
                activeFilter === muscle
                  ? "bg-brand-DEFAULT text-white border-brand-DEFAULT shadow-md"
                  : "bg-surface border-border text-text-secondary hover:border-brand-muted"
              }`}
            >
              {muscle}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
