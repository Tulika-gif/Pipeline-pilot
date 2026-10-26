import React from 'react';
import { Logo } from '../common/Logo';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC<{ onOpenWorkspace: () => void }> = ({ onOpenWorkspace }) => {
  return (
    <footer className="bg-[#FAF8FF] border-t border-[#E5DFF5] pt-16 pb-12 text-sm text-[#716B86]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E5DFF5]">
          {/* Brand info (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-[#716B86] max-w-sm leading-relaxed">
              Autonomous AI-powered DevOps assistant that analyzes CI/CD pipeline failures, identifies root causes with NVIDIA Nemotron, and delivers pre-flight validated fixes.
            </p>
            <p className="text-xs font-semibold text-[#6C45F5] italic">
              Build. Test. Deploy. Smarter.
            </p>
          </div>

          {/* Nav links: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D35]">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenWorkspace}
                  className="hover:text-[#6C45F5] transition-colors text-left cursor-pointer"
                >
                  DevOps Workspace
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#6C45F5] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#product-section" className="hover:text-[#6C45F5] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#investigation-deepdive" className="hover:text-[#6C45F5] transition-colors">
                  AI Investigations
                </a>
              </li>
            </ul>
          </div>

          {/* Nav links: Technology */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D35]">
              Technology
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#technology" className="hover:text-[#6C45F5] transition-colors">
                  NVIDIA Nemotron
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#6C45F5] transition-colors">
                  GitHub Actions Runner
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#6C45F5] transition-colors">
                  Docker Sandbox Testing
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-[#6C45F5] transition-colors">
                  Python AST Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Nav links: Resources & GitHub */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#211D35]">
              Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6C45F5] transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="#investigation-deepdive" className="hover:text-[#6C45F5] transition-colors">
                  YAML Diff Documentation
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#6C45F5] transition-colors">
                  Pre-Flight Sandbox Protocol
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenWorkspace}
                  className="hover:text-[#6C45F5] transition-colors text-left cursor-pointer"
                >
                  Interactive Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#716B86]">
          <p>© 2026 Pipeline Pilot. Developed for NVIDIA-focused DevOps innovation.</p>
          <div className="flex items-center gap-6">
            <span>Inter &amp; JetBrains Mono</span>
            <span>·</span>
            <span>WCAG AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
