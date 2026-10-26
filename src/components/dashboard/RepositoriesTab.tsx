import React from 'react';
import { GitBranch, CheckCircle2, Shield, Plus, RefreshCw, GitFork, ExternalLink } from 'lucide-react';
import { CONNECTED_REPOS } from '../../data/mockData';
import { useToast } from '../common/Toast';

export const RepositoriesTab: React.FC = () => {
  const { showToast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#211D35]">
            Connected Repositories
          </h2>
          <p className="text-xs text-[#716B86]">
            Repositories actively monitored by Pipeline Pilot and NVIDIA Nemotron agents
          </p>
        </div>

        <button
          onClick={() => {
            showToast('GitHub App integration sync requested', {
              type: 'info',
              description: 'Scanning organization repositories...',
            });
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect Repository</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONNECTED_REPOS.map((repo) => (
          <div
            key={repo.name}
            className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs hover:border-[#6C45F5]/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EDE7FF] flex items-center justify-center text-[#6C45F5] font-mono text-xs font-bold">
                    &lt;/&gt;
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#211D35] hover:text-[#6C45F5] transition-colors cursor-pointer">
                      {repo.name}
                    </h3>
                    <span className="text-[11px] text-[#716B86] font-mono">
                      branch: {repo.defaultBranch}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#20A878] bg-[#20A878]/10 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Webhook Active</span>
                </span>
              </div>

              <p className="text-xs text-[#716B86] leading-relaxed mb-4">
                {repo.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#E5DFF5] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-[#716B86] font-mono">
                <span>{repo.activeWorkflows} workflows</span>
                <span>·</span>
                <span className="text-[#20A878] font-bold">{repo.health} pass rate</span>
              </div>

              <button
                onClick={() => {
                  showToast(`Triggered health audit for ${repo.name}`);
                }}
                className="text-xs font-semibold text-[#6C45F5] hover:text-[#21164F] flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Audit</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
