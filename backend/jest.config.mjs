// jest.config.mjs
export default {
  testEnvironment: "node",
  transform: {}, // no transform needed for pure ESM
  testTimeout: 30000, // 30s timeout for slow DB tests
};
