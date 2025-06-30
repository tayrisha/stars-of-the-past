import { getStarsOfThePast } from '../../controllers/starsOfThePast.controller';
import { 
  createMockApodResponse, 
  createYearlyResponses, 
  TEST_DATES, 
  ERROR_MESSAGES 
} from '../test-helpers/mock-data';
import { 
  setupTestYear, 
  cleanupTestYear, 
  createMockResponse, 
  createMockRequest, 
  createMockNext,
  getMockedFetchApodByDate,
  describeScenario,
  itShould 
} from '../test-helpers/test-setup';

jest.mock('../../services/nasa.service');

describe('Stars of the Past Controller', () => {
  let mockResponse: any;
  let statusSpy: jest.SpyInstance;
  let jsonSpy: jest.SpyInstance;
  let mockNext: any;
  let fetchApodByDate: any;

  beforeEach(() => {
    jest.clearAllMocks();
    setupTestYear();
    
    const responseHelpers = createMockResponse();
    mockResponse = responseHelpers.mockResponse;
    statusSpy = responseHelpers.statusSpy;
    jsonSpy = responseHelpers.jsonSpy;
    
    mockNext = createMockNext();
    fetchApodByDate = getMockedFetchApodByDate();
  });

  afterEach(() => {
    cleanupTestYear();
  });

  describeScenario('input validation', () => {
    itShould('reject requests without birthday parameter', async () => {
      // Given
      const request = createMockRequest({});

      // When
      await getStarsOfThePast(request as any, mockResponse, mockNext);

      // Then
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ error: ERROR_MESSAGES.MISSING_BIRTHDAY });
    });

    itShould('reject requests with non-string birthday parameter', async () => {
      // Given
      const request = createMockRequest({ birthday: 123 });

      // When
      await getStarsOfThePast(request as any, mockResponse, mockNext);

      // Then
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ error: ERROR_MESSAGES.MISSING_BIRTHDAY });
    });

    itShould('reject requests with invalid date format', async () => {
      // Given
      const request = createMockRequest({ birthday: TEST_DATES.INVALID_DATE });

      // When
      await getStarsOfThePast(request as any, mockResponse, mockNext);

      // Then
      expect(statusSpy).toHaveBeenCalledWith(400);
      expect(jsonSpy).toHaveBeenCalledWith({ error: ERROR_MESSAGES.INVALID_DATE_FORMAT });
    });
  });

  describeScenario('successful data fetching', () => {
    itShould('return APOD data for each year from birth to current', async () => {
      // Given
      const request = createMockRequest({ birthday: TEST_DATES.BIRTHDAY_2020 });
      const yearlyResponses = createYearlyResponses(2020, 2023, TEST_DATES.BIRTHDAY_2020);
      
      yearlyResponses.forEach(response => {
        fetchApodByDate.mockResolvedValueOnce(response);
      });

      // When
      await getStarsOfThePast(request as any, mockResponse, mockNext);

      // Then
      expect(fetchApodByDate).toHaveBeenCalledTimes(4);
      expect(jsonSpy).toHaveBeenCalledWith(yearlyResponses);
    });

    itShould('handle leap year birthdays correctly', async () => {
      // Given
      const request = createMockRequest({ birthday: TEST_DATES.LEAP_YEAR });
      const leapYearResponse = createMockApodResponse({ date: TEST_DATES.LEAP_YEAR });
      fetchApodByDate.mockResolvedValue(leapYearResponse);

      // When
      await getStarsOfThePast(request as any, mockResponse, mockNext);

      // Then
      expect(fetchApodByDate).toHaveBeenCalledTimes(1); // Only 2020 has Feb 29
      expect(fetchApodByDate).toHaveBeenCalledWith(TEST_DATES.LEAP_YEAR);
      expect(jsonSpy).toHaveBeenCalledWith([leapYearResponse]);
    });

    itShould('filter out null responses from failed API calls', async () => {
      // Given
      const request = createMockRequest({ birthday: TEST_DATES.BIRTHDAY_2021 });
      const validResponse = createMockApodResponse({ date: TEST_DATES.BIRTHDAY_2021 });
      
      fetchApodByDate
        .mockResolvedValueOnce(validResponse)
        .mockResolvedValueOnce(null) // Failed request
        .mockResolvedValueOnce(validResponse);

      // When
      await getStarsOfThePast(request as any, mockResponse, mockNext);

      // Then
      expect(jsonSpy).toHaveBeenCalledWith([validResponse, validResponse]);
    });

    itShould('return empty array when all API calls fail', async () => {
      // Given
      const request = createMockRequest({ birthday: TEST_DATES.BIRTHDAY_2022 });
      fetchApodByDate.mockResolvedValue(null);

      // When
      await getStarsOfThePast(request as any, mockResponse, mockNext);

      // Then
      expect(jsonSpy).toHaveBeenCalledWith([]);
    });
  });
}); 