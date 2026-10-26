import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { Clock, TrendingDown, Zap, ShieldAlert, Award } from 'lucide-react';

const CATEGORY_DATA = [
  { category: 'Missing Deps', count: 18, color: '#6C45F5' },
  { category: 'Docker/Layers', count: 11, color: '#8862F7' },
  { category: 'Timeouts', count: 8, color: '#A585F9' },
  { category: 'Test Asserts', count: 5, color: '#C2ABFB' },
  { category: 'Config/Lint', count: 3, color: '#E5DFF5' },
];

export const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#716B86]">Mean Time to Resolution (MTTR)</span>
            <div className="w-8 h-8 rounded-xl bg-[#20A878]/10 text-[#20A878] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#211D35] font-mono tabular-nums">4.2 min</span>
            <span className="text-xs font-semibold text-[#20A878]">-91% vs manual</span>
          </div>
          <span className="text-[11px] text-[#716B86] mt-1 block">Previous baseline was 48 minutes per break</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#716B86]">Automated Root Cause Accuracy</span>
            <div className="w-8 h-8 rounded-xl bg-[#EDE7FF] text-[#6C45F5] flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#6C45F5] font-mono tabular-nums">98.4%</span>
            <span className="text-xs font-semibold text-[#20A878]">Top Tier</span>
          </div>
          <span className="text-[11px] text-[#716B86] mt-1 block">Validated by sandbox pre-flight checks</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#716B86]">Developer Hours Reclaimed</span>
            <div className="w-8 h-8 rounded-xl bg-[#21164F] text-[#EDE7FF] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#211D35] font-mono tabular-nums">142 hrs</span>
            <span className="text-xs font-semibold text-[#6C45F5]">This month</span>
          </div>
          <span className="text-[11px] text-[#716B86] mt-1 block">Across engineering squad of 18 developers</span>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Failure Category Frequency Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DFF5] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#211D35]">Failure Distribution by Signature</h3>
              <p className="text-xs text-[#716B86]">Top CI/CD failure root causes cataloged by Nemotron</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5DFF5" />
                <XAxis dataKey="category" stroke="#716B86" fontSize={11} tickLine={false} />
                <YAxis stroke="#716B86" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#21164F] text-white p-2.5 rounded-xl text-xs border border-[#6C45F5]/40 font-mono">
                          <p className="font-bold text-[#EDE7FF]">{data.category}</p>
                          <p className="text-emerald-300">{data.count} occurrences</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#6C45F5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Resolution Velocity Comparison */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DFF5] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#211D35] mb-1">
              Workflow Healing Efficiency
            </h3>
            <p className="text-xs text-[#716B86] mb-5">
              Comparison between traditional manual debugging and Pipeline Pilot autonomous assistance.
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5 font-medium">
                  <span className="text-[#716B86]">Manual Log Inspection</span>
                  <span className="font-mono text-[#E5485D] font-bold">~48 minutes</span>
                </div>
                <div className="w-full h-2 bg-[#F5F2FF] rounded-full overflow-hidden">
                  <div className="bg-[#E5485D]/60 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 font-medium">
                  <span className="text-[#211D35] font-semibold">Pipeline Pilot + Nemotron</span>
                  <span className="font-mono text-[#20A878] font-bold">4.2 minutes</span>
                </div>
                <div className="w-full h-2 bg-[#F5F2FF] rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#6C45F5] to-[#20A878] h-full rounded-full" style={{ width: '9%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[#EDE7FF]/50 border border-[#6C45F5]/20 text-xs text-[#21164F]">
            <span className="font-bold block mb-1">Autonomous Advantage:</span>
            <span>Developers review and approve pre-flight tested patches without reading through thousands of lines of runner stderr logs.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
