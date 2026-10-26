import { WorkflowRun, NemotronInvestigation, ChartDataPoint } from '../types/pipeline';

export const INITIAL_RUNS: WorkflowRun[] = [
  {
    id: 'run-8924',
    name: 'Build and Test',
    repo: 'pipeline-pilot',
    branch: 'main',
    commit: 'a1b2c3d',
    commitMessage: 'feat(api): connect telemetry parser to ingest queue',
    author: 'elena-dev',
    status: 'failed',
    duration: '2m 34s',
    timestamp: '14 minutes ago',
    triggeredBy: 'push',
    errorSummary: "ModuleNotFoundError: No module named 'requests'",
    investigationId: 'inv-101',
  },
  {
    id: 'run-8923',
    name: 'Docker Image Build & Push',
    repo: 'pipeline-pilot',
    branch: 'feature/cache-opt',
    commit: 'f9e8d7c',
    commitMessage: 'perf(docker): optimize multi-stage builder layer cache',
    author: 'marcus-ops',
    status: 'passed',
    duration: '4m 12s',
    timestamp: '42 minutes ago',
    triggeredBy: 'pull_request',
  },
  {
    id: 'run-8922',
    name: 'Integration E2E Matrix',
    repo: 'pipeline-pilot',
    branch: 'main',
    commit: '7b8c9d0',
    commitMessage: 'test(e2e): add parallel worker coverage test suite',
    author: 'alex-qa',
    status: 'passed',
    duration: '6m 08s',
    timestamp: '2 hours ago',
    triggeredBy: 'workflow_dispatch',
  },
  {
    id: 'run-8921',
    name: 'Security Scan & SBOM Audit',
    repo: 'pipeline-pilot',
    branch: 'main',
    commit: '4e5f6a1',
    commitMessage: 'chore(deps): bump semver packages in container base',
    author: 'dependabot[bot]',
    status: 'in_progress',
    duration: '1m 15s',
    timestamp: 'Running now',
    triggeredBy: 'schedule',
  },
  {
    id: 'run-8920',
    name: 'Database Migration Smoke Test',
    repo: 'pipeline-pilot',
    branch: 'staging',
    commit: '9c8b7a6',
    commitMessage: 'migration: add partitioned index to workflow_events',
    author: 'sarah-db',
    status: 'failed',
    duration: '1m 45s',
    timestamp: '3 hours ago',
    triggeredBy: 'push',
    errorSummary: 'PostgreSQL connection timeout: port 5432 unreachable after 30s',
    investigationId: 'inv-102',
  },
  {
    id: 'run-8919',
    name: 'Frontend Production Bundle',
    repo: 'pipeline-pilot',
    branch: 'main',
    commit: '1d2e3f4',
    commitMessage: 'fix(ui): resolve layout shift in analytics chart legend',
    author: 'elena-dev',
    status: 'passed',
    duration: '1m 52s',
    timestamp: '5 hours ago',
    triggeredBy: 'push',
  },
];

