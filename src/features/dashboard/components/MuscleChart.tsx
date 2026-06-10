import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface MuscleChartProps {
  data: { name: string; value: number }[];
}

const COLORS = [
  "#4f46e5",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#10b981",
  "#06b6d4",
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/90 backdrop-blur-md border border-border rounded-xl p-3 shadow-lg flex items-center gap-3">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: payload[0].payload.fill }} 
        />
        <div>
          <p className="text-text-primary font-bold">{payload[0].name}</p>
          <p className="text-text-secondary text-xs">{payload[0].value} Sets</p>
        </div>
      </div>
    );
  }
  return null;
};

export function MuscleChart({ data }: MuscleChartProps) {
  // Defensive programming: don't crash if data is empty
  const primaryFocus = data.length > 0 ? data.reduce((prev, current) => (prev.value > current.value ? prev : current)) : null;

  return (
    <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-6 flex flex-col">
      <div>
        <h2 className="text-xl font-bold text-text-primary">
          Muscle Distribution
        </h2>
        <p className="text-sm text-text-secondary">
          Sets performed per muscle group
        </p>
      </div>
      <div className="flex-1 min-h-[256px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center flex-col">
          <span className="text-text-muted text-xs font-bold uppercase tracking-widest">
            Focus
          </span>
          <span className="text-text-primary font-bold text-lg">
            {primaryFocus?.name || "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
