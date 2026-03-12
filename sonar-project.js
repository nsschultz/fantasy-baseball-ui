import scanner from "sonarqube-scanner";

scanner(
  {
    serverUrl: "https://sonarcloud.io/",
    token: "<<SONAR_TOKEN>>",
    options: {
      "sonar.projectKey": "nsschultz_fantasy-baseball-ui",
      "sonar.organization": "nsschultz",
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.js, **/*.test.tsx, **/index.tsx, **/reportWebVitals.js, **/setupTests.js",
      "sonar.tests": "./src",
      "sonar.test.inclusions": "**/*.test.js, **/*.test.ts, **/*.test.tsx",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => {}
);
