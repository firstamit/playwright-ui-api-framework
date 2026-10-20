
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // =====================================================
  // 1. TEST DISCOVERY
  // =====================================================

  testDir: './tests',

  // PURPOSE: Directory containing test files.
  //
  // Examples:
  // './tests'
  // './e2e'
  // './automation/tests'
  //
  // DEFAULT: Directory containing playwright.config.ts.


  testMatch: '**/*.spec.ts',

  // PURPOSE: Select test files.
  //
  // Accepts:
  // - Glob string
  // - Regular expression
  // - Array of patterns
  //
  // Examples:
  // '**/*.spec.ts'
  // '**/*.test.ts'
  // ['**/*.spec.ts', '**/*.test.ts']
  //
  // DEFAULT: Playwright's built-in test-file patterns,
  // including .spec and .test files in supported languages.
  //
  // Project-specific testMatch can narrow the selection.


  // =====================================================
  // 2. PARALLEL EXECUTION
  // =====================================================

  fullyParallel: true,

  // PURPOSE: Allow tests within one file to run in parallel.
  //
  // true  → Tests within a file can run concurrently.
  // false → Tests within a file run sequentially by default.
  //
  // Different test files can run in parallel in both cases.
  //
  // DEFAULT: false


  workers: 4,

  // PURPOSE: Maximum number of worker processes.
  //
  // Examples:
  // 1     → One worker.
  // 2     → Up to two workers.
  // 4     → Up to four workers.
  // '50%' → Half the logical CPU cores.
  // '75%' → 75% of logical CPU cores.
  //
  // DEFAULT:
  // Local machine → '50%'
  // CI environment → 1
  //
  // This limit applies across the selected projects.


  // =====================================================
  // 3. RETRIES
  // =====================================================

  retries: 3,

  // PURPOSE: Retry tests that fail.
  //
  // 0 → No retry.
  // 1 → Initial attempt + up to 1 retry.
  // 2 → Initial attempt + up to 2 retries.
  // 3 → Initial attempt + up to 3 retries.
  //
  // DEFAULT: 0
  //
  // With retries: 3:
  // Initial attempt → Retry 1 → Retry 2 → Retry 3
  //
  // Playwright stops retrying when the test passes.


  // =====================================================
  // 4. TEST TIMEOUT
  // =====================================================

  timeout: 30000,

  // PURPOSE: Maximum duration of one test attempt.
  //
  // Units: milliseconds.
  //
  // 10000 → 10 seconds.
  // 30000 → 30 seconds.
  // 60000 → 60 seconds.
  // 0     → Disable test timeout.
  //
  // DEFAULT: 30000 ms


  // =====================================================
  // 5. ASSERTION TIMEOUT
  // =====================================================

  expect: {

    timeout: 5000,

    // PURPOSE: Timeout for retrying assertions.
    //
    // Example:
    // await expect(locator).toBeVisible();
    //
    // 1000  → 1 second.
    // 5000  → 5 seconds.
    // 10000 → 10 seconds.
    //
    // DEFAULT: 5000 ms
    //
    // This is separate from the overall test timeout.

  },


  // =====================================================
  // 6. REPORTERS
  // =====================================================

  reporter: [

    ['list'],

    // Detailed results in the terminal.


    ['html', { open: 'never' }],

    // HTML report options:
    //
    // 'always'     → Open automatically.
    // 'never'      → Do not open automatically.
    // 'on-failure' → Open when tests fail.


    ['junit', {
      outputFile: 'results/junit.xml'
    }]

    // Generate JUnit XML.
    //
    // Useful for:
    // - TeamCity
    // - ALM Octane
    // - Other CI systems

  ],

  // COMMON REPORTER TYPES:
  //
  // 'list'   → Detailed terminal output.
  // 'line'   → Compact terminal output.
  // 'dot'    → One character per test result.
  // 'html'   → Interactive HTML report.
  // 'json'   → JSON report.
  // 'junit'  → JUnit XML report.
  // 'blob'   → Blob report for merging test runs.
  // 'github' → GitHub Actions annotations.
  // 'null'   → No report output.
  //
  // DEFAULT:
  // Playwright selects its terminal reporter based
  // on the execution environment.
  //
  // Multiple reporters can be enabled simultaneously.


  // =====================================================
  // 7. GLOBAL USE SETTINGS
  // =====================================================
  //
  // These settings apply to every project unless
  // that project overrides the setting.

  use: {

    // -------------------------------------------------
    // HEADLESS
    // -------------------------------------------------

    headless: true,

    // true  → Browser runs without a visible window.
    // false → Browser window is visible.
    //
    // DEFAULT: true
    //
    // Useful in CI/CD environments.
    // Also the default for local Playwright Test runs.


    // -------------------------------------------------
    // ACTION TIMEOUT
    // -------------------------------------------------

    actionTimeout: 10000,

    // PURPOSE: Separate timeout for actions:
    //
    // click()
    // fill()
    // check()
    // tap()
    //
    // 0     → No separate action timeout.
    // 5000  → 5 seconds.
    // 10000 → 10 seconds.
    // 30000 → 30 seconds.
    //
    // DEFAULT: 0
    //
    // IMPORTANT:
    // 0 does NOT mean "wait zero milliseconds".
    //
    // It means there is no independent action timeout.
    //
    // Playwright can still auto-wait for an element.
    // The overall test timeout still applies.


    // -------------------------------------------------
    // NAVIGATION TIMEOUT
    // -------------------------------------------------

    navigationTimeout: 30000,

    // PURPOSE: Separate timeout for navigation operations.
    //
    // 0     → No separate navigation timeout.
    // 10000 → 10 seconds.
    // 30000 → 30 seconds.
    // 60000 → 60 seconds.
    //
    // DEFAULT: 0
    //
    // Other applicable limits can still apply,
    // including the overall test timeout.


    // -------------------------------------------------
    // TRACE
    // -------------------------------------------------

    trace: 'on-first-retry',

    // PURPOSE:
    // Record detailed execution information.
    //
    // DEFAULT: 'off'
    //
    // POSSIBLE VALUES:
    //
    // 'off'
    //   No automatic trace.
    //
    // 'on'
    //   Record and retain every attempt.
    //   More storage and recording overhead.
    //
    // 'retain-on-failure'
    //   Record attempts and retain failed attempts.
    //   Potentially slower because recording occurs
    //   even on attempts that eventually pass.
    //
    // 'on-first-retry'
    //   Record only Retry 1.
    //   Lower overhead; useful for CI debugging.
    //
    // 'on-all-retries'
    //   Record every retry, but not the initial attempt.
    //   Three executed retries can produce three ZIPs.
    //
    // 'retain-on-first-failure'
    //   Retain the first failing attempt's trace.
    //
    // EXAMPLE WITH retries: 3
    //
    // Attempt        on-first-retry   on-all-retries
    // Initial        No               No
    // Retry 1        Yes              Yes
    // Retry 2        No               Yes
    // Retry 3        No               Yes
    //
    // A trace ZIP can contain:
    // - Action timeline
    // - DOM snapshots
    // - Screenshots
    // - Network information
    // - Console information
    //
    // Open a trace using:
    // npx playwright show-trace path/to/trace.zip


    // -------------------------------------------------
    // SCREENSHOT
    // -------------------------------------------------

    screenshot: 'only-on-failure',

    // PURPOSE: Automatically capture screenshots.
    //
    // DEFAULT: 'off'
    //
    // POSSIBLE VALUES:
    //
    // 'off'
    //   No automatic screenshots.
    //
    // 'on'
    //   Capture a screenshot at the end of every test.
    //
    // 'only-on-failure'
    //   Capture when a test fails.
    //
    // IMPORTANT:
    // screenshot: 'on' does NOT capture every step.
    //
    // Screenshot → Static image, usually PNG.
    // Trace      → ZIP with interactive timeline.
    //
    // Screenshots can appear as attachments
    // in the HTML report.


    // -------------------------------------------------
    // VIDEO
    // -------------------------------------------------

    video: 'retain-on-failure',

    // PURPOSE: Record browser activity as video.
    //
    // DEFAULT: 'off'
    //
    // POSSIBLE VALUES:
    //
    // 'off'
    //   No automatic video.
    //
    // 'on'
    //   Record and retain every test video.
    //
    // 'retain-on-failure'
    //   Retain videos of failed tests.
    //
    // 'on-first-retry'
    //   Record the first retry.
    //
    // Video shows the visual execution.
    // Trace additionally provides DOM and network data.


    // -------------------------------------------------
    // HTTPS CERTIFICATE ERRORS
    // -------------------------------------------------

    ignoreHTTPSErrors: false,

    // DEFAULT: false
    //
    // false → Enforce certificate validation.
    // true  → Ignore HTTPS certificate errors.
    //
    // REAL-LIFE EXAMPLE:
    //
    // An internal bank test environment uses
    // a self-signed HTTPS certificate that the
    // test machine does not trust.
    //
    // ignoreHTTPSErrors: true can allow navigation.
    //
    // Generally keep false for production-like
    // security testing.


    // -------------------------------------------------
    // LOCALE
    // -------------------------------------------------

    locale: 'en-US',

    // PURPOSE: Emulate browser locale.
    //
    // Examples:
    //
    // 'en-US' → English (United States).
    // 'en-GB' → English (United Kingdom).
    // 'de-DE' → German (Germany).
    // 'hi-IN' → Hindi (India).
    //
    // DEFAULT:
    // No explicit locale override.
    // Browser/environment behavior applies.
    //
    // Other supported locale identifiers are possible.


    // -------------------------------------------------
    // TIMEZONE
    // -------------------------------------------------

    timezoneId: 'Europe/Berlin',

    // PURPOSE: Emulate browser timezone.
    //
    // Examples:
    //
    // 'Europe/Berlin'
    // 'Europe/London'
    // 'Asia/Kolkata'
    // 'America/New_York'
    //
    // DEFAULT:
    // System/environment timezone.
    //
    // This affects browser-side date/time behavior.
    // It does not change the Node.js test runner timezone.

  },


  // =====================================================
  // 8. PROJECTS
  // =====================================================
  //
  // A project is a named execution configuration.
  //
  // Projects can represent:
  // - Different browsers
  // - Different devices
  // - Different applications
  // - Different environments
  // - Different test groups
  //
  // DEFAULT:
  // Without projects, Playwright runs tests using
  // its default configuration.

  projects: [

    // =================================================
    // PROJECT 1: DESKTOP GOOGLE CHROME
    // =================================================

    {

      name: 'desktop-chrome',

      // Arbitrary unique name.
      //
      // Examples:
      // 'desktop-chrome'
      // 'desktop-firefox'
      // 'desktop-webkit'
      //
      // The project name does NOT select the browser.


      use: {

        browserName: 'chromium',

        // POSSIBLE VALUES:
        //
        // 'chromium'
        // 'firefox'
        // 'webkit'
        //
        // DEFAULT: 'chromium'


        channel: 'chrome',

        // PURPOSE: Select a browser release channel.
        //
        // Examples:
        //
        // 'chrome'
        // 'chrome-beta'
        // 'chrome-dev'
        // 'chrome-canary'
        // 'msedge'
        // 'msedge-beta'
        // 'msedge-dev'
        // 'msedge-canary'
        // 'chromium'
        //
        // DEFAULT: No channel explicitly selected.
        //
        // 'chrome' runs installed Google Chrome.
        //
        // Without channel, Playwright uses its
        // version-matched browser installation.
        //
        // The selected branded browser must exist.


        viewport: {
          width: 1920,
          height: 1080
        },

        // PURPOSE: Set browser viewport size.
        //
        // Examples:
        // 1920 x 1080
        // 1366 x 768
        // 1440 x 900
        //
        // viewport: null → Disable fixed viewport.
        //
        // DEFAULT: 1280 x 720


        isMobile: false,

        // true  → Enable mobile viewport behavior.
        // false → Desktop viewport behavior.
        //
        // DEFAULT: false
        //
        // Firefox does not support isMobile: true.


        hasTouch: false,

        // true  → Enable touchscreen emulation.
        // false → Disable touchscreen emulation.
        //
        // DEFAULT: false

      }

      // No project-specific testMatch here.
      //
      // Therefore this project can execute
      // all matching tests from the test directory.

    },


    // =================================================
    // PROJECT 2: MOBILE IPHONE
    // =================================================

    {

      name: 'mobile-iphone',

      use: {

        ...devices['iPhone 13'],

        // =============================================
        // AVAILABLE DEVICE PROFILE EXAMPLES
        // =============================================
        //
        // devices['iPhone 13']
        // devices['iPhone 13 Pro']
        // devices['Pixel 5']
        // devices['Pixel 7']
        //
        // Additional iPhone, iPad, Android phone
        // and tablet profiles depend on the
        // installed Playwright version.
        //
        // =============================================
        // DEFAULT BROWSER ENGINE BY DEVICE
        // =============================================
        //
        // iPhone 13      → WebKit
        // iPhone 13 Pro  → WebKit
        // iPad profiles  → WebKit
        //
        // Pixel 5        → Chromium
        // Pixel 7        → Chromium
        //
        // IMPORTANT:
        //
        // You do NOT need to write:
        //
        // browserName: 'webkit'
        //
        // The iPhone 13 descriptor already specifies
        // WebKit as its default browser type.
        //
        // =============================================
        // WHAT DOES A DEVICE DESCRIPTOR CONTAIN?
        // =============================================
        //
        // defaultBrowserType
        //   → Preferred browser engine.
        //
        // viewport
        //   → Device viewport dimensions.
        //
        // userAgent
        //   → Mobile browser user-agent string.
        //
        // deviceScaleFactor
        //   → Device pixel ratio.
        //
        // isMobile
        //   → Mobile viewport behavior.
        //
        // hasTouch
        //   → Touchscreen support.
        //
        // =============================================
        // BROWSER OVERRIDE
        // =============================================
        //
        // You can override the browser after
        // spreading the device descriptor:
        //
        // browserName: 'chromium'
        //
        // But this may not accurately reproduce
        // the intended real-device combination.
        //
        // =============================================
        // CLICK VS TAP
        // =============================================
        //
        // locator.click()
        //   → Mouse-style click.
        //
        // locator.tap()
        //   → Touchscreen tap.
        //
        // The iPhone profile enables hasTouch: true.
        //
        // A tap usually also activates a normal
        // click handler, but additionally generates
        // touch events.
        //
        // =============================================
        // IMPORTANT LIMITATION
        // =============================================
        //
        // This is mobile browser emulation.
        // It does NOT launch a physical iPhone.

      }

      // No testMatch:
      // This project can run both portals' tests.

    },


    // =================================================
    // PROJECT 3: PORTAL A
    // =================================================

    {

      name: 'portal-a',

      testMatch: '**/portal-a/**/*.spec.ts',

      // PURPOSE: Select only Portal A test files.
      //
      // Accepted forms:
      //
      // Glob string:
      // '**/portal-a/**/*.spec.ts'
      //
      // Regular expression:
      // /portal-a\/.*\.spec\.ts/
      //
      // Array:
      // [
      //   '**/portal-a/**/*.spec.ts',
      //   '**/shared/**/*.spec.ts'
      // ]
      //
      // DEFAULT:
      // No project-specific restriction.
      // Global test-file matching applies.


      use: {

        browserName: 'chromium',

        // 'chromium' | 'firefox' | 'webkit'
        // DEFAULT: 'chromium'


        baseURL: 'https://portal-a.example.com',

        // PURPOSE: Base URL for relative navigation.
        //
        // DEFAULT: undefined (no base URL).
        //
        // Example:
        //
        // await page.goto('/login');
        //
        // Resolves against the baseURL.
        //
        // Replace the example URL with your real URL.


        viewport: {
          width: 1366,
          height: 768
        },

        // DEFAULT: 1280 x 720
        // unless another setting overrides it.


        trace: 'on-first-retry',

        // DEFAULT: 'off'
        //
        // 'off'
        // 'on'
        // 'retain-on-failure'
        // 'on-first-retry'
        // 'on-all-retries'
        // 'retain-on-first-failure'


        screenshot: 'only-on-failure',

        // DEFAULT: 'off'
        //
        // 'off'
        // 'on'
        // 'only-on-failure'


        video: 'retain-on-failure'

        // DEFAULT: 'off'
        //
        // 'off'
        // 'on'
        // 'retain-on-failure'
        // 'on-first-retry'

      }

    },


    // =================================================
    // PROJECT 4: PORTAL B
    // =================================================

    {

      name: 'portal-b',

      testMatch: '**/portal-b/**/*.spec.ts',

      // Select only Portal B test files.
      //
      // DEFAULT:
      // No project-specific restriction.


      use: {

        browserName: 'firefox',

        // 'chromium' | 'firefox' | 'webkit'
        // DEFAULT: 'chromium'


        baseURL: 'https://portal-b.example.com',

        // DEFAULT: undefined.


        viewport: {
          width: 1440,
          height: 900
        },

        // DEFAULT: 1280 x 720
        // without other overrides.


        headless: true

        // true | false
        // DEFAULT: true

      }

    }

  ]

});

