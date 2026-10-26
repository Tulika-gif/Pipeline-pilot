import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  GitBranch,
  Clock,
  PlayCircle,
  ExternalLink,
} from 'lucide-react';
import { WorkflowRun, ChartDataPoint } from '../../types/pipeline';

interface OverviewTabProps {
  runs: WorkflowRun[];
  chartData: ChartDataPoint[];
  onSelectRun: (runId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  runs,
  chartData,
  onSelectRun,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Runs */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs hover:border-[#6C45F5]/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#716B86]">Total Runs</span>
            <div className="w-8 h-8 rounded-xl bg-[#EDE7FF] flex items-center justify-center text-[#6C45F5]">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#211D35] font-mono tabular-nums">248</span>
            <span className="text-xs font-semibold text-[#20A878]">+12.4%</span>
          </div>
          <span className="text-[11px] text-[#716B86] mt-1 block">Past 7 days across 4 repositories</span>
        </div>

        {/* KPI 2: Success Rate */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs hover:border-[#6C45F5]/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#716B86]">Success Rate</span>
            <div className="w-8 h-8 rounded-xl bg-[#20A878]/10 flex items-center justify-center text-[#20A878]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#211D35] font-mono tabular-nums">91.5%</span>
            <span className="text-xs font-semibold text-[#20A878]">+3.2%</span>
          </div>
          <span className="text-[11px] text-[#716B86] mt-1 block">Target threshold &ge; 90.0%</span>
        </div>

        {/* KPI 3: Failed Runs */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs hover:border-[#E5485D]/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#716B86]">Failed Runs</span>
            <div className="w-8 h-8 rounded-xl bg-[#E5485D]/10 flex items-center justify-center text-[#E5485D]">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#211D35] font-mono tabular-nums">21</span>
            <span className="text-xs font-semibold text-[#E5485D]">-5 runs</span>
          </div>
          <span className="text-[11px] text-[#716B86] mt-1 block">8.5% failure incidence rate</span>
        </div>

        {/* KPI 4: Unresolved Issues */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs hover:border-[#6C45F5]/30 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-[#716B86]">Unresolved Issues</span>
            <div className="w-8 h-8 rounded-xl bg-[#6C45F5]/10 flex items-center justify-center text-[#6C45F5]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#6C45F5] font-mono tabular-nums">7</span>
            <span className="text-xs font-medium text-[#716B86]">Needs Review</span>
          </div>
          <span className="text-[11px] text-[#716B86] mt-1 block">NVIDIA Nemotron patches ready</span>
        </div>
      </div>

      {/* Grid: Success Rate Chart (Left 8 cols) & Compact AI Investigation Insights (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Violet Line / Area Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-[#E5DFF5] shadow-xs flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-[#211D35]">Pipeline Success Velocity</h3>
              <p className="text-xs text-[#716B86]">Rolling 7-day health trend across CI/CD jobs</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5 text-[#211D35]">
                <span className="w-3 h-3 rounded-full bg-[#6C45F5]" />
                <span>Success Rate (%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#716B86]">
                <span className="w-3 h-3 rounded-full bg-[#EDE7FF] border border-[#6C45F5]/30" />
                <span>Job Volume</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C45F5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6C45F5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5DFF5" />
                <XAxis
                  dataKey="day"
                  stroke="#716B86"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: '#E5DFF5' }}
                />
                <YAxis
                  domain={[80, 100]}
                  stroke="#716B86"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as ChartDataPoint;
                      return (
                        <div className="bg-[#21164F] text-white p-3 rounded-xl shadow-lg border border-[#6C45F5]/40 text-xs">
                          <p className="font-bold text-[#EDE7FF] mb-1">{data.day}</p>
                          <p className="font-mono text-emerald-300">
                            Success: <span className="font-bold">{data.successRate}%</span>
                          </p>
                          <p className="font-mono text-white/70">
                            Total Runs: {data.totalRuns} ({data.failedRuns} failed)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="successRate"
                  stroke="#6C45F5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#violetGradient)"
                  dot={{ r: 4, fill: '#6C45F5', strokeWidth: 2, stroke: '#FFFFFF' }}
                  activeDot={{ r: 6, fill: '#21164F', stroke: '#6C45F5', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compact AI Investigation Insights Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#21164F] to-[#160e36] text-white rounded-2xl p-5 sm:p-6 border border-[#6C45F5]/30 shadow-lg shadow-[#21164F]/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#6C45F5] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-wide uppercase text-[#EDE7FF]">
                  AI Investigation Insights
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/80">
                Nemotron-3
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] uppercase tracking-wider text-rose-300 font-bold block mb-1">
                  Active Priority Failure
                </span>
                <p className="text-sm font-semibold text-white">
                  Missing dependency step in &quot;Build and Test&quot;
                </p>
                <p className="text-xs text-white/70 mt-1 line-clamp-2">
                  ModuleNotFoundError: requests required by telemetry ingest worker.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-white/60">Nemotron Confidence</span>
                  <span className="font-mono font-bold text-emerald-400">98.4%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#6C45F5] h-full rounded-full" style={{ width: '98.4%' }} />
                </div>
                <span className="text-[11px] text-white/60 mt-1.5 block">
                  Automated pre-flight patch ready for one-click PR review
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectRun('run-8924');
              onNavigateTab('investigations');
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs text-[#21164F] bg-white hover:bg-[#EDE7FF] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Review Nemotron Fix</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#6C45F5]" />
          </button>
        </div>
      </div>

      {/* Recent Workflow Runs Table */}
      <div className="bg-white rounded-2xl border border-[#E5DFF5] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E5DFF5] flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#211D35]">Recent Workflow Runs</h3>
            <p className="text-xs text-[#716B86]">Latest automated builds and pipelines executed on pipeline-pilot</p>
          </div>
          <button
            onClick={() => onNavigateTab('workflows')}
            className="text-xs font-semibold text-[#6C45F5] hover:text-[#21164F] flex items-center gap-1 transition-colors"
          >
            <span>View All Runs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F5F2FF]/60 border-b border-[#E5DFF5] text-[#716B86] font-semibold">
                <th className="py-3 px-4">Workflow & Commit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Trigger</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DFF5]">
              {runs.map((run) => (
                <tr
                  key={run.id}
                  className="hover:bg-[#F5F2FF]/40 transition-colors group"
                >
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#211D35] group-hover:text-[#6C45F5] transition-colors">
                        {run.name}
                      </span>
                      <span className="text-[11px] text-[#716B86] font-mono flex items-center gap-1">
                        <span className="text-[#6C45F5]">{run.commit}</span>
                        <span>·</span>
                        <span className="truncate max-w-[200px]">{run.commitMessage}</span>
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {run.status === 'passed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#20A878]/10 text-[#20A878]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PASSED</span>
                      </span>
                    )}
                    {run.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#E5485D]/10 text-[#E5485D]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>FAILED</span>
                      </span>
                    )}
                    {run.status === 'in_progress' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#6C45F5]/10 text-[#6C45F5]">
                        <PlayCircle className="w-3.5 h-3.5 animate-spin" />
                        <span>IN PROGRESS</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-[#211D35] font-mono whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5 text-[#716B86]" />
                      <span>{run.branch}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#716B86] font-mono whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{run.duration}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#716B86] whitespace-nowrap capitalize">
                    {run.triggeredBy.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 text-[#716B86] whitespace-nowrap">
                    {run.timestamp}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    {run.status === 'failed' ? (
                      <button
                        onClick={() => {
                          onSelectRun(run.id);
                          onNavigateTab('investigations');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EDE7FF] hover:bg-[#6C45F5] text-[#6C45F5] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Investigate</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          onSelectRun(run.id);
                          onNavigateTab('workflows');
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[#716B86] hover:bg-[#F5F2FF] font-medium text-xs transition-colors cursor-pointer"
                      >
                        <span>Logs</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
