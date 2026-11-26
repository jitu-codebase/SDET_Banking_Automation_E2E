# 🏦 Banking Automation Test Suite (SDET)

![TypeScript](https://img.shields.io/badge/TypeScript-6.x-blue?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.65-green?logo=playwright)
![Playwright BDD](https://img.shields.io/badge/Playwright--BDD-Cucumber-brightgreen?logo=cucumber)
![Nx](https://img.shields.io/badge/Nx-24.x-blueviolet?logo=nx)
![pnpm](https://img.shields.io/badge/pnpm-10.x-orange?logo=pnpm)
![Zod](https://img.shields.io/badge/Zod-Schema--Validation-blue?logo=zod)

An SDET automation framework for a digital banking application, built using **Nx Monorepo**, **pnpm workspaces**, **Playwright**, **Playwright-BDD (Cucumber/Gherkin)**, **TypeScript**, and **Zod**.

The framework supports API, UI, and hybrid end-to-end testing with reusable shared libraries, scenario-level test data management, schema validation, parallel execution, and structured reporting.

---

## 📑 Table of Contents

- [Architecture Overview](#-architecture-overview)
- [Key Features](#-key-features)
- [Repository Structure](#-repository-structure)
- [Design Patterns & Engineering Highlights](#-design-patterns--engineering-highlights)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [Running Tests](#-running-tests)
- [Playwright Execution Configuration](#-playwright-execution-configuration)
- [Test Reports & Artifacts](#-test-reports--artifacts)
- [Adding New Tests](#-adding-new-tests)
- [Troubleshooting & FAQ](#-troubleshooting--faq)
- [License](#-license)

---

## 🏛 Architecture Overview

The repository follows a modular architecture using an Nx Monorepo.

```text
                         ┌──────────────────────────────┐
                         │     Playwright Test Runner   │
                         └──────────────┬───────────────┘
                                        │
                         ┌──────────────▼───────────────┐
                         │       Hybrid Fixtures       │
                         │ apiTest / pageTest / hybridTest│
                         └──────────────┬───────────────┘
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 │                                             │
       ┌─────────▼──────────┐                       ┌──────────▼─────────┐
       │   apps/api-tests   │                       │    apps/ui-tests   │
       │                    │                       │                    │
       │ Feature Files      │                       │ Feature Files      │
       │ Step Definitions   │                       │ Step Definitions   │
       │ API Fixtures       │                       │ Page Fixtures      │
       └─────────┬──────────┘                       └──────────┬─────────┘
                 │                                             │
                 ▼                                             ▼
       ┌────────────────────┐                       ┌────────────────────┐
       │      @api-lib      │                       │      @ui-lib       │
       │                    │                       │                    │
       │ API Client         │                       │ Page Objects       │
       │ Operation Executor │                       │ UI Actions         │
       │ Domain Services    │                       │ Locators           │
       │ Zod Schemas        │                       │                    │
       └─────────┬──────────┘                       └──────────┬─────────┘
                 │                                             │
                 └──────────────────┬──────────────────────────┘
                                    ▼
                         ┌────────────────────┐
                         │       @core        │
                         │                    │
                         │ TestDataContext    │
                         │ Dynamic Data       │
                         │ Sensitive Masking  │
                         │ Shared Utilities   │
                         └─────────┬──────────┘
                                   ▼
                         ┌────────────────────┐
                         │      @config       │
                         │ Environment Config │
                         │ Zod Validation     │
                         └────────────────────┘
```

### Architectural responsibilities

| Layer                 | Responsibility                                        |
| --------------------- | ----------------------------------------------------- |
| `apps/api-tests`      | API BDD scenarios, steps, and fixtures                |
| `apps/ui-tests`       | UI BDD scenarios, steps, and page fixtures            |
| `shared-libs/api-lib` | Reusable API client, schemas, factories, and services |
| `shared-libs/ui-lib`  | Page Object Model and reusable UI interactions        |
| `shared-libs/core`    | Test data context, dynamic data, and common utilities |
| `config`              | Environment loading and validation                    |

---

## ✨ Key Features

- **BDD with Gherkin:** Human-readable scenarios using `.feature` files, generated through `playwright-bdd`.
- **Hybrid Testing:** UI scenarios can reuse API steps for setup and backend operations.
- **Contract-Safe API Automation:** Request and response validation using Zod schemas.
- **Page Object Model:** Encapsulated UI interactions using Playwright locators.
- **Dynamic Test Data:** Synthetic test data using `@faker-js/faker` and UUID-based unique email generation.
- **Scenario State Management:** `TestDataContext` shares data between steps within a test lifecycle.
- **Test Isolation:** Fresh scenario context and test-scoped data management.
- **Sensitive Data Masking:** Sensitive values are masked before logging.
- **Multi-Environment Support:** Environment selection through `TEST_ENV`.
- **Parallel Execution:** Playwright parallel execution with configurable worker count.
- **Failure Diagnostics:** Screenshots, videos, traces, HTML reports, and JUnit XML reports.

---

## 📂 Repository Structure

```text
.
├── apps/
│   ├── api-tests/
│   │   ├── src/
│   │   │   ├── features/              # API Gherkin scenarios
│   │   │   ├── fixtures/              # API and hybrid fixtures
│   │   │   └── steps/                 # API step definitions
│   │   ├── playwright.config.ts
│   │   ├── project.json
│   │   └── tsconfig.json
│   │
│   └── ui-tests/
│       ├── src/
│       │   ├── features/              # UI Gherkin scenarios
│       │   ├── fixtures/              # UI page fixtures
│       │   └── steps/                 # UI step definitions
│       ├── playwright.config.ts
│       ├── project.json
│       └── tsconfig.json
│
├── shared-libs/
│   ├── api-lib/
│   │   └── src/
│   │       └── lib/
│   │           ├── clients/           # API client and operation executor
│   │           ├── factories/         # Request payload factories
│   │           ├── schemas/            # Zod schemas
│   │           ├── services/           # Domain service classes
│   │           └── api-endpoints.ts    # Centralized endpoints
│   │
│   ├── ui-lib/
│   │   └── src/
│   │       └── lib/
│   │           └── pages/              # Page Object classes
│   │
│   └── core/
│       └── src/
│           └── lib/
│               ├── data/               # TestDataContext
│               └── utils/              # Dynamic data and utilities
│
├── config/
│   └── environment.ts                  # Environment loader and validation
│
├── .env.qa                             # QA environment configuration
├── nx.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

Generated reports and test artifacts are stored separately inside their respective test application directories.

---

## 🧠 Design Patterns & Engineering Highlights

### 1. Zod-Validated API Operations

API requests are executed through `ApiOperationExecutor`.

Responsibilities include:

- Validating outgoing request payloads.
- Validating successful responses.
- Validating error responses.
- Providing runtime validation and TypeScript type safety.

Example:

```typescript
const result = await this.apiExecutor.execute({
  method: "POST",
  endpoint: API_ENDPOINTS.AUTH.ADMIN_LOGIN,
  payload,
  requestSchema: adminLoginRequestSchema,
  successSchema: adminLoginResponseSchema,
  errorSchema: adminLoginErrorResponseSchema,
});
```

### 2. Scenario State Management — TestDataContext

`TestDataContext` provides a mechanism to share data between steps within the same test.

Example:

```typescript
// Step A
testDataContext.set("username", username);

// Step B
const username = testDataContext.get<string>("username");
```

The context is created for each test and cleared during fixture teardown to prevent data leakage between tests.

### 3. Layered Fixture Composition

Fixtures are composed using Playwright's `test.extend()`.

- `api.fixture.ts`: Provides API client, operation executor, and API services.
- `pages.fixture.ts`: Provides UI Page Objects.
- `hybrid.fixture.ts`: Combines API and UI capabilities for hybrid scenarios.

### 4. Test Isolation

The framework uses test-scoped fixtures and scenario-level data management.

Isolation principles:

- Avoid shared mutable test data.
- Generate unique test data for independent scenarios.
- Create a fresh `TestDataContext` for each test.
- Clear scenario data during teardown.
- Avoid dependencies between parallel test executions.

---

## 🛠 Prerequisites

Install the following tools:

- **Node.js:** v20.x or v22.x (LTS recommended)
- **pnpm:** v10.x
- **Git**
- **Playwright browsers:** Chromium and any other browser required by the configured projects.

Enable pnpm through Corepack if required:

```bash
corepack enable
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd sdet_banking_automation
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Install Playwright browsers

```bash
pnpm exec playwright install --with-deps
```

### 4. Configure environment variables

Create the required environment file, such as `.env.qa`.

Refer to [Environment Configuration](#-environment-configuration).

### 5. Verify TypeScript compilation

```bash
pnpm typecheck:api
pnpm typecheck:ui
```

---

## 🌐 Environment Configuration

The framework selects its environment through the `TEST_ENV` variable.

Supported environments:

- `dev`
- `qa`
- `stage`
- `uat`

By default, the framework uses the QA environment.

### Environment file example

```ini
DEMO_EMAIL=your-test-email@example.com
DEMO_PASSWORD=your-test-password
BASE_URL=https://your-banking-application-url/
```

Use the appropriate environment file and actual application credentials for your setup.

### Switch environments

```bash
TEST_ENV=stage pnpm test:api
```

### Security considerations

- Do not commit actual credentials or secrets to Git.
- Keep sensitive environment files out of version control.
- Use GitHub Secrets when configuring CI/CD.
- Avoid printing passwords, tokens, or sensitive personal information in logs.

---

## 🧪 Running Tests

### API Tests

Run all API BDD scenarios:

```bash
pnpm test:api
```

Run API tests against another environment:

```bash
TEST_ENV=dev pnpm test:api
```

Run a specific tag:

```bash
pnpm exec nx run api-tests:test --grep="@apiOnboarding"
```

### UI Tests

Run all UI BDD scenarios:

```bash
pnpm test:ui
```

Run UI tests against another environment:

```bash
TEST_ENV=stage pnpm test:ui
```

Run a specific tag:

```bash
pnpm exec nx run ui-tests:test --grep="@uiOnboarding"
```

### Type Checking

API:

```bash
pnpm typecheck:api
```

UI:

```bash
pnpm typecheck:ui
```

---

## ⚙️ Playwright Execution Configuration

The framework supports configurable worker count, headless/headed execution, retries, and failure diagnostics.

### 1. Configure worker count

By default:

- Local execution uses Playwright's default worker configuration.
- CI execution uses 4 workers.
- A custom worker count can be supplied through `WORKERS`.

Example:

```bash
WORKERS=2 pnpm test:api
```

For UI:

```bash
WORKERS=2 pnpm test:ui
```

The framework validates the worker value and expects a positive integer.

Invalid example:

```bash
WORKERS=abc pnpm test:api
```

This produces a descriptive configuration error.

### 2. Headless and headed execution

Headless execution is the default.

Run UI tests with a visible browser:

```bash
HEADLESS=false pnpm test:ui
```

Run in headless mode explicitly:

```bash
HEADLESS=true pnpm test:ui
```

### 3. CI execution behavior

When `CI` is set:

- Worker count defaults to 4 unless overridden.
- Retries are enabled.
- Focused tests using `test.only` are disallowed.

Local execution uses zero retries by default.

### 4. Parallel execution

The framework uses:

```typescript
fullyParallel: true;
```

This enables Playwright to distribute tests across available workers.

Tests should remain independent and should not rely on execution order or shared mutable state.

---

## 📊 Test Reports & Artifacts

The framework generates separate reports and test artifacts for API and UI test executions.

### HTML Reports

Open the API HTML report:

```bash
pnpm exec playwright show-report apps/api-tests/playwright-report
```

Open the UI HTML report:

```bash
pnpm exec playwright show-report apps/ui-tests/playwright-report
```

### JUnit Reports

JUnit XML reports are generated for CI/CD integration.

| Suite | Report path                        |
| ----- | ---------------------------------- |
| API   | `apps/api-tests/reports/junit.xml` |
| UI    | `apps/ui-tests/reports/junit.xml`  |

### Test Artifacts

The framework captures diagnostic artifacts based on the configured Playwright execution strategy.

| Artifact     | API                                      | UI                      |
| ------------ | ---------------------------------------- | ----------------------- |
| HTML report  | Yes                                      | Yes                     |
| JUnit report | Yes                                      | Yes                     |
| Screenshot   | Not configured as a default API artifact | Only on failure         |
| Video        | Not configured as a default API artifact | Retained on failure     |
| Trace        | Retained on failure                      | Captured on first retry |

### View traces

Use Playwright Trace Viewer:

```bash
pnpm exec playwright show-trace <path-to-trace.zip>
```

### Test-results Cleanup

Previous test artifacts and reports are cleaned before the corresponding suite executes.

- API cleanup affects API test artifacts and reports.
- UI cleanup affects UI test artifacts and reports.
- Running one suite does not remove the other suite's reports.

This keeps reports isolated and prevents stale results from being mixed with a new execution.

---

## 🧭 Adding New Tests

### 1. Adding an API Service & Feature

1. **Define schema:** Create a Zod schema under `shared-libs/api-lib/src/lib/schemas/`.
2. **Add endpoint:** Update `shared-libs/api-lib/src/lib/api-endpoints.ts`.
3. **Create payload factory:** Add a request payload factory under `shared-libs/api-lib/src/lib/factories/`.
4. **Create service class:** Implement the domain service under `shared-libs/api-lib/src/lib/services/`.
5. **Register fixture:** Inject the service into `apps/api-tests/src/fixtures/api.fixture.ts`.
6. **Write feature:** Add a `.feature` file under `apps/api-tests/src/features/`.
7. **Implement steps:** Add step definitions under `apps/api-tests/src/steps/`.

### 2. Adding a Page Object & UI Feature

1. **Create Page Object:** Add the page class under `shared-libs/ui-lib/src/lib/pages/`.
2. **Export from library:** Re-export the class from `shared-libs/ui-lib/src/index.ts`.
3. **Register page fixture:** Add the page to `apps/ui-tests/src/fixtures/pages.fixture.ts`.
4. **Write feature:** Add a `.feature` file under `apps/ui-tests/src/features/`.
5. **Implement steps:** Add corresponding step definitions under `apps/ui-tests/src/steps/`.

---

## ❓ Troubleshooting & FAQ

### 1. Playwright-BDD step undefined or generated files missing

Run BDD generation manually from the relevant test application directory:

```bash
cd apps/api-tests
pnpm exec bddgen
```

For UI:

```bash
cd apps/ui-tests
pnpm exec bddgen
```

### 2. TypeScript cannot resolve shared library aliases

Verify the path mappings in `tsconfig.base.json`.

The framework uses aliases such as:

- `@config/*`
- `@api-lib`
- `@ui-lib`
- `@core`

### 3. Browser does not open during UI execution

Headless mode is enabled by default.

Run:

```bash
HEADLESS=false pnpm test:ui
```

### 4. Invalid WORKERS configuration

Ensure that `WORKERS` is a positive integer.

Example:

```bash
WORKERS=2 pnpm test:api
```

### 5. Nx daemon socket permission warning

In restricted environments, try:

```bash
NX_DAEMON=false pnpm test:api
```

### 6. Report not found

Run the relevant test suite first to generate its report, then open the corresponding report directory.

For API:

```bash
pnpm test:api
pnpm exec playwright show-report apps/api-tests/playwright-report
```

For UI:

```bash
pnpm test:ui
pnpm exec playwright show-report apps/ui-tests/playwright-report
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
