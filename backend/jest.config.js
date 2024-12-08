module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};