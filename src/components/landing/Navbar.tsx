import React from 'react';
import { Logo } from '../common/Logo';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenWorkspace: () => void;
  activeSection?: string;
  isWorkspaceMode?: boolean;
  onToggleView?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenWorkspace,
  isWorkspaceMode = false,
  onToggleView,
}) => {
  const scrollTo = (id: string) => {
    if (isWorkspaceMode && onToggleView) {
      onToggleView();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#F5F2FF]/85 border-b border-[#E5DFF5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div
          onClick={() => {
            if (isWorkspaceMode && onToggleView) {
              onToggleView();
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="cursor-pointer shrink-0"
        >
          <Logo size="md" />
        </div>

        {/* Zone 2: Navigation Links (Clean typography, whitespace-nowrap) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#716B86]">
          <button
            onClick={() => scrollTo('product-section')}
            className="hover:text-[#6C45F5] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Product
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-[#6C45F5] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('technology')}
            className="hover:text-[#6C45F5] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Technology
          </button>
          <button
            onClick={() => scrollTo('investigation-deepdive')}
            className="hover:text-[#6C45F5] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            Documentation
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#6C45F5] transition-colors whitespace-nowrap shrink-0"
          >
            GitHub
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenWorkspace}
            className="relative group overflow-hidden px-4.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] shadow-sm shadow-[#6C45F5]/25 hover:shadow-md hover:shadow-[#6C45F5]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{isWorkspaceMode ? 'Switch to Landing Page' : 'Open Workspace'}</span>
              <span className="text-[#EDE7FF]">→</span>
            </span>
            <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </header>
  );
};
