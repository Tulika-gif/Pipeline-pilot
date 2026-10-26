import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlaySquare,
  Sparkles,
  GitPullRequest,
  FolderGit2,
  BarChart3,
  Settings,
  ChevronDown,
  RefreshCw,
  Search,
  Maximize2,
  Minimize2,
  Filter,
} from 'lucide-react';
import { INITIAL_RUNS, MOCK_INVESTIGATIONS, SEVEN_DAY_METRICS } from '../../data/mockData';
import { WorkflowRun } from '../../types/pipeline';
import { OverviewTab } from './OverviewTab';
import { WorkflowRunsTab } from './WorkflowRunsTab';
import { InvestigationsTab } from './InvestigationsTab';
import { FixReviewTab } from './FixReviewTab';
import { RepositoriesTab } from './RepositoriesTab';
import { AnalyticsTab } from './AnalyticsTab';
import { SettingsTab } from './SettingsTab';
import { useToast } from '../common/Toast';

interface DashboardWorkspaceProps {
  isFullPage?: boolean;
  onToggleFullPage?: () => void;
}

export const DashboardWorkspace: React.FC<DashboardWorkspaceProps> = ({
  isFullPage = false,
  onToggleFullPage,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedRepo, setSelectedRepo] = useState<string>('pipeline-pilot');
  const [dateRange, setDateRange] = useState<string>('Last 7 days');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [runs, setRuns] = useState<WorkflowRun[]>(INITIAL_RUNS);
  const [selectedRunId, setSelectedRunId] = useState<string>('run-8924');

  const { showToast } = useToast();

  const activeInvestigation =
    MOCK_INVESTIGATIONS['inv-101'] || MOCK_INVESTIGATIONS[Object.keys(MOCK_INVESTIGATIONS)[0]];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Workspace telemetry refreshed', {
        type: 'info',
        description: 'Synced with GitHub runner webhooks (6 workflows updated).',
      });
    }, 700);
  };

  const handleTriggerRun = () => {
    const newRun: WorkflowRun = {
      id: `run-${Math.floor(8925 + Math.random() * 50)}`,
      name: 'Build and Test',
      repo: selectedRepo,
      branch: 'main',
      commit: Math.random().toString(16).substring(2, 9),
      commitMessage: 'feat(core): update pipeline pilot agent dispatch logic',
      author: 'elena-dev',
      status: 'in_progress',
      duration: '0m 18s',
      timestamp: 'Just now',
      triggeredBy: 'push',
    };
    setRuns([newRun, ...runs]);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'workflows', label: 'Workflow Runs', icon: PlaySquare, badge: runs.length },
    { id: 'investigations', label: 'AI Investigations', icon: Sparkles, highlight: true },
    { id: 'fixes', label: 'Fix Review', icon: GitPullRequest, badge: '1' },
    { id: 'repositories', label: 'Repositories', icon: FolderGit2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-[#E5DFF5] shadow-xl shadow-[#21164F]/5 overflow-hidden flex flex-col ${
        isFullPage ? 'min-h-[calc(100vh-5rem)]' : 'min-h-[720px]'
      }`}
    >
      {/* Top Workspace Header */}
      <div className="bg-[#FAF8FF] border-b border-[#E5DFF5] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Repo selector, Demo badge, Date filter */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Demo Workspace Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EDE7FF] border border-[#6C45F5]/20 text-[11px] font-bold text-[#6C45F5] select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C45F5]" />
            <span>Demo Workspace</span>
          </div>

          {/* Repo Selector */}
          <div className="relative">
            <select
              value={selectedRepo}
              onChange={(e) => {
                setSelectedRepo(e.target.value);
                showToast(`Switched repository context to ${e.target.value}`);
              }}
              className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-[#E5DFF5] rounded-xl text-xs font-semibold text-[#211D35] hover:border-[#6C45F5] focus:outline-hidden cursor-pointer shadow-xs"
            >
              <option value="pipeline-pilot">pipeline-pilot</option>
              <option value="pilot-agent-runner">pilot-agent-runner</option>
              <option value="infra-kubernetes-charts">infra-kubernetes-charts</option>
              <option value="web-console-frontend">web-console-frontend</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#716B86] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Filter */}
          <div className="relative hidden sm:block">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-1.5 bg-white border border-[#E5DFF5] rounded-xl text-xs font-medium text-[#716B86] hover:border-[#6C45F5] focus:outline-hidden cursor-pointer shadow-xs"
            >
              <option value="Last 24 hours">Last 24 hours</option>
              <option value="Last 7 days">Last 7 days</option>
              <option value="Last 30 days">Last 30 days</option>
              <option value="Last 90 days">Last 90 days</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#716B86] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Right: Search, Refresh, Fullscreen Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-[#716B86] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search workspace..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-white border border-[#E5DFF5] rounded-xl text-xs text-[#211D35] placeholder:text-[#716B86]/60 w-44 focus:w-56 focus:outline-hidden focus:border-[#6C45F5] transition-all"
            />
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            title="Refresh workspace telemetry"
            className="p-2 rounded-xl bg-white border border-[#E5DFF5] text-[#716B86] hover:text-[#6C45F5] hover:border-[#6C45F5] shadow-xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#6C45F5]' : ''}`} />
          </button>

          {/* Full Page View Toggle (if handler provided) */}
          {onToggleFullPage && (
            <button
              onClick={onToggleFullPage}
              title={isFullPage ? 'Exit fullscreen view' : 'Expand full workspace view'}
              className="p-2 rounded-xl bg-white border border-[#E5DFF5] text-[#716B86] hover:text-[#6C45F5] hover:border-[#6C45F5] shadow-xs transition-colors cursor-pointer"
            >
              {isFullPage ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Body: Sidebar + Viewport */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-60 lg:w-64 bg-[#FAF8FF] border-r border-[#E5DFF5] p-3 sm:p-4 flex md:flex-col justify-between shrink-0 overflow-x-auto md:overflow-x-visible">
          <nav className="flex md:flex-col gap-1 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-white text-[#6C45F5] shadow-sm border border-[#E5DFF5]'
                      : 'text-[#716B86] hover:bg-[#EDE7FF]/40 hover:text-[#211D35]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? 'text-[#6C45F5]'
                          : item.highlight
                          ? 'text-[#6C45F5]'
                          : 'text-[#716B86]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-[#EDE7FF] text-[#6C45F5]'
                          : 'bg-[#E5DFF5]/60 text-[#716B86]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Model Status Card in Sidebar bottom */}
          <div className="hidden md:block mt-6 p-3.5 rounded-xl bg-white border border-[#E5DFF5] shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#20A878]" />
              <span className="text-[11px] font-bold text-[#211D35]">NVIDIA Nemotron Active</span>
            </div>
            <p className="text-[10px] text-[#716B86] leading-relaxed">
              Monitoring telemetry on {selectedRepo} with AST synthesis.
            </p>
          </div>
        </aside>

        {/* Viewport Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#F5F2FF]/40 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              runs={runs}
              chartData={SEVEN_DAY_METRICS}
              onSelectRun={(runId) => {
                setSelectedRunId(runId);
                setActiveTab('investigations');
              }}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'workflows' && (
            <WorkflowRunsTab
              runs={runs}
              onSelectRun={(runId) => {
                setSelectedRunId(runId);
              }}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onTriggerRun={handleTriggerRun}
            />
          )}

          {activeTab === 'investigations' && (
            <InvestigationsTab
              investigation={activeInvestigation}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onReanalyze={() => {
                // simulated re-analysis
              }}
            />
          )}

          {activeTab === 'fixes' && (
            <FixReviewTab
              investigation={activeInvestigation}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'repositories' && <RepositoriesTab />}

          {activeTab === 'analytics' && <AnalyticsTab />}

          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
};
