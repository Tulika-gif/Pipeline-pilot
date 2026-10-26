import React, { useState } from 'react';
import {
  Sparkles,
  Terminal,
  AlertOctagon,
  FileCode2,
  CheckCircle2,
  ArrowRight,
  RotateCw,
  GitBranch,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { NemotronInvestigation } from '../../types/pipeline';
import { useToast } from '../common/Toast';

interface InvestigationsTabProps {
  investigation: NemotronInvestigation;
  onNavigateTab: (tab: string) => void;
  onReanalyze: () => void;
}

export const InvestigationsTab: React.FC<InvestigationsTabProps> = ({
  investigation,
  onNavigateTab,
  onReanalyze,
}) => {
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const { showToast } = useToast();

  const handleReanalyze = () => {
    setIsReanalyzing(true);
    setTimeout(() => {
      setIsReanalyzing(false);
      onReanalyze();
      showToast('NVIDIA Nemotron re-analyzed runner telemetry', {
        type: 'success',
        description: 'Confidence refined to 98.6% across 5 execution steps.',
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Breadcrumb Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C45F5] to-[#21164F] flex items-center justify-center text-white shadow-sm shadow-[#6C45F5]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#211D35]">
                {investigation.workflowName}
              </h2>
              <span className="text-xs font-mono font-medium text-[#716B86]">
                #{investigation.runId}
              </span>
              <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-[#E5485D]/10 text-[#E5485D]">
                Failure Detected
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#716B86] mt-0.5 font-mono">
              <span className="flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5" />
                {investigation.branch}
              </span>
              <span>·</span>
              <span>Commit {investigation.commit}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Analyzed {investigation.createdAt}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReanalyze}
            disabled={isReanalyzing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#21164F] bg-[#EDE7FF] hover:bg-[#E5DFF5] transition-colors cursor-pointer disabled:opacity-60"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#6C45F5] ${isReanalyzing ? 'animate-spin' : ''}`} />
            <span>{isReanalyzing ? 'Reasoning with Nemotron...' : 'Re-Run Nemotron'}</span>
          </button>

          <button
            onClick={() => onNavigateTab('fixes')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Review Proposed Fix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Two-Column Core Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Failed Workflow Info & Raw Terminal Logs */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Failure Meta Box */}
          <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E5DFF5]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E5485D]">
                <AlertOctagon className="w-4 h-4" />
                <span>Captured Exit Failure</span>
              </div>
              <span className="text-[11px] font-mono text-[#716B86]">Step 5: Run unit tests</span>
            </div>
            <p className="text-sm font-semibold text-[#211D35] mb-2">
              Execution interrupted by uncaught Python exception during import resolution
            </p>
            <p className="text-xs text-[#716B86] leading-relaxed">
              Target job runner exited prematurely with code 1. Virtual environment was lacking dependency &apos;requests&apos; introduced in commit a1b2c3d.
            </p>
          </div>

          {/* Terminal Log Stream */}
          <div className="flex-1 bg-[#21164F] rounded-2xl border border-[#6C45F5]/30 shadow-md p-4 sm:p-5 flex flex-col overflow-hidden text-white">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#EDE7FF]" />
                <span className="text-xs font-mono font-semibold text-[#EDE7FF]">
                  actions-runner-stderr.log
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                Exit Code 1
              </span>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[380px] font-mono text-xs space-y-1.5 leading-relaxed bg-[#190f38] p-3.5 rounded-xl border border-white/5">
              {investigation.logs.map((log) => (
                <div
                  key={log.line}
                  className={`flex items-start gap-3 py-0.5 ${
                    log.type === 'error'
                      ? 'text-[#ff7f90] bg-[#E5485D]/15 px-2 rounded font-semibold'
                      : log.type === 'cmd'
                      ? 'text-white/90 font-medium'
                      : log.type === 'success'
                      ? 'text-[#20A878]'
                      : 'text-white/50'
                  }`}
                >
                  <span className="text-white/30 select-none w-6 text-right shrink-0">
                    {log.line}
                  </span>
                  <span className="break-all">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Violet AI Analysis Card (Powered by NVIDIA Nemotron) */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#EDE7FF]/60 via-white to-white rounded-2xl p-5 sm:p-6 border border-[#6C45F5]/40 shadow-lg shadow-[#6C45F5]/10 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Model & Confidence Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DFF5]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#6C45F5] flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#6C45F5] block">
                    NVIDIA Nemotron Analysis
                  </span>
                  <span className="text-[11px] text-[#716B86]">
                    Autonomous Root Cause Synthesizer
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20A878] bg-[#20A878]/10 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{investigation.confidence}% Confidence</span>
                </span>
              </div>
            </div>

            {/* Root Cause Diagnosis */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DFF5] shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#716B86] block mb-1">
                Root Cause Diagnosis
              </span>
              <h3 className="text-sm font-bold text-[#211D35] mb-1.5">
                {investigation.rootCause}
              </h3>
              <p className="text-xs text-[#716B86] leading-relaxed">
                {investigation.summary}
              </p>
            </div>

            {/* Step-by-Step Reasoning Flow */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DFF5] shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#6C45F5]" />
                <span className="text-xs font-bold text-[#211D35]">
                  Nemotron Reasoning Sequence
                </span>
              </div>

              <div className="space-y-2">
                {investigation.reasoningSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#716B86]">
                    <span className="w-5 h-5 rounded-full bg-[#EDE7FF] text-[#6C45F5] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug text-[#211D35]">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target File & Action Plan */}
            <div className="p-4 rounded-xl bg-[#EDE7FF]/50 border border-[#6C45F5]/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C45F5]">
                  Recommended Remediation
                </span>
                <span className="text-[11px] font-mono text-[#21164F] flex items-center gap-1">
                  <FileCode2 className="w-3.5 h-3.5 text-[#6C45F5]" />
                  {investigation.affectedFile}
                </span>
              </div>
              <p className="text-xs text-[#21164F] font-medium leading-relaxed">
                {investigation.suggestedAction}
              </p>
            </div>
          </div>

          {/* Action CTA to Fix Review */}
          <div className="pt-5 mt-5 border-t border-[#E5DFF5] flex items-center justify-between">
            <span className="text-xs text-[#716B86]">
              Sandbox dry run verified with 0 regressions
            </span>
            <button
              onClick={() => onNavigateTab('fixes')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View Diff &amp; Apply Fix</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
