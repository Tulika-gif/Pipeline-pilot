import React, { useState } from 'react';
import { GitPullRequest, CheckCircle2, ShieldCheck, Play, ArrowRight, Check } from 'lucide-react';
import { useToast } from '../common/Toast';

export const FixReviewSection: React.FC<{ onGoToWorkspace: () => void }> = ({ onGoToWorkspace }) => {
  const [status, setStatus] = useState<'pending' | 'validating' | 'approved'>('pending');
  const { showToast } = useToast();

  const handleApprove = () => {
    setStatus('approved');
    showToast('Demo fix approved! Pull Request #412 created on branch main', {
      type: 'success',
      description: 'Pre-flight verified: container build exited with code 0.',
    });
  };

  const handleDryRun = () => {
    setStatus('validating');
    showToast('Triggering ephemeral sandbox dry-run verification...');
    setTimeout(() => {
      setStatus('pending');
      showToast('Sandbox verification passed: 42 tests passed, 0 failures.', {
        type: 'success',
      });
    }, 1200);
  };

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-[#6C45F5] uppercase bg-[#EDE7FF] px-3 py-1 rounded-full border border-[#E5DFF5] inline-block mb-3">
            Pre-Flight Code Review
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#211D35] tracking-tight mb-4">
            Review and validate before you apply.
          </h2>
          <p className="text-base sm:text-lg text-[#716B86] leading-relaxed">
            Never accept blind AI edits. Inspect exact line additions and deletions in high-contrast YAML diffs, verified by container dry-runs.
          </p>
        </div>

        {/* Diff Review Card Container */}
        <div className="bg-[#FAF8FF] rounded-3xl border border-[#E5DFF5] shadow-xl shadow-[#21164F]/5 p-5 sm:p-8">
          {/* Top Diff Header */}
          <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-[#E5DFF5] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-[#211D35] font-mono">
                  .github/workflows/build-test.yml
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#EDE7FF] text-[#6C45F5] font-semibold">
                  Patch #inv-101
                </span>
              </div>
              <p className="text-xs text-[#716B86]">
                Target: add dependencies install fallback &amp; pytest requirements verification
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDryRun}
                disabled={status === 'validating'}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#6C45F5]/30 bg-white hover:bg-[#EDE7FF] text-[#6C45F5] font-semibold text-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 ${status === 'validating' ? 'animate-spin' : ''}`} />
                <span>{status === 'validating' ? 'Running Tests...' : 'Run Dry-Run'}</span>
              </button>

              {status !== 'approved' ? (
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  <GitPullRequest className="w-3.5 h-3.5" />
                  <span>Approve &amp; Open PR</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#20A878] bg-[#20A878]/10 border border-[#20A878]/30">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PR #412 Created</span>
                </div>
              )}
            </div>
          </div>

          {/* Side-by-Side YAML Diff */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Original Workflow */}
            <div className="bg-white rounded-2xl border border-[#E5DFF5] overflow-hidden shadow-xs">
              <div className="p-3 bg-[#F5F2FF] border-b border-[#E5DFF5] flex items-center justify-between">
                <span className="text-xs font-bold text-[#716B86] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5485D]" />
                  Original Workflow
                </span>
                <span className="text-[11px] font-mono text-[#716B86]">Failing state</span>
              </div>
              <div className="p-4 font-mono text-xs leading-relaxed text-[#211D35] overflow-x-auto">
                <div className="text-[#716B86]">28  │       - name: Install dependencies</div>
                <div className="text-[#716B86]">29  │         run: |</div>
                <div className="text-[#716B86]">30  │           python -m pip install --upgrade pip</div>
                <div className="bg-[#E5485D]/10 text-[#E5485D] px-2 py-1 rounded my-1 font-semibold flex items-center justify-between">
                  <span>31 -│           pip install pytest pytest-cov pydantic</span>
                  <span className="text-[10px] text-[#E5485D]/80">Missing requests</span>
                </div>
                <div className="text-[#716B86]">32  │ </div>
                <div className="text-[#716B86]">33  │       - name: Run unit tests</div>
                <div className="text-[#716B86]">34  │         run: |</div>
                <div className="text-[#716B86]">35  │           pytest tests/unit -v</div>
              </div>
            </div>

            {/* Proposed Fix (NVIDIA Nemotron) */}
            <div className="bg-white rounded-2xl border border-[#6C45F5]/30 overflow-hidden shadow-xs">
              <div className="p-3 bg-[#EDE7FF]/60 border-b border-[#6C45F5]/20 flex items-center justify-between">
                <span className="text-xs font-bold text-[#6C45F5] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#20A878]" />
                  Proposed Fix (NVIDIA Nemotron)
                </span>
                <span className="text-[11px] font-mono text-[#6C45F5] font-semibold">Ready to apply</span>
              </div>
              <div className="p-4 font-mono text-xs leading-relaxed text-[#211D35] overflow-x-auto">
                <div className="text-[#716B86]">28  │       - name: Install dependencies</div>
                <div className="text-[#716B86]">29  │         run: |</div>
                <div className="text-[#716B86]">30  │           python -m pip install --upgrade pip</div>
                <div className="bg-[#20A878]/10 text-[#20A878] px-2 py-0.5 rounded my-0.5 font-semibold">
                  31 +│           if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
                </div>
                <div className="bg-[#20A878]/10 text-[#20A878] px-2 py-0.5 rounded my-0.5 font-semibold">
                  32 +│           pip install pytest pytest-cov pydantic requests&gt;=2.31.0
                </div>
                <div className="bg-[#20A878]/10 text-[#20A878] px-2 py-0.5 rounded my-0.5 font-semibold">
                  33 +│       - name: Verify dependency integrity
                </div>
                <div className="bg-[#20A878]/10 text-[#20A878] px-2 py-0.5 rounded my-0.5 font-semibold">
                  34 +│         run: python -c &quot;import requests, pydantic; print(&apos;All core modules resolved&apos;)&quot;
                </div>
                <div className="text-[#716B86]">35  │ </div>
                <div className="text-[#716B86]">36  │       - name: Run unit tests</div>
                <div className="text-[#716B86]">37  │         run: |</div>
                <div className="text-[#716B86]">38  │           pytest tests/unit -v</div>
              </div>
            </div>
          </div>

          {/* Validation Status Strip */}
          <div className="mt-6 pt-5 border-t border-[#E5DFF5] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#716B86]">
              <ShieldCheck className="w-4 h-4 text-[#20A878]" />
              <span>Containerized pre-flight check succeeded in 1.4s · Zero regressions detected</span>
            </div>

            <button
              onClick={onGoToWorkspace}
              className="text-xs font-bold text-[#6C45F5] hover:text-[#21164F] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Explore All Fixes in Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
