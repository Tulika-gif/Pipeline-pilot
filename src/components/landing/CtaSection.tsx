import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const CtaSection: React.FC<{ onOpenWorkspace: () => void }> = ({ onOpenWorkspace }) => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#21164F] via-[#2d1b6b] to-[#160d38] text-white p-8 sm:p-14 md:p-16 shadow-2xl shadow-[#21164F]/20 overflow-hidden">
          {/* Subtle ambient violet backlights */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#6C45F5]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-[#EDE7FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#EDE7FF] mb-6 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#EDE7FF]" />
              <span>NVIDIA Nemotron-Powered DevOps Assistant</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Ship with fewer surprises.
            </h2>

            <p className="text-base sm:text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
              Stop context switching into endless runner logs. Let Pipeline Pilot diagnose the failure, generate a validated fix, and keep your engineering velocity moving.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenWorkspace}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#21164F] bg-white hover:bg-[#EDE7FF] shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Open Pipeline Pilot</span>
                <ArrowRight className="w-4 h-4 text-[#6C45F5] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4 text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#20A878]" /> Free demo workspace
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#20A878]" /> Instant simulation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
