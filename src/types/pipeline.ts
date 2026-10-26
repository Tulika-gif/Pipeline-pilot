export type WorkflowStatus = 'passed' | 'failed' | 'in_progress';

export interface WorkflowRun {
  id: string;
  name: string;
  repo: string;
  branch: string;
  commit: string;
  commitMessage: string;
  author: string;
  status: WorkflowStatus;
  duration: string;
  timestamp: string;
  triggeredBy: string;
  errorSummary?: string;
  investigationId?: string;
}

export interface LogEntry {
  line: number;
  text: string;
  type: 'info' | 'error' | 'warning' | 'cmd' | 'success';
}

export interface NemotronInvestigation {
  id: string;
  runId: string;
  workflowName: string;
  repo: string;
  branch: string;
  commit: string;
  createdAt: string;
  model: string;
  confidence: number;
  rootCause: string;
  category: 'dependency' | 'docker' | 'type_error' | 'timeout' | 'lint';
  summary: string;
  affectedFile: string;
  suggestedAction: string;
  reasoningSteps: string[];
  logs: LogEntry[];
  fixDiff: {
    filePath: string;
    originalCode: string;
    fixedCode: string;
    diffLines: {
      type: 'add' | 'remove' | 'context';
      lineNumOriginal?: number;
      lineNumFixed?: number;
      content: string;
    }[];
  };
  validationStatus: 'passed' | 'pending' | 'failed';
  validationMessage: string;
}

export interface MetricCardData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  subtext: string;
}

export interface ChartDataPoint {
  day: string;
  successRate: number;
  totalRuns: number;
  failedRuns: number;
}
