import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Clock,
  GitBranch,
  Sparkles,
  Terminal,
  Plus,
  RefreshCw,
  X,
} from 'lucide-react';
import { WorkflowRun } from '../../types/pipeline';
import { useToast } from '../common/Toast';

interface WorkflowRunsTabProps {
  runs: WorkflowRun[];
  onSelectRun: (runId: string) => void;
  onNavigateTab: (tab: string) => void;
  onTriggerRun: () => void;
}

export const WorkflowRunsTab: React.FC<WorkflowRunsTabProps> = ({
  runs,
  onSelectRun,
  onNavigateTab,
  onTriggerRun,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLogModal, setActiveLogModal] = useState<WorkflowRun | null>(null);
  const { showToast } = useToast();

  const filteredRuns = runs.filter((run) => {
    const matchesFilter =
      filterStatus === 'all' ? true : run.status === filterStatus;
    const matchesSearch =
      run.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.commit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.commitMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E5DFF5] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#716B86] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search runs, commits, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F5F2FF]/60 border border-[#E5DFF5] rounded-xl text-xs sm:text-sm text-[#211D35] placeholder:text-[#716B86]/70 focus:outline-hidden focus:border-[#6C45F5] transition-colors"
          />
        </div>

        {/* Filter Segmented Buttons & Action */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center p-1 bg-[#F5F2FF] rounded-xl border border-[#E5DFF5]">
            {(['all', 'failed', 'passed', 'in_progress'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-white text-[#6C45F5] shadow-xs'
                    : 'text-[#716B86] hover:text-[#211D35]'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onTriggerRun();
              showToast('Dispatched simulated workflow run on main branch', {
                type: 'info',
                description: 'Runner container provisioned in 320ms.',
              });
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] hover:shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Dispatch Run</span>
          </button>
        </div>
      </div>

      {/* Runs List */}
      <div className="bg-white rounded-2xl border border-[#E5DFF5] shadow-xs overflow-hidden">
        <div className="divide-y divide-[#E5DFF5]">
          {filteredRuns.length === 0 ? (
            <div className="p-12 text-center text-[#716B86]">
              <AlertTriangle className="w-8 h-8 text-[#6C45F5] mx-auto mb-2 opacity-50" />
              <p className="font-semibold text-sm">No workflow runs found</p>
              <p className="text-xs mt-1">Try adjusting your filters or dispatching a new run.</p>
            </div>
          ) : (
            filteredRuns.map((run) => (
              <div
                key={run.id}
                className="p-4 sm:p-5 hover:bg-[#F5F2FF]/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  {/* Status Indicator Icon */}
                  <div className="mt-0.5 sm:mt-0">
                    {run.status === 'passed' && (
                      <div className="w-9 h-9 rounded-xl bg-[#20A878]/10 text-[#20A878] flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    {run.status === 'failed' && (
                      <div className="w-9 h-9 rounded-xl bg-[#E5485D]/10 text-[#E5485D] flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    )}
                    {run.status === 'in_progress' && (
                      <div className="w-9 h-9 rounded-xl bg-[#6C45F5]/10 text-[#6C45F5] flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 animate-spin" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#211D35]">{run.name}</span>
                      <span className="text-xs text-[#716B86]">#{run.id}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          run.status === 'passed'
                            ? 'bg-[#20A878]/10 text-[#20A878]'
                            : run.status === 'failed'
                            ? 'bg-[#E5485D]/10 text-[#E5485D]'
                            : 'bg-[#6C45F5]/10 text-[#6C45F5]'
                        }`}
                      >
                        {run.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-[#716B86] flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-mono text-[#6C45F5]">{run.commit}</span>
                      <span>·</span>
                      <span className="text-[#211D35] font-medium">{run.commitMessage}</span>
                      <span>·</span>
                      <span>by {run.author}</span>
                    </p>

                    {run.errorSummary && (
                      <div className="mt-2 text-xs font-mono text-[#E5485D] bg-[#E5485D]/5 border border-[#E5485D]/20 px-2.5 py-1 rounded-md inline-block">
                        {run.errorSummary}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Metadata & Action Buttons */}
                <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#E5DFF5]">
                  <div className="flex items-center gap-3 text-xs text-[#716B86] font-mono">
                    <span className="flex items-center gap-1">
                      <GitBranch className="w-3.5 h-3.5" />
                      {run.branch}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {run.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveLogModal(run)}
                      className="px-3 py-1.5 rounded-lg border border-[#E5DFF5] bg-white hover:bg-[#F5F2FF] text-[#211D35] font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Terminal className="w-3.5 h-3.5 text-[#716B86]" />
                      <span>Logs</span>
                    </button>

                    {run.status === 'failed' && (
                      <button
                        onClick={() => {
                          onSelectRun(run.id);
                          onNavigateTab('investigations');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#6C45F5] to-[#21164F] hover:shadow-sm text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Fix</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Terminal Logs Modal View */}
      {activeLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#21164F] text-white rounded-2xl border border-[#6C45F5]/40 shadow-2xl max-w-3xl w-full max-h-[80vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-[#EDE7FF]" />
                <span className="text-sm font-bold font-mono">
                  {activeLogModal.name} — #{activeLogModal.id}
                </span>
                <span className="text-xs text-white/60 font-mono">({activeLogModal.branch})</span>
              </div>
              <button
                onClick={() => setActiveLogModal(null)}
                className="text-white/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-5 overflow-y-auto font-mono text-xs space-y-1.5 leading-relaxed bg-[#170e38]">
              <div className="text-white/40">2026-10-26T04:48:00.000Z [INFO] Initializing runner pod container</div>
              <div className="text-white/40">2026-10-26T04:48:04.120Z [INFO] Checking out commit {activeLogModal.commit}</div>
              <div className="text-white/70">
                <span className="text-emerald-400">$</span> python --version &amp;&amp; pip --version
              </div>
              <div className="text-white/50">Python 3.11.8 (main, Feb 2026) / pip 24.0</div>
              <div className="text-white/70">
                <span className="text-emerald-400">$</span> pytest tests/unit -v --tb=short
              </div>
              {activeLogModal.status === 'failed' ? (
                <>
                  <div className="text-white/50">collecting ... 42 test cases discovered</div>
                  <div className="text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-800/40 my-2">
                    {activeLogModal.errorSummary || "ModuleNotFoundError: No module named 'requests'"}
                  </div>
                  <div className="text-rose-400 font-bold">##[error]Process completed with exit code 1.</div>
                </>
              ) : (
                <>
                  <div className="text-emerald-400">42 passed, 0 failed in 1.48s</div>
                  <div className="text-emerald-300 font-bold">##[success]Job completed successfully in 2m 34s</div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between bg-[#21164F]">
              <span className="text-xs text-white/60 font-mono">Exit Code: {activeLogModal.status === 'failed' ? '1' : '0'}</span>
              <div className="flex items-center gap-2">
                {activeLogModal.status === 'failed' && (
                  <button
                    onClick={() => {
                      onSelectRun(activeLogModal.id);
                      setActiveLogModal(null);
                      onNavigateTab('investigations');
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6C45F5] to-purple-600 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Launch AI Investigation</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveLogModal(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
