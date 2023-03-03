/* eslint-disable */
export default {
  displayName: 'logger',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/logger',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: ['jest.config.ts', '.module.ts'],
};
