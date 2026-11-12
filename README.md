# 🏦 Banking Automation Test Suite (SDET)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.4x-green?logo=playwright)](https://playwright.dev/)
[![Playwright BDD](https://img.shields.io/badge/Playwright--BDD-Cucumber-brightgreen?logo=cucumber)](https://vitalets.github.io/playwright-bdd/)
[![Nx Monorepo](https://img.shields.io/badge/Nx-Workspace-blueviolet?logo=nx)](https://nx.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-orange?logo=pnpm)](https://pnpm.io/)
[![Zod](https://img.shields.io/badge/Zod-Schema--Validation-blue?logo=zod)](https://zod.dev/)

An enterprise-grade SDET test automation framework built for a digital banking application. Designed as an **Nx monorepo** with **pnpm workspaces**, this project combines **Playwright**, **Playwright-BDD (Cucumber/Gherkin)**, **Zod schema validation**, and **TypeScript** to deliver robust, scalable, and type-safe API, UI, and hybrid end-to-end tests.

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
- [Test Reports & Artifacts](#-test-reports--artifacts)
- [Adding New Tests (Workflow Guide)](#-adding-new-tests-workflow-guide)
  - [Adding an API Service & Feature](#1-adding-an-api-service--feature)
  - [Adding a Page Object & UI Feature](#2-adding-a-page-object--ui-feature)
- [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 🏛 Architecture Overview

The repository adopts a modular **Clean Architecture** powered by an **Nx Monorepo**:

```
                              ┌──────────────────────────────────────────────┐
                              │            Playwright Test Runner            │
                              └──────────────────────┬───────────────────────┘
                                                     │
                             ┌───────────────────────┴───────────────────────┐
                             │               Hybrid Fixtures                 │
                             │       (apiTest, pageTest, hybridTest)         │
                             └──────────┬─────────────────────────┬──────────┘
                                        │                         │
                 ┌──────────────────────▼───────┐ ┌───────────────▼──────────────┐
                 │        apps/api-tests        │ │        apps/ui-tests         │
                 │   - Feature files (.feature) │ │   - Feature files (.feature) │
                 │   - Step definitions (.ts)   │ │   - Step definitions (.ts)   │
                 └──────────────┬───────────────┘ └───────────────┬──────────────┘
                                │                                 │
   ┌────────────────────────────┼─────────────────────────────────┼────────────────────────────┐
   │                            ▼                                 ▼                            │
   │  ┌───────────────────────────────────┐             ┌───────────────────────────────────┐  │
   │  │       @api-lib (Shared Lib)       │             │       @ui-lib (Shared Lib)        │  │
   │  │  - ApiClient (HTTP Engine)        │             │  - Page Objects (POM)             │  │
   │  │  - ApiOperationExecutor (Zod)     │             │  - Resilient Locators             │  │
   │  │  - Domain Services & Endpoints    │             │  - User Flow Actions              │  │
   │  │  - Dynamic Payloads & Factories   │             └─────────────────┬─────────────────┘  │
   │  └─────────────────┬─────────────────┘                               │                    │
   │                    │                                                 │                    │
   │                    └───────────────────────┬─────────────────────────┘                    │
   │                                            ▼                                              │
   │                           ┌──────────────────────────────────┐                            │
   │                           │       @core (Shared Lib)         │                            │
   │                           │  - TestDataContext (State Bus)  │                            │
   │                           │  - DynamicDataHelper (Faker.js)  │                            │
   │                           │  - Sensitive Data Masking        │                            │
   │                           │  - Reusable Constants            │                            │
   │                           └────────────────┬─────────────────┘                            │
   │                                            │                                              │
   │                                            ▼                                              │
   │                           ┌──────────────────────────────────┐                            │
   │                           │      @config (Environment)       │                            │
   │                           │  - Validated by Zod (.env.<env>) │                            │
   │                           └──────────────────────────────────┘                            │
   └───────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

- **BDD with Gherkin**: Human-readable test specifications written in `.feature` files, compiled at build time by `bddgen` (via `playwright-bdd`).
- **Hybrid Testing Capability**: UI tests can seamlessly leverage API service steps (e.g., seeding users, retrieving tokens, background setup) within the same scenario to minimize execution time.
- **Contract-Safe API Automation**: Every API request and response is validated at runtime using **Zod** schemas, catching breaking backend contracts immediately.
- **Page Object Model (POM)**: Fully typed, encapsulated UI page objects with resilient locators (`getByRole`, semantic selectors) avoiding brittle XPath/CSS selectors.
- **Dynamic Data Generation**: Synthetic, realistic test data powered by `@faker-js/faker` via `DynamicDataHelper`.
- **Scenario State Management**: Built-in `TestDataContext` bus to share context between Gherkin steps without dirty global variables.
- **Data Privacy & Log Masking**: Automatically masks sensitive fields (passwords, tokens, PII) in test execution logs.
- **Multi-Environment Support**: Clean switching between `dev`, `qa`, `stage`, and `uat` environments with schema validation via `config/environment.ts`.
- **Parallel & Resilient Execution**: Full parallel execution, retry support, video recording on failure, automatic trace files, and slow-motion support for debugging.

---

## 📂 Repository Structure

```
.
├── apps/
│   ├── api-tests/                     # API Test Application
│   │   ├── src/
│   │   │   ├── features/              # Gherkin Feature files (.feature)
│   │   │   │   ├── admin-login.feature
│   │   │   │   ├── getall-customers.feature
│   │   │   │   └── onboarding.feature
│   │   │   ├── fixtures/              # Playwright test fixtures & dependency injection
│   │   │   │   ├── api.fixture.ts     # API client & service fixtures
│   │   │   │   └── hybrid.fixture.ts  # Hybrid test runner entry point
│   │   │   └── steps/                 # BDD Step definitions (.steps.ts)
│   │   ├── playwright.config.ts       # API test runner configuration
│   │   ├── project.json               # Nx project configuration
│   │   └── tsconfig.json
│   │
│   └── ui-tests/                      # Web UI Test Application
│       ├── src/
│       │   ├── features/              # UI Gherkin Feature files
│       │   │   └── onboarding.feature
│       │   ├── fixtures/              # UI page object fixtures
│       │   │   └── pages.fixture.ts
│       │   └── steps/                 # UI step definitions
│       │       └── onboarding.steps.ts
│       ├── playwright.config.ts       # UI test runner configuration (Chrome, video, traces)
│       ├── project.json               # Nx project configuration
│       └── tsconfig.json
│
├── shared-libs/
│   ├── api-lib/                       # Reusable API Client Library (@api-lib)
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── clients/           # ApiClient (HTTP) & ApiOperationExecutor (Zod)
│   │       │   ├── factories/         # Dynamic request payload factories
│   │       │   ├── schemas/           # Zod request & response schemas
│   │       │   ├── services/          # Domain services (AdminLogin, Customer, Onboarding)
│   │       │   └── api-endpoints.ts   # Centralized endpoint paths catalog
│   │       └── index.ts               # Barrel exports
│   │
│   ├── ui-lib/                        # Reusable Page Object Model Library (@ui-lib)
│   │   └── src/
│   │       ├── lib/
│   │       │   └── pages/             # Page Object classes (Landing, Register, Account, etc.)
│   │       └── index.ts               # Barrel exports
│   │
│   └── core/                          # Cross-Cutting Core Utilities (@core)
│       └── src/
│           ├── lib/
│           │   ├── data/              # TestDataContext (scenario state bus)
│           │   └── utils/             # DynamicDataHelper, Constant, maskSensitiveData
│           └── index.ts
│
├── config/
│   └── environment.ts                 # Validated environment loader (Zod + dotenv)
├── .env.qa                            # QA environment configuration
├── nx.json                            # Nx workspace configuration
├── pnpm-workspace.yaml                # pnpm workspace definition
├── tsconfig.base.json                 # Base TypeScript config & path mappings
└── package.json                       # Root dependencies and scripts
```

---

## 🧠 Design Patterns & Engineering Highlights

### 1. Zod-Validated API Operations (`ApiOperationExecutor`)
Rather than making unverified HTTP calls, each API invocation routes through `ApiOperationExecutor`, which enforces:
- Validating the outgoing request payload against the request schema before dispatching.
- Parsing and validating the response against `successSchema` or `errorSchema`.
- Providing full compile-time and runtime type safety.

```ts
const result = await this.apiExecutor.execute({
  method: "POST",
  endpoint: API_ENDPOINTS.AUTH.ADMIN_LOGIN,
  payload,
  requestSchema: adminLoginRequestSchema,
  successSchema: adminLoginResponseSchema,
  errorSchema: adminLoginErrorResponseSchema,
});
```

### 2. Scenario State Bus (`TestDataContext`)
Eliminates test interdependence and dirty global state. Steps pass data (such as generated emails, customer IDs, tokens) downstream within the scenario lifecycle and automatically clean up after execution:

```ts
// In Step A:
testDataContext.set("username", username);

// In Step B:
const username = testDataContext.get<string>("username");
```

### 3. Layered Fixture Composition (`test.extend`)
Fixtures are decoupled across layers:
- `api.fixture.ts`: Manages `apiClient`, `apiOperationExecutor`, and API service instances.
- `pages.fixture.ts`: Extends `apiTest` to provide instantiated UI Page Objects with active `page`.
- `hybrid.fixture.ts`: Aggregates fixtures into an unified runner for test steps.

---

## 🛠 Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **pnpm**: `v10.x` (`corepack enable pnpm` or `npm install -g pnpm`)
- **Browsers**: Supported via Playwright (`chromium`, `firefox`, `webkit`)

---

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd sdet_banking_automation
   ```

2. **Install project dependencies**:
   ```bash
   pnpm install
   ```

3. **Install Playwright browser binaries and system dependencies**:
   ```bash
   pnpm exec playwright install --with-deps
   ```

4. **Verify type definitions across workspaces**:
   ```bash
   pnpm typecheck:api
   pnpm typecheck:ui
   ```

---

## 🌐 Environment Configuration

The framework dynamically loads environment variables based on the `TEST_ENV` variable.

1. By default, the tests use the `qa` environment (`.env.qa`).
2. Supported environments: `dev`, `qa`, `stage`, `uat`.

### Environment File Template (`.env.qa`)
```ini
DEMO_EMAIL=admin@bank.com
DEMO_PASSWORD=Admin@123
BASE_URL=https://banking-app-nine-pi.vercel.app/
```

To run against a different environment, specify `TEST_ENV`:
```bash
TEST_ENV=stage pnpm test:api
```

---

## 🧪 Running Tests

### API Tests
Executes the BDD code generator (`bddgen`) followed by the Playwright API test suite:
```bash
# Run all API BDD scenarios
pnpm test:api

# Run with custom environment
TEST_ENV=dev pnpm test:api

# Run filtered by Cucumber Tag (e.g. @apiOnboarding)
pnpm exec nx run api-tests:test --grep="@apiOnboarding"
```

### UI Tests
Executes the UI test suite in headless mode (or headed based on settings):
```bash
# Run all UI BDD scenarios
pnpm test:ui

# Run filtered by tag (e.g. @uiOnboarding)
pnpm exec nx run ui-tests:test --grep="@uiOnboarding"

# Run UI tests with UI Mode (interactive debugger)
pnpm exec nx run ui-tests:test --ui
```

### Type Checking
Validate TypeScript compilation without emitting output:
```bash
# Typecheck API suite
pnpm typecheck:api

# Typecheck UI suite
pnpm typecheck:ui
```

---

## 📊 Test Reports & Artifacts

After running tests, Playwright automatically generates detailed test execution reports:

### Open HTML Report
```bash
pnpm exec playwright show-report apps/ui-tests/playwright-report
```

### Artifacts Captured on Failure
- **Screenshots**: Automatically taken upon step or assertion failures (`screenshot: "only-on-failure"`).
- **Videos**: Recorded and retained when scenarios fail (`video: "retain-on-failure"`).
- **Trace Viewer**: Deep inspection traces recorded for thorough debugging (`trace: "on"`):
  ```bash
  pnpm exec playwright show-trace test-results/.../trace.zip
  ```

---

## 🧭 Adding New Tests (Workflow Guide)

### 1. Adding an API Service & Feature

1. **Define Schema**: Create `shared-libs/api-lib/src/lib/schemas/<domain>.schema.ts` with Zod validation.
2. **Add Endpoint**: Update `shared-libs/api-lib/src/lib/api-endpoints.ts`.
3. **Create Payload Factory**: Create payload helper in `shared-libs/api-lib/src/lib/factories/`.
4. **Create Service Class**: Implement methods in `shared-libs/api-lib/src/lib/services/<domain>.service.ts`.
5. **Register Fixture**: Inject the service into `apps/api-tests/src/fixtures/api.fixture.ts`.
6. **Write Feature & Steps**:
   - Add `.feature` file in `apps/api-tests/src/features/`.
   - Add `.steps.ts` in `apps/api-tests/src/steps/`.

### 2. Adding a Page Object & UI Feature

1. **Create Page Object**: Add `shared-libs/ui-lib/src/lib/pages/<page-name>.page.ts` using Playwright Locators.
2. **Export from Library**: Re-export from `shared-libs/ui-lib/src/index.ts`.
3. **Register Page Fixture**: Add the page into `apps/ui-tests/src/fixtures/pages.fixture.ts`.
4. **Write Feature & Steps**:
   - Add `.feature` in `apps/ui-tests/src/features/`.
   - Implement corresponding steps in `apps/ui-tests/src/steps/`.

---

## ❓ Troubleshooting & FAQ

<details>
<summary><b>1. Playwright-BDD "Step undefined" or missing generated files</b></summary>
<br>

Run `bddgen` manually in the test application root to regenerate the glue code:
```bash
cd apps/api-tests && pnpm exec bddgen
# or for UI:
cd apps/ui-tests && pnpm exec bddgen
```
</details>

<details>
<summary><b>2. TypeScript cannot resolve <code>@api-lib</code> or <code>@ui-lib</code></b></summary>
<br>

Ensure root path mappings in `tsconfig.base.json` are intact. The project uses:
- `@config/*` → `./config/*`
- `@api-lib` → `./shared-libs/api-lib/src/index.ts`
- `@ui-lib` → `./shared-libs/ui-lib/src/index.ts`
- `@core` → `./shared-libs/core/src/index.ts`
</details>

<details>
<summary><b>3. Nx daemon socket permission warning in sandboxes</b></summary>
<br>

If running in restricted sandbox environments or CI containers, prefix with `NX_DAEMON=false`:
```bash
NX_DAEMON=false pnpm test:api
```
</details>

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

