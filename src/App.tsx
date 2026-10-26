import React, { useState } from 'react';
import { ToastProvider, useToast } from './components/common/Toast';
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { HowItWorks } from './components/landing/HowItWorks';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { InvestigationPreviewSection } from './components/landing/InvestigationPreviewSection';
import { FixReviewSection } from './components/landing/FixReviewSection';
import { TechStackSection } from './components/landing/TechStackSection';
import { CtaSection } from './components/landing/CtaSection';
import { Footer } from './components/landing/Footer';
import { DashboardWorkspace } from './components/dashboard/DashboardWorkspace';
import { ArrowLeft, Sparkles, Layers } from 'lucide-react';

function AppContent() {
  const [viewMode, setViewMode] = useState<'landing' | 'workspace'>('landing');
  const { showToast } = useToast();

  const handleOpenWorkspace = () => {
    setViewMode('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Loaded Pipeline Pilot Demo Workspace', {
      type: 'info',
      description: 'Connected to repository pipeline-pilot with NVIDIA Nemotron active.',
    });
  };

  const handleBackToLanding = () => {
    setViewMode('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToSection = (id: string) => {
    setViewMode('landing');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#F5F2FF] text-[#211D35] flex flex-col font-sans">
      {/* Sticky Translucent Top Navigation Bar */}
      <Navbar
        onOpenWorkspace={() => {
          if (viewMode === 'workspace') {
            setViewMode('landing');
          } else {
            handleOpenWorkspace();
          }
        }}
        isWorkspaceMode={viewMode === 'workspace'}
        onToggleView={() => setViewMode(viewMode === 'workspace' ? 'landing' : 'workspace')}
      />

      {viewMode === 'landing' ? (
        <main className="flex-1">
          {/* Landing Page Hero Section */}
          <HeroSection
            onExploreWorkspace={handleOpenWorkspace}
            onSeeHowItWorks={() => {
              const el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Interactive Product Dashboard Preview Section (directly below hero) */}
          <section id="workspace-preview" className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6C45F5] mb-1">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Live Interactive Product Preview</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#211D35] tracking-tight">
                    DevOps Assistant Workspace
                  </h2>
                  <p className="text-xs sm:text-sm text-[#716B86] mt-1">
                    Interact directly with pipeline telemetry, inspect runs, and run NVIDIA Nemotron investigations below.
                  </p>
                </div>

                <button
                  onClick={handleOpenWorkspace}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-[#6C45F5] bg-white border border-[#E5DFF5] hover:border-[#6C45F5]/40 hover:bg-[#EDE7FF]/40 shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  <span>Open Fullscreen Workspace</span>
                  <span>→</span>
                </button>
              </div>

              {/* The Dashboard Workspace Preview Container */}
              <DashboardWorkspace onToggleFullPage={handleOpenWorkspace} />
            </div>
          </section>

          {/* How It Works Section */}
          <HowItWorks />

          {/* Features Section */}
          <FeaturesSection onExplore={handleOpenWorkspace} />

          {/* AI Investigation Preview Section (Differentiator) */}
          <InvestigationPreviewSection onOpenFix={() => handleScrollToSection('fix-review')} />

          {/* Fix Review Section (Code Diff & Validation) */}
          <div id="fix-review">
            <FixReviewSection onGoToWorkspace={handleOpenWorkspace} />
          </div>

          {/* Technology Section (NVIDIA Nemotron, GitHub Actions, Docker, Python) */}
          <TechStackSection />

          {/* Call-to-Action Banner */}
          <CtaSection onOpenWorkspace={handleOpenWorkspace} />
        </main>
      ) : (
        /* Full Workspace Mode View */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={handleBackToLanding}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#E5DFF5] hover:bg-[#EDE7FF]/40 text-xs font-semibold text-[#716B86] hover:text-[#211D35] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Landing Page</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-[#716B86]">
              <span className="w-2 h-2 rounded-full bg-[#20A878]" />
              <span className="font-medium text-[#211D35]">NVIDIA Nemotron Inference Engine Active</span>
            </div>
          </div>

          <DashboardWorkspace isFullPage={true} onToggleFullPage={handleBackToLanding} />
        </main>
      )}

      {/* Footer */}
      <Footer onOpenWorkspace={handleOpenWorkspace} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
