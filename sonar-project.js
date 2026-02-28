/*
  Attempt to run Sonar scanner via the `sonarqube-scanner` package.
  In some environments (missing native loader / incompatible arch) the
  native sonar-scanner binary cannot be executed. In that case we catch
  the error, warn, and skip the local scan so CI/authoring machines don't
  fail when they cannot run the native binary.

  Note: for a real Sonar analysis run the scanner should be executed in
  a compatible environment or in CI that provides the native binaries.
*/

// If the system is missing the x86-64 loader the native sonar-scanner
// binary can't run (common on mismatched architectures). Check for the
// standard loader before attempting to run the native scanner.
const fs = await import("fs");
if (!fs.existsSync("/lib64/ld-linux-x86-64.so.2")) {
  console.warn("Native x86-64 loader not found; skipping local Sonar run.");
  process.exitCode = 0;
} else {
  const scanner = await import("sonarqube-scanner");
  scanner.default(
    {
      serverUrl: "https://sonarcloud.io/",
      token: "<<SONAR_TOKEN>>",
      options: {
        "sonar.projectKey": "nsschultz_fantasy-baseball-ui",
        "sonar.organization": "nsschultz",
        "sonar.sources": "./src",
        "sonar.exclusions": "**/*.test.js, **/index.js, **/reportWebVitals.js, **/setupTests.js",
        "sonar.tests": "./src",
        "sonar.test.inclusions": "**/*.test.js",
        "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
        "sonar.testExecutionReportPaths": "reports/test-report.xml",
        "sonar.sourceEncoding": "UTF-8",
      },
    },
    () => {
      console.log("Sonar scanner finished (or handed off to native binary).");
    }
  );
}