export const MOCK_INVESTIGATIONS: Record<string, NemotronInvestigation> = {
  'inv-101': {
    id: 'inv-101',
    runId: 'run-8924',
    workflowName: 'Build and Test',
    repo: 'pipeline-pilot',
    branch: 'main',
    commit: 'a1b2c3d',
    createdAt: '12 minutes ago',
    model: 'NVIDIA Nemotron-3-70B-Instruct',
    confidence: 98.4,
    rootCause: 'Missing dependency installation step in test workflow runner environment',
    category: 'dependency',
    summary:
      'The step "Run Pytest Suite" failed at import execution because `requests` package was imported by `telemetry_ingest.py` but never declared in `requirements.txt` or installed in the virtual environment step.',
    affectedFile: '.github/workflows/build-test.yml',
    suggestedAction:
      'Add `pip install -r requirements.txt` before running test suite and ensure `requests>=2.31.0` is present in dependency manifests.',
    reasoningSteps: [
      'Isolated exit code 1 at runner timestamp 02:31.42s in step: "Run unit tests"',
      'Traced Python traceback: line 4 in telemetry_ingest.py -> import requests raised ModuleNotFoundError',
      'Audited active virtual environment: cache restored wheels for pytest & pydantic only',
      'Compared .github/workflows/build-test.yml with commit diff a1b2c3d: requests import added without workflow dependency step',
      'Synthesized patch adding requirements install & pinned dependency verification',
    ],
    logs: [
      { line: 41, text: '2026-10-26T04:48:10.124Z [INFO] Setup Python 3.11.8 environment', type: 'info' },
      { line: 42, text: '2026-10-26T04:48:11.890Z [CMD]  pip install pytest pytest-cov pydantic', type: 'cmd' },
      { line: 43, text: '2026-10-26T04:48:13.512Z [INFO] Successfully installed pytest-8.1.1 pydantic-2.6.4', type: 'success' },
      { line: 44, text: '2026-10-26T04:48:14.002Z [CMD]  pytest tests/unit -v --tb=short', type: 'cmd' },
      { line: 45, text: '2026-10-26T04:48:14.891Z [INFO] collecting ... collected 42 items', type: 'info' },
      { line: 46, text: '2026-10-26T04:48:15.204Z [ERROR] tests/unit/test_telemetry.py:4: in <module>', type: 'error' },
      { line: 47, text: '2026-10-26T04:48:15.205Z [ERROR]     from core.telemetry_ingest import TelemetryDispatcher', type: 'error' },
      { line: 48, text: '2026-10-26T04:48:15.206Z [ERROR] core/telemetry_ingest.py:3: in <module>', type: 'error' },
      { line: 49, text: "2026-10-26T04:48:15.207Z [ERROR] ModuleNotFoundError: No module named 'requests'", type: 'error' },
      { line: 50, text: '2026-10-26T04:48:15.312Z [ERROR] ##[error]Process completed with exit code 1.', type: 'error' },
    ],
    fixDiff: {
      filePath: '.github/workflows/build-test.yml',
      originalCode: `      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install pytest pytest-cov pydantic

      - name: Run unit tests
        run: |
          pytest tests/unit -v`,
      fixedCode: `      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
          pip install pytest pytest-cov pydantic requests>=2.31.0

      - name: Verify dependency integrity
        run: python -c "import requests, pydantic; print('All core modules resolved')"

      - name: Run unit tests
        run: |
          pytest tests/unit -v`,
      diffLines: [
        { type: 'context', lineNumOriginal: 28, lineNumFixed: 28, content: '      - name: Install dependencies' },
        { type: 'context', lineNumOriginal: 29, lineNumFixed: 29, content: '        run: |' },
        { type: 'context', lineNumOriginal: 30, lineNumFixed: 30, content: '          python -m pip install --upgrade pip' },
        { type: 'remove', lineNumOriginal: 31, content: '-         pip install pytest pytest-cov pydantic' },
        { type: 'add', lineNumFixed: 31, content: '+         if [ -f requirements.txt ]; then pip install -r requirements.txt; fi' },
        { type: 'add', lineNumFixed: 32, content: '+         pip install pytest pytest-cov pydantic requests>=2.31.0' },
        { type: 'add', lineNumFixed: 33, content: '+' },
        { type: 'add', lineNumFixed: 34, content: '+     - name: Verify dependency integrity' },
        { type: 'add', lineNumFixed: 35, content: '+       run: python -c "import requests, pydantic; print(\'All core modules resolved\')"' },
        { type: 'context', lineNumOriginal: 32, lineNumFixed: 36, content: ' ' },
        { type: 'context', lineNumOriginal: 33, lineNumFixed: 37, content: '      - name: Run unit tests' },
        { type: 'context', lineNumOriginal: 34, lineNumFixed: 38, content: '        run: |' },
        { type: 'context', lineNumOriginal: 35, lineNumFixed: 39, content: '          pytest tests/unit -v' },
      ],
    },
    validationStatus: 'passed',
    validationMessage: 'Dry-run container sandbox simulated build in 1.4s with 0 errors.',
  },
  'inv-102': {
    id: 'inv-102',
    runId: 'run-8920',
    workflowName: 'Database Migration Smoke Test',
    repo: 'pipeline-pilot',
    branch: 'staging',
    commit: '9c8b7a6',
    createdAt: '2 hours ago',
    model: 'NVIDIA Nemotron-3-70B-Instruct',
    confidence: 96.1,
    rootCause: 'PostgreSQL service container healthcheck failure due to missing readiness delay in job runner',
    category: 'timeout',
    summary:
      'The migration container attempted connection to service container postgres:16 before the internal database init scripts finished creating default schema.',
    affectedFile: '.github/workflows/db-migrate.yml',
    suggestedAction:
      'Configure options `--health-cmd pg_isready --health-interval 5s --health-timeout 5s --health-retries 5` in job service definition.',
    reasoningSteps: [
      'Extracted TCP connect error to localhost:5432 after 1000ms immediate bootstrap',
      'Examined container daemon lifecycle: postgres container started at 00:02s but initdb completed at 00:08s',
      'Identified lack of healthcheck probe in service configuration',
      'Generated YAML patch adding pg_isready healthcheck block to service manifest',
    ],
    logs: [
      { line: 12, text: '2026-10-26T02:11:02.000Z [INFO] Initializing service container: postgres:16-alpine', type: 'info' },
      { line: 13, text: '2026-10-26T02:11:03.450Z [CMD]  npm run db:migrate:test', type: 'cmd' },
      { line: 14, text: '2026-10-26T02:11:04.100Z [ERROR] Error: Connection refused at 127.0.0.1:5432', type: 'error' },
      { line: 15, text: '2026-10-26T02:11:34.200Z [ERROR] Timeout awaiting PostgreSQL connection after 30s', type: 'error' },
      { line: 16, text: '2026-10-26T02:11:34.201Z [ERROR] ##[error]Process completed with exit code 1.', type: 'error' },
    ],
    fixDiff: {
      filePath: '.github/workflows/db-migrate.yml',
      originalCode: `    services:
      postgres:
        image: postgres:16-alpine
        ports:
          - 5432:5432`,
      fixedCode: `    services:
      postgres:
        image: postgres:16-alpine
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 5s
          --health-timeout 5s
          --health-retries 5`,
      diffLines: [
        { type: 'context', lineNumOriginal: 14, lineNumFixed: 14, content: '    services:' },
        { type: 'context', lineNumOriginal: 15, lineNumFixed: 15, content: '      postgres:' },
        { type: 'context', lineNumOriginal: 16, lineNumFixed: 16, content: '        image: postgres:16-alpine' },
        { type: 'context', lineNumOriginal: 17, lineNumFixed: 17, content: '        ports:' },
        { type: 'context', lineNumOriginal: 18, lineNumFixed: 18, content: '          - 5432:5432' },
        { type: 'add', lineNumFixed: 19, content: '+       options: >-' },
        { type: 'add', lineNumFixed: 20, content: '+         --health-cmd pg_isready' },
        { type: 'add', lineNumFixed: 21, content: '+         --health-interval 5s' },
        { type: 'add', lineNumFixed: 22, content: '+         --health-timeout 5s' },
        { type: 'add', lineNumFixed: 23, content: '+         --health-retries 5' },
      ],
    },
    validationStatus: 'passed',
    validationMessage: 'Verified: PostgreSQL service container healthcheck passes in 4.2s.',
  },
};

