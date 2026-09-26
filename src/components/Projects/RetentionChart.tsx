import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface RetentionChartProps {
  data: {
    rfmSegments: Array<{ name: string; value: number; color: string }>;
    cohortMatrix: Array<{
      cohort: string;
      m0: number;
      m1: number | null;
      m2: number | null;
      m3: number | null;
      m4: number | null;
      m5: number | null;
    }>;
  };
}

export function RetentionChart({ data }: RetentionChartProps) {
  return (
    <div className="space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* RFM Segment Breakdown Donut */}
        <div className="sm:col-span-5 h-44 p-2 rounded-2xl bg-space-950/60 border border-white/5 flex flex-col items-center justify-center relative">
          <div className="text-[10px] font-mono text-slate-400 self-start px-2">
            RFM Segmentation
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={data.rfmSegments}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={54}
                paddingAngle={4}
                dataKey="value"
              >
                {data.rfmSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload || !payload.length) return null;
                  const item = payload[0].payload;
                  return (
                    <div className="glass-panel p-2 rounded-xl text-xs font-mono border border-white/10">
                      <span style={{ color: item.color }} className="font-bold">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-4">
            <span className="font-display font-black text-xs text-white">1.4K</span>
          </div>
        </div>

        {/* Monthly Cohort Retention Heatmap (M0–M5) */}
        <div className="sm:col-span-7 p-2 rounded-2xl bg-space-950/60 border border-white/5 space-y-1">
          <div className="flex items-center justify-between px-1 pb-1">
            <span className="text-[10px] font-mono text-slate-400">
              Retention Cohort Decay (M0–M5)
            </span>
            <span className="text-[9px] font-mono text-[#A78BFA] bg-[#A78BFA]/10 px-1.5 py-0.5 rounded">
              illustrative
            </span>
          </div>

          <div className="space-y-1 text-[9px] font-mono">
            {data.cohortMatrix.slice(0, 4).map((row, idx) => (
              <div key={idx} className="grid grid-cols-7 gap-1 items-center">
                <span className="text-slate-400 truncate text-[9px]">{row.cohort.split(' ')[0]}</span>
                {[row.m0, row.m1, row.m2, row.m3, row.m4, row.m5].map((val, mIdx) => (
                  <div
                    key={mIdx}
                    className="h-5 rounded flex items-center justify-center font-semibold text-[8px] transition-all"
                    style={{
                      backgroundColor: val
                        ? `rgba(56, 189, 248, ${Math.max(0.12, (val / 100) * 0.75)})`
                        : 'rgba(255, 255, 255, 0.02)',
                      color: val ? '#FFFFFF' : '#475569',
                    }}
                  >
                    {val ? `${val}%` : '-'}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
