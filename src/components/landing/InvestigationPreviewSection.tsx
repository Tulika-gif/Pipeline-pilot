import React from 'react';
import { Sparkles, Terminal, AlertOctagon, CheckCircle2, ArrowRight, ShieldCheck, FileCode2 } from 'lucide-react';

export const InvestigationPreviewSection: React.FC<{ onOpenFix: () => void }> = ({ onOpenFix }) => {
  return (
    <section id="investigation-deepdive" className="py-20 md:py-28 bg-[#F5F2FF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-[#6C45F5] uppercase bg-[#EDE7FF] px-3 py-1 rounded-full border border-[#E5DFF5] inline-block mb-3">
            Core Differentiator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#211D35] tracking-tight mb-4">
            AI Investigation in Action
          </h2>
          <p className="text-base sm:text-lg text-[#716B86] leading-relaxed">
            See how Pipeline Pilot ingests chaotic raw runner output and synthesizes actionable clarity.
          </p>
        </div>

        {/* Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Failed Workflow Info & Logs */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFF5] shadow-sm">
            <div>
              {/* Header Box */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DFF5] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#E5485D]/10 text-[#E5485D] flex items-center justify-center">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#211D35]">Build and Test Workflow</h3>
                    <p className="text-xs text-[#716B86] font-mono">Job ID: actions/runs/8924 · branch: main</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#E5485D] bg-[#E5485D]/10 px-2.5 py-1 rounded-md">
                  FAILED (2m 34s)
                </span>
              </div>

              <p className="text-xs text-[#716B86] mb-4">
                Raw terminal output received from GitHub Actions Linux Runner:
              </p>

              {/* Terminal Code Box */}
              <div className="bg-[#21164F] rounded-2xl p-4 text-white font-mono text-xs space-y-1.5 overflow-x-auto shadow-inner border border-[#6C45F5]/30">
                <div className="text-white/40">// runner environment setup</div>
                <div className="text-white/80">
                  <span className="text-emerald-400">$</span> pip install pytest pytest-cov pydantic
                </div>
                <div className="text-white/50">Successfully installed pytest-8.1.1 pydantic-2.6.4</div>
                <div className="text-white/80">
                  <span className="text-emerald-400">$</span> pytest tests/unit -v --tb=short
                </div>
                <div className="text-white/40">collecting ... collected 42 items</div>
                <div className="text-white/40">tests/unit/test_telemetry.py:4: in &lt;module&gt;</div>
                <div className="text-white/40">core/telemetry_ingest.py:3: in &lt;module&gt;</div>
                <div className="p-2 rounded bg-[#E5485D]/20 border border-[#E5485D]/40 text-[#ff8b99] font-semibold my-2">
                  ModuleNotFoundError: No module named &apos;requests&apos;
                </div>
                <div className="text-rose-400 font-bold">##[error]Process completed with exit code 1.</div>
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-[#E5DFF5] flex items-center justify-between text-xs text-[#716B86]">
              <span>Stack trace captured across 18 stack frames</span>
              <span className="font-mono text-[#211D35] font-semibold">Exit Code 1</span>
            </div>
          </div>

          {/* Right: Violet AI Analysis Card (Powered by NVIDIA Nemotron) */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-gradient-to-br from-[#EDE7FF] via-white to-white rounded-3xl p-6 sm:p-8 border border-[#6C45F5]/40 shadow-xl shadow-[#6C45F5]/10">
            <div>
              {/* Header Box */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DFF5] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6C45F5] to-[#21164F] text-white flex items-center justify-center shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#211D35]">NVIDIA Nemotron Analysis</h3>
                    <p className="text-xs text-[#6C45F5] font-medium">Autonomous Root Cause Synthesis</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#20A878] bg-[#20A878]/10 px-3 py-1 rounded-full border border-[#20A878]/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>98.4% Confidence</span>
                </div>
              </div>

              {/* Diagnosed Root Cause */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5DFF5] shadow-xs mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#716B86] block mb-1">
                  Root Cause Identified
                </span>
                <p className="text-sm font-bold text-[#211D35] mb-1">
                  Missing dependency installation step
                </p>
                <p className="text-xs text-[#716B86] leading-relaxed">
                  The step &apos;Run unit tests&apos; failed because `requests` package was introduced in commit a1b2c3d but omitted from workflow dependency installation step.
                </p>
              </div>

              {/* Reasoning Steps */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2.5 text-xs text-[#211D35] bg-white/70 p-2.5 rounded-xl border border-[#E5DFF5]">
                  <span className="w-4 h-4 rounded-full bg-[#EDE7FF] text-[#6C45F5] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Isolated exit code 1 at runner timestamp 02:31 in step &quot;Run unit tests&quot;.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#211D35] bg-white/70 p-2.5 rounded-xl border border-[#E5DFF5]">
                  <span className="w-4 h-4 rounded-full bg-[#EDE7FF] text-[#6C45F5] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Cross-referenced commit a1b2c3d: telemetry ingest worker imports `requests`.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#211D35] bg-white/70 p-2.5 rounded-xl border border-[#E5DFF5]">
                  <span className="w-4 h-4 rounded-full bg-[#EDE7FF] text-[#6C45F5] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Generated AST-compliant fix adding `requirements.txt` installation step.</span>
                </div>
              </div>

              {/* Suggested Action Box */}
              <div className="p-4 rounded-2xl bg-[#EDE7FF]/60 border border-[#6C45F5]/30">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C45F5]">
                    Suggested Fix
                  </span>
                  <span className="text-xs font-mono text-[#21164F] flex items-center gap-1">
                    <FileCode2 className="w-3.5 h-3.5 text-[#6C45F5]" />
                    .github/workflows/build-test.yml
                  </span>
                </div>
                <p className="text-xs text-[#21164F] font-semibold">
                  Add the dependency to requirements.txt &amp; update workflow runner install command.
                </p>
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-[#E5DFF5] flex items-center justify-between">
              <span className="text-xs text-[#716B86] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#20A878]" />
                Sandbox dry-run verified
              </span>
              <button
                onClick={onOpenFix}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Examine Code Diff</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
