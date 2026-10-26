import React from 'react';
import { Terminal, Cpu, CheckCheck, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Inspect the Failure',
      description:
        'When a GitHub Actions runner or CI pipeline job fails, Pipeline Pilot captures runner stderr streams, exit signals, container environments, and AST diffs.',
      icon: Terminal,
      detail: 'Zero manual log searching across thousands of runner lines.',
    },
    {
      step: 'Step 2',
      title: 'Understand the Cause',
      description:
        'Powered by NVIDIA Nemotron, our inference engine correlates the exact commit diff against environment dependencies to isolate the single root cause.',
      icon: Cpu,
      detail: 'Calculates high-precision confidence score & causal tree.',
    },
    {
      step: 'Step 3',
      title: 'Review the Fix',
      description:
        'Pipeline Pilot generates validated code and configuration diffs. Run sandbox dry-run verification, review side-by-side, and approve the PR in one click.',
      icon: CheckCheck,
      detail: 'Pre-flight verified before applying to production branches.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-[#6C45F5] uppercase bg-[#EDE7FF] px-3 py-1 rounded-full border border-[#E5DFF5] inline-block mb-3">
            Autonomous DevOps Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#211D35] tracking-tight mb-4">
            From failed run to confident fix.
          </h2>
          <p className="text-base sm:text-lg text-[#716B86] leading-relaxed">
            Pipeline Pilot helps developers understand failures and review fixes without wasting hours digging through logs.
          </p>
        </div>

        {/* 3 Connected Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFF5] shadow-sm hover:shadow-xl hover:border-[#6C45F5]/40 hover:-translate-y-1 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Step label & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-extrabold tracking-wider text-[#6C45F5] uppercase bg-[#F5F2FF] px-3 py-1 rounded-lg border border-[#E5DFF5]">
                      {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EDE7FF] to-[#F5F2FF] group-hover:from-[#6C45F5] group-hover:to-[#21164F] flex items-center justify-center text-[#6C45F5] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6 transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#211D35] mb-3 group-hover:text-[#6C45F5] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#716B86] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFF5] flex items-center gap-2 text-xs font-semibold text-[#21164F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20A878]" />
                  <span>{item.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
