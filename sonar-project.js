const scanner = require("sonarqube-scanner").default;

scanner(
  {
    serverUrl: "https://sonarcloud.io/",
    token: "<<SONAR_TOKEN>>",
    options: {
      "sonar.projectKey": "nsschultz_fantasy-baseball-ui",
      "sonar.sources": "./src",
      "sonar.exclusions": "**/*.test.js, **/index.js, **/reportWebVitals.js, **/setupTests.js",
      "sonar.tests": "./src",
      "sonar.test.inclusions": "**/*.test.js",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => {}
);
