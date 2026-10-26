import React from 'react';
import { Cpu, GitBranch, Box, FileCode2, ArrowUpRight } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const techs = [
    {
      name: 'NVIDIA Nemotron',
      category: 'Inference & Reasoning',
      description:
        'Target foundation reasoning architecture designed for complex code synthesis, root-cause isolation, and AST dependency correlation.',
      icon: Cpu,
      meta: 'Nemotron-3-70B-Instruct',
    },
    {
      name: 'GitHub Actions',
      category: 'CI/CD Runtime & Dispatch',
      description:
        'Native runner telemetry integration via webhook listeners, step exit-status telemetry, and automated GitHub PR authoring.',
      icon: GitBranch,
      meta: 'Workflow Dispatch & Webhooks',
    },
    {
      name: 'Docker',
      category: 'Containerized Sandbox',
      description:
        'Ephemeral isolated container environments to dry-run and validate proposed workflow patches before applying them to production codebases.',
      icon: Box,
      meta: 'Pre-flight Dry Runs',
    },
    {
      name: 'Python Toolchains',
      category: 'AST Analysis & Dependencies',
      description:
        'Deep abstract syntax tree inspection, dependency manifest parsing (pip, pyproject, npm), and log parsing pipelines.',
      icon: FileCode2,
      meta: 'AST Parsing & Pytest',
    },
  ];

  return (
    <section id="technology" className="py-20 md:py-28 bg-[#F5F2FF] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-wider text-[#6C45F5] uppercase bg-[#EDE7FF] px-3 py-1 rounded-full border border-[#E5DFF5] inline-block mb-3">
            Technology Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#211D35] tracking-tight mb-4">
            Engineered for high-throughput DevOps.
          </h2>
          <p className="text-base sm:text-lg text-[#716B86] leading-relaxed">
            Designed for hackathon demonstration with NVIDIA Nemotron at its core, backed by robust enterprise CI/CD standards.
          </p>
        </div>

        {/* 4 Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techs.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="bg-white rounded-3xl p-6 border border-[#E5DFF5] shadow-xs hover:shadow-lg hover:border-[#6C45F5]/40 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EDE7FF] text-[#6C45F5] flex items-center justify-center mb-5 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-semibold text-[#6C45F5] uppercase tracking-wider block mb-1">
                    {tech.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#211D35] mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-[#716B86] leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5DFF5] text-[11px] font-mono text-[#21164F] font-semibold">
                  {tech.meta}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
