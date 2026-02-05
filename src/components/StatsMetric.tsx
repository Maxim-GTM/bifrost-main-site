'use client';

interface StatsMetricProps {
  label: string;
  value: string;
  unit?: string;
}

export function StatsMetric({ label, value, unit }: StatsMetricProps) {
  return (
    <div className="text-center">
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-2xl font-bold text-gray-900">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-gray-600">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
