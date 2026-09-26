import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';

interface VyaptiqChartProps {
  data: {
    anomalies: Array<{
      batch: string;
      zScore: number;
      margin: number;
      revenue: number;
      isAnomaly: boolean;
    }>;
    kpis: Array<{ metric: string; value: string }>;
  };
}

export function VyaptiqChart({ data }: VyaptiqChartProps) {
  return (
    <div className="space-y-4 w-full">
      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-2">
        {data.kpis.map((k, i) => (
          <div key={i} className="p-2 rounded-xl bg-[#0B1220] border border-[#263449] text-center">
            <div className="font-mono text-[9px] text-slate-400 uppercase">{k.metric}</div>
            <div className="font-display font-bold text-xs sm:text-sm text-[#34D399]">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Z-Score Anomaly Scatter Telemetry */}
      <div className="h-44 sm:h-52 w-full p-2 rounded-2xl bg-[#0B1220] border border-[#263449]">
        <div className="flex items-center justify-between px-2 pb-1">
          <span className="font-mono text-[10px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            Z-Score Anomaly Detection (|z| &gt; 2.5)
          </span>
          <span className="font-mono text-[9px] text-[#A78BFA] bg-[#A78BFA]/10 px-2 py-0.5 rounded">
            illustrative telemetry
          </span>
        </div>

        <ResponsiveContainer width="100%" height="90%">
          <ScatterChart margin={{ top: 10, right: 15, bottom: 5, left: -20 }}>
            <XAxis
              dataKey="batch"
              type="category"
              tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: '#263449' }}
              tickLine={false}
            />
            <YAxis
              dataKey="zScore"
              type="number"
              domain={[-3.5, 3.5]}
              tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: '#263449' }}
              tickLine={false}
            />
            <ZAxis dataKey="revenue" range={[40, 140]} />
            <ReferenceLine y={2.5} stroke="#EF4444" strokeDasharray="3 3" />
            <ReferenceLine y={-2.5} stroke="#EF4444" strokeDasharray="3 3" />
            <ReferenceLine y={0} stroke="#334155" />
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;
                const pt = payload[0].payload;
                return (
                  <div className="bg-[#0B1220] p-2.5 rounded-xl border border-[#263449] text-xs font-mono shadow-2xl">
                    <p className="text-white font-bold">{pt.batch}</p>
                    <p className="text-[#38BDF8]">Z-Score: {pt.zScore.toFixed(2)}</p>
                    <p className="text-slate-300">Margin: {pt.margin}%</p>
                    {pt.isAnomaly && (
                      <p className="text-rose-400 font-bold mt-1 text-[10px]">ALERT: Stat Anomaly</p>
                    )}
                  </div>
                );
              }}
            />
            <Scatter data={data.anomalies}>
              {data.anomalies.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isAnomaly ? '#EF4444' : '#38BDF8'}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
