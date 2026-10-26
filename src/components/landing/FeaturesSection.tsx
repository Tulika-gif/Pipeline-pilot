import React from 'react';
import { SearchCheck, Sparkles, ShieldCheck, GitBranch, ArrowRight } from 'lucide-react';

export const FeaturesSection: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const features = [
    {
      title: 'Root-Cause Analysis',
      subtitle: 'Isolate exact points of failure in seconds',
      description:
        'Instead of drowning in 5,000 lines of messy runner logs, Pipeline Pilot cuts through noisy stack traces to pinpoint the exact broken step, missing module, or timed-out service.',
      icon: SearchCheck,
      badge: '98.4% Accuracy',
    },
    {
      title: 'AI-Powered Fix Suggestions',
      subtitle: 'Code and config patches ready for review',
      description:
        'Powered by NVIDIA Nemotron, Pipeline Pilot generates surgical YAML workflow adjustments, dependency upgrades, and Dockerfile corrections that directly address the break.',
      icon: Sparkles,
      badge: 'NVIDIA Nemotron',
    },
    {
      title: 'Validate Before Applying',
      subtitle: 'Dry-run verification in ephemeral containers',
      description:
        'Never blindly push AI suggestions to production. Pipeline Pilot tests each proposed patch in a isolated sandbox runner to ensure tests pass and builds succeed.',
      icon: ShieldCheck,
      badge: 'Zero Risk',
    },
    {
      title: 'GitHub Actions Integration',
      subtitle: 'Native webhooks and one-click PRs',
      description:
        'Hooks directly into your existing GitHub repository workflows. Receive automatic status checks, failure annotations, and ready-to-merge Pull Requests right inside your repo.',
      icon: GitBranch,
      badge: 'Zero-Config Hook',
    },
  ];

  return (
    <section id="product-section" className="py-20 bg-gradient-to-b from-[#F5F2FF] to-[#EDE7FF]/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-[#6C45F5] uppercase bg-white px-3 py-1 rounded-full border border-[#E5DFF5] inline-block mb-3 shadow-xs">
            Engineered For Engineers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#211D35] tracking-tight mb-4">
            Everything you need for more reliable pipelines.
          </h2>
          <p className="text-base sm:text-lg text-[#716B86] leading-relaxed">
            Eliminate hours of manual troubleshooting with autonomous root-cause intelligence and pre-flight tested patches.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFF5] shadow-xs hover:shadow-lg hover:border-[#6C45F5]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDE7FF] group-hover:bg-[#6C45F5] text-[#6C45F5] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-[#6C45F5] bg-[#EDE7FF] px-2.5 py-1 rounded-full border border-[#6C45F5]/20">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#211D35] mb-1 group-hover:text-[#6C45F5] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#6C45F5] mb-3">
                    {feat.subtitle}
                  </p>

                  <p className="text-sm text-[#716B86] leading-relaxed mb-6">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFF5] flex items-center justify-between">
                  <span className="text-xs text-[#716B86]">Instant developer feedback</span>
                  <button
                    onClick={onExplore}
                    className="text-xs font-bold text-[#6C45F5] hover:text-[#21164F] flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>View in Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
