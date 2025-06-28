import request from 'supertest';
import express from 'express';
import cors from 'cors';
import starsOfThePastRoutes from '../../routes/starsOfThePast.route';
import { 
  createMockApodResponse, 
  createYearlyResponses, 
  TEST_DATES, 
  ERROR_MESSAGES 
} from '../test-helpers/mock-data';
import { 
  setupTestYear, 
  cleanupTestYear, 
  getMockedFetchApodByDate,
  describeScenario,
  itShould 
} from '../test-helpers/test-setup';

jest.mock('../../services/nasa.service');

const createTestApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api', starsOfThePastRoutes);
  return app;
};

describe('Stars of the Past API - End-to-End Integration', () => {
  let app: express.Application;
  let fetchApodByDate: any;

  beforeEach(() => {
    jest.clearAllMocks();
    setupTestYear();
    app = createTestApp();
    fetchApodByDate = getMockedFetchApodByDate();
  });

  afterEach(() => {
    cleanupTestYear();
  });

  describeScenario('API contract validation', () => {
    itShould('return 400 with proper error structure for missing parameters', async () => {
      const response = await request(app)
        .get('/api/stars-of-the-past')
        .expect(400);

      expect(response.body).toEqual({ error: ERROR_MESSAGES.MISSING_BIRTHDAY });
    });

    itShould('return 400 with proper error structure for invalid dates', async () => {
      const response = await request(app)
        .get(`/api/stars-of-the-past?birthday=${TEST_DATES.INVALID_DATE}`)
        .expect(400);

      expect(response.body).toEqual({ error: ERROR_MESSAGES.INVALID_DATE_FORMAT });
    });
  });

  describeScenario('complete workflow integration', () => {
    itShould('successfully process multi-year birthday requests', async () => {
      // Given
      const yearlyResponses = createYearlyResponses(2020, 2023, TEST_DATES.BIRTHDAY_2020);
      yearlyResponses.forEach(response => {
        fetchApodByDate.mockResolvedValueOnce(response);
      });

      // When
      const response = await request(app)
        .get(`/api/stars-of-the-past?birthday=${TEST_DATES.BIRTHDAY_2020}`)
        .expect(200);

      // Then
      expect(response.body).toHaveLength(4);
      expect(response.body).toEqual(yearlyResponses);
      expect(response.headers['content-type']).toMatch(/json/);
    });

    itShould('handle mixed success/failure scenarios gracefully', async () => {
      // Given - Some years succeed, others fail
      const successfulResponse = createMockApodResponse({ date: '2021-03-15' });
      fetchApodByDate
        .mockResolvedValueOnce(successfulResponse)
        .mockResolvedValueOnce(null) // API failure
        .mockResolvedValueOnce(successfulResponse);

      // When
      const response = await request(app)
        .get('/api/stars-of-the-past?birthday=2021-03-15')
        .expect(200);

      // Then
      expect(response.body).toHaveLength(2);
      expect(response.body).toEqual([successfulResponse, successfulResponse]);
    });
  });

  describeScenario('edge case handling', () => {
    itShould('correctly handle leap year edge cases through full stack', async () => {
      // Given
      const leapYearResponse = createMockApodResponse({ date: TEST_DATES.LEAP_YEAR });
      fetchApodByDate.mockResolvedValue(leapYearResponse);

      // When
      const response = await request(app)
        .get(`/api/stars-of-the-past?birthday=${TEST_DATES.LEAP_YEAR}`)
        .expect(200);

      // Then
      expect(response.body).toHaveLength(1); // Only 2020 has Feb 29
      expect(response.body[0]).toEqual(leapYearResponse);
      expect(fetchApodByDate).toHaveBeenCalledTimes(1);
    });

    itShould('return empty array when no data is available', async () => {
      // Given
      fetchApodByDate.mockResolvedValue(null);

      // When
      const response = await request(app)
        .get(`/api/stars-of-the-past?birthday=${TEST_DATES.BIRTHDAY_2022}`)
        .expect(200);

      // Then
      expect(response.body).toEqual([]);
    });

    itShould('process current year birthdays correctly', async () => {
      // Given
      const currentYearResponse = createMockApodResponse({ date: TEST_DATES.CURRENT_YEAR });
      fetchApodByDate.mockResolvedValue(currentYearResponse);

      // When
      const response = await request(app)
        .get(`/api/stars-of-the-past?birthday=${TEST_DATES.CURRENT_YEAR}`)
        .expect(200);

      // Then
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toEqual(currentYearResponse);
    });
  });

  describeScenario('performance and scalability patterns', () => {
    itShould('handle requests for long time spans efficiently', async () => {
      // Given - 10 year span
      const responses = createYearlyResponses(2014, 2023, '2014-05-10');
      responses.forEach(response => {
        fetchApodByDate.mockResolvedValueOnce(response);
      });

      // When
      const response = await request(app)
        .get('/api/stars-of-the-past?birthday=2014-05-10')
        .expect(200);

      // Then
      expect(response.body).toHaveLength(10);
      expect(response.body).toEqual(responses);
      expect(fetchApodByDate).toHaveBeenCalledTimes(10);
    });
  });
}); 