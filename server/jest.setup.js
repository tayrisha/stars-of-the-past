// Global test setup
process.env.NODE_ENV = 'test';
process.env.NASA_API_KEY = 'test-api-key';

// Mock console.log and console.error to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
}; 