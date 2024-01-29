module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",

  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['!tests/*', '!**/dist/**/*', '!tests/**/*'],
  coverageReporters: ['json-summary', 'text']
};