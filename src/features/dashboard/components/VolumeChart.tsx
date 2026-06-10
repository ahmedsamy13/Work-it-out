import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface VolumeChartProps {
  data: { name: string; volume: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/90 backdrop-blur-md border border-border rounded-xl p-3 shadow-lg">
        <p className="text-text-secondary text-xs mb-1 font-semibold uppercase">{label}</p>
        <p className="text-brand-DEFAULT font-bold text-lg">
          {payload[0].value.toLocaleString()} <span className="text-sm font-medium">kg</span>
        </p>
      </div>
    );
  }
  return null;
};

export function VolumeChart({ data }: VolumeChartProps) {
  return (
    <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold text-text-primary">Volume Over Time</h2>
        <p className="text-sm text-text-secondary">Total weight lifted per session</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-border)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke="var(--color-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--color-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--color-border)", strokeWidth: 1, strokeDasharray: "5 5" }} />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="var(--color-brand-DEFAULT)"
              strokeWidth={4}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "var(--color-surface)",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: "var(--color-brand-secondary)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
