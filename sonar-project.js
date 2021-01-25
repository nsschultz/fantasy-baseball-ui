const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: "http://sonarqube.schultz.local/",
    options: {
      "sonar.projectKey": "fantasy-baseball-ui",
      "sonar.sources": "./src",
      "sonar.exclusions": "**/__tests__/**, **/index.js, **/setupTests.js",
      "sonar.tests": "./src/__tests__",
      "sonar.test.inclusions": "./src/__tests__/**/*.test.js",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
      "sonar.testExecutionReportPaths": "reports/test-report.xml",
    },
  },
  () => {},
);