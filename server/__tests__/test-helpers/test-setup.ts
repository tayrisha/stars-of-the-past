import { Request, Response, NextFunction } from 'express';
import { fetchApodByDate } from '../../services/nasa.service';

/**
 * Sets up a consistent test year for predictable date calculations
 */
export const setupTestYear = (year = 2023, month = 11, day = 31) => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(year, month, day)); // Default: Dec 31, 2023
};

/**
 * Cleans up test timers
 */
export const cleanupTestYear = () => {
  jest.useRealTimers();
};

/**
 * Creates a mock Express response with spy methods
 */
export const createMockResponse = () => {
  const statusSpy = jest.fn().mockReturnThis();
  const jsonSpy = jest.fn().mockReturnThis();
  
  const mockResponse = {
    status: statusSpy,
    json: jsonSpy,
  } as Partial<Response>;

  return { mockResponse, statusSpy, jsonSpy };
};

/**
 * Creates a mock Express request with query parameters
 */
export const createMockRequest = (query: Record<string, any> = {}): Partial<Request> => ({
  query,
});

/**
 * Creates a mock Next function
 */
export const createMockNext = (): NextFunction => jest.fn();

/**
 * Gets the mocked fetchApodByDate function
 */
export const getMockedFetchApodByDate = () => 
  fetchApodByDate as jest.MockedFunction<typeof fetchApodByDate>;

/**
 * Describes a test scenario with clear intent
 */
export const describeScenario = (description: string, tests: () => void) => {
  describe(`Scenario: ${description}`, tests);
};

/**
 * Creates a test with clear Given/When/Then structure
 */
export const itShould = (expectation: string, test: (() => void) | (() => Promise<void>)) => {
  it(`should ${expectation}`, test as any);
}; 