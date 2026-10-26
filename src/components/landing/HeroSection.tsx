import React from 'react';
import { GitBranch, Clock, GitCommit, CheckCircle2, AlertOctagon, Sparkles, Terminal, FileCode2, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExploreWorkspace: () => void;
  onSeeHowItWorks: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWorkspace,
  onSeeHowItWorks,
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-18 md:pb-28 overflow-hidden">
      {/* Background radial ambient violet glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#6C45F5]/15 via-[#EDE7FF]/40 to-transparent blur-3xl pointer-events-none -z-10 rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Small pill above the heading */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EDE7FF] border border-[#E5DFF5] text-xs font-semibold tracking-wider text-[#6C45F5] uppercase mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-POWERED DEVOPS ASSISTANT</span>
            </div>

            {/* Main headline: two lines with contrasting purple text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#211D35] leading-[1.12] mb-6">
              Your pipeline failed.{' '}
              <span className="bg-gradient-to-r from-[#6C45F5] to-[#21164F] bg-clip-text text-transparent">
                Find out why.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-lg sm:text-xl text-[#716B86] max-w-xl leading-relaxed mb-8">
              Turn confusing CI/CD errors into clear explanations and reviewable fixes — powered by AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onExploreWorkspace}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] shadow-md shadow-[#6C45F5]/30 hover:shadow-lg hover:shadow-[#6C45F5]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap shrink-0"
              >
                <span>Explore the Workspace</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onSeeHowItWorks}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-[#21164F] bg-white border border-[#E5DFF5] hover:border-[#6C45F5]/50 hover:bg-[#EDE7FF]/40 shadow-xs transition-all cursor-pointer text-sm sm:text-base whitespace-nowrap shrink-0"
              >
                See How It Works
              </button>
            </div>

            {/* Subtle proof strip */}
            <div className="mt-10 pt-6 border-t border-[#E5DFF5]/80 flex items-center gap-6 text-xs text-[#716B86]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#20A878]" />
                <span>Zero configuration required</span>
              </div>
              <span className="text-[#E5DFF5]">|</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#20A878]" />
                <span>NVIDIA Nemotron engine</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sophisticated floating product UI cards composition */}
          <div className="lg:col-span-6 relative h-[440px] sm:h-[480px] w-full flex items-center justify-center">
            {/* Violet ambient glow behind the composition */}
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-[#6C45F5]/20 via-[#EDE7FF]/50 to-[#6C45F5]/10 filter blur-2xl -z-10" />

            {/* Floating decorative elements */}
            <div className="absolute -top-3 right-8 w-10 h-10 rounded-2xl bg-white/90 border border-[#E5DFF5] shadow-lg flex items-center justify-center text-[#6C45F5] animate-bounce duration-1000">
              <Sparkles className="w-5 h-5" />
            </div>

            {/* Card A — Failed Workflow (Top Left Back) */}
            <div className="absolute top-2 left-0 sm:left-4 w-[88%] sm:w-[350px] bg-white rounded-2xl border border-[#E5DFF5] shadow-xl shadow-[#21164F]/8 p-4 z-10 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFF5]/60 mb-3">
                <div className="flex items-center gap-2.5">
                  {/* GitHub Actions style icon */}
                  <div className="w-7 h-7 rounded-lg bg-[#21164F] flex items-center justify-center text-white">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#211D35]">Build and Test</h3>
                    <p className="text-[11px] text-[#716B86]">pipeline-pilot</p>
                  </div>
                </div>
                {/* Status: FAILED */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E5485D]/10 text-[#E5485D] text-xs font-bold">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>FAILED</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px]">
                <div className="flex flex-col">
                  <span className="text-[#716B86] flex items-center gap-1">
                    <GitBranch className="w-3 h-3" /> Branch
                  </span>
                  <span className="font-mono font-semibold text-[#211D35] truncate">main</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#716B86] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Duration
                  </span>
                  <span className="font-mono font-semibold text-[#211D35]">2m 34s</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#716B86] flex items-center gap-1">
                    <GitCommit className="w-3 h-3" /> Commit
                  </span>
                  <span className="font-mono font-semibold text-[#6C45F5]">a1b2c3d</span>
                </div>
              </div>
            </div>

            {/* Card B — Terminal Logs (Middle Center Overlapping) */}
            <div className="absolute top-28 right-0 sm:right-2 w-[92%] sm:w-[390px] bg-[#21164F] rounded-2xl border border-[#6C45F5]/30 shadow-2xl shadow-[#21164F]/30 p-4 text-white z-20 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#EDE7FF]" />
                  <span className="text-xs font-mono font-medium text-white/80">runner-logs.txt</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              <div className="font-mono text-xs space-y-1 leading-relaxed">
                <p className="text-white/60">
                  <span className="text-emerald-400">$</span> pytest tests/unit -v --tb=short
                </p>
                <p className="text-white/40">collecting ... collected 42 items</p>
                <p className="text-white/40">tests/unit/test_telemetry.py:4: in &lt;module&gt;</p>
                <div className="p-1.5 rounded bg-[#E5485D]/20 border border-[#E5485D]/40 text-[#ff8b99] font-medium">
                  ModuleNotFoundError: No module named 'requests'
                </div>
                <p className="text-rose-400/90 font-medium">
                  ##[error]Process completed with exit code 1.
                </p>
              </div>
            </div>

            {/* Card C — AI Investigation (Foreground Bottom) */}
            <div className="absolute -bottom-2 left-2 sm:left-8 w-[94%] sm:w-[380px] bg-white rounded-2xl border border-[#6C45F5]/40 shadow-2xl shadow-[#6C45F5]/20 p-4.5 z-30 hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#6C45F5] flex items-center justify-center text-white">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#6C45F5]">NVIDIA Nemotron Analysis</span>
                    <span className="block text-[10px] text-[#716B86]">Root cause identified</span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#20A878] bg-[#20A878]/10 px-2 py-0.5 rounded-full">
                  98.4% Confidence
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2 rounded-lg bg-[#F5F2FF] border border-[#E5DFF5]">
                  <span className="text-[10px] uppercase font-bold text-[#716B86] block mb-0.5">Diagnosed Issue</span>
                  <p className="font-semibold text-[#211D35]">Missing dependency installation step</p>
                </div>

                <div className="p-2 rounded-lg bg-[#EDE7FF]/60 border border-[#6C45F5]/20">
                  <span className="text-[10px] uppercase font-bold text-[#6C45F5] block mb-0.5">Suggested Fix</span>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#21164F]">
                    <FileCode2 className="w-3.5 h-3.5 text-[#6C45F5] shrink-0" />
                    <span>Add dependency to requirements.txt</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#E5DFF5]/60 text-[11px]">
                  <span className="text-[#716B86]">Validation Status</span>
                  <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
