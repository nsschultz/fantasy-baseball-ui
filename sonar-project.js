const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://sonarqube.schultz.local/",
    options: {
      "sonar.projectKey": "fantasy-baseball-ui",
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