export const SEVEN_DAY_METRICS: ChartDataPoint[] = [
  { day: 'Mon', successRate: 88.4, totalRuns: 34, failedRuns: 4 },
  { day: 'Tue', successRate: 91.2, totalRuns: 41, failedRuns: 3 },
  { day: 'Wed', successRate: 89.0, totalRuns: 38, failedRuns: 4 },
  { day: 'Thu', successRate: 94.7, totalRuns: 45, failedRuns: 2 },
  { day: 'Fri', successRate: 90.3, totalRuns: 42, failedRuns: 4 },
  { day: 'Sat', successRate: 95.8, totalRuns: 24, failedRuns: 1 },
  { day: 'Sun', successRate: 91.5, totalRuns: 24, failedRuns: 3 },
];

export const CONNECTED_REPOS = [
  {
    name: 'pipeline-pilot',
    description: 'Autonomous CI/CD failure intelligence & pre-flight patch engine',
    activeWorkflows: 8,
    health: '91.5%',
    defaultBranch: 'main',
    webhookStatus: 'active',
  },
  {
    name: 'pilot-agent-runner',
    description: 'NVIDIA Nemotron inference agent dispatch daemon for GitHub Actions',
    activeWorkflows: 4,
    health: '98.0%',
    defaultBranch: 'main',
    webhookStatus: 'active',
  },
  {
    name: 'infra-kubernetes-charts',
    description: 'Helm configurations and ArgoCD application manifests',
    activeWorkflows: 6,
    health: '94.2%',
    defaultBranch: 'production',
    webhookStatus: 'active',
  },
  {
    name: 'web-console-frontend',
    description: 'Vite React dashboard and client telemetry visualizer',
    activeWorkflows: 5,
    health: '96.8%',
    defaultBranch: 'main',
    webhookStatus: 'active',
  },
];
