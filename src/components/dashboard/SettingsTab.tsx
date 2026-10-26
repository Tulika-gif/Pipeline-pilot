import React, { useState } from 'react';
import { Sparkles, Sliders, Shield, Bell, Check, Save } from 'lucide-react';
import { useToast } from '../common/Toast';

export const SettingsTab: React.FC = () => {
  const [model, setModel] = useState('NVIDIA Nemotron-3-70B-Instruct');
  const [autoPr, setAutoPr] = useState(true);
  const [preflightSandbox, setPreflightSandbox] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(true);
  const { showToast } = useToast();

  const handleSave = () => {
    showToast('Settings saved successfully', {
      type: 'success',
      description: `Inference pipeline configured to ${model}.`,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white rounded-2xl p-5 border border-[#E5DFF5] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#211D35]">
            Workspace &amp; Model Settings
          </h2>
          <p className="text-xs text-[#716B86]">
            Configure NVIDIA Nemotron reasoning preferences, sandbox runners, and alerting webhooks
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6C45F5] to-[#21164F] shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* AI Model Section */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5DFF5] shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5DFF5]">
          <div className="w-8 h-8 rounded-xl bg-[#EDE7FF] text-[#6C45F5] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#211D35]">NVIDIA Nemotron Intelligence Engine</h3>
            <p className="text-xs text-[#716B86]">Select model weights and synthesis reasoning profile</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-semibold text-[#211D35] block">
            Target Foundation Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full max-w-md px-3.5 py-2.5 bg-[#F5F2FF]/60 border border-[#E5DFF5] rounded-xl text-xs sm:text-sm text-[#211D35] focus:outline-hidden focus:border-[#6C45F5] transition-colors"
          >
            <option value="NVIDIA Nemotron-3-70B-Instruct">
              NVIDIA Nemotron-3-70B-Instruct (Recommended · Ultra-high code reasoning)
            </option>
            <option value="NVIDIA Nemotron-4-340B-Base">
              NVIDIA Nemotron-4-340B-Base (Enterprise High-Capacity)
            </option>
            <option value="NVIDIA Nemotron-Mini-4B-Instruct">
              NVIDIA Nemotron-Mini-4B-Instruct (Edge &amp; Fast Local Inference)
            </option>
          </select>
          <p className="text-[11px] text-[#716B86]">
            Nemotron parses CI/CD failure logs, maps dependency trees, and outputs AST-validated YAML patches.
          </p>
        </div>
      </div>

      {/* Automation Policies */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5DFF5] shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5DFF5]">
          <div className="w-8 h-8 rounded-xl bg-[#EDE7FF] text-[#6C45F5] flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#211D35]">Autonomous Actions &amp; Sandbox</h3>
            <p className="text-xs text-[#716B86]">Control automated patch generation and dry-run containers</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={preflightSandbox}
              onChange={(e) => setPreflightSandbox(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#6C45F5] border-[#E5DFF5] focus:ring-[#6C45F5]"
            />
            <div>
              <span className="font-semibold text-[#211D35] block">Pre-Flight Sandbox Validation</span>
              <span className="text-[#716B86]">
                Spin up ephemeral Docker container to dry-run proposed fixes before requesting developer review.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoPr}
              onChange={(e) => setAutoPr(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#6C45F5] border-[#E5DFF5] focus:ring-[#6C45F5]"
            />
            <div>
              <span className="font-semibold text-[#211D35] block">Draft PR Generation</span>
              <span className="text-[#716B86]">
                Automatically branch and propose GitHub Pull Requests when confidence exceeds 95%.
              </span>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={slackNotifications}
              onChange={(e) => setSlackNotifications(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#6C45F5] border-[#E5DFF5] focus:ring-[#6C45F5]"
            />
            <div>
              <span className="font-semibold text-[#211D35] block">Instant Slack &amp; Teams Notifications</span>
              <span className="text-[#716B86]">
                Ping engineering channels immediately when a pipeline break is analyzed with a ready-to-merge fix.
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
