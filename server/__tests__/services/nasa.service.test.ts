import axios from 'axios';
import { fetchApodByDate } from '../../services/nasa.service';
import { createMockApodResponse, createMockVideoResponse, TEST_DATES } from '../test-helpers/mock-data';
import { describeScenario, itShould } from '../test-helpers/test-setup';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NASA Service - fetchApodByDate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describeScenario('successful API responses', () => {
    itShould('fetch and return APOD data for valid image requests', async () => {
      // Given
      const expectedResponse = createMockApodResponse({ date: TEST_DATES.BIRTHDAY_2020 });
      mockedAxios.get.mockResolvedValue({ data: expectedResponse });

      // When
      const result = await fetchApodByDate(TEST_DATES.BIRTHDAY_2020);

      // Then
      expect(result).toEqual(expectedResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://api.nasa.gov/planetary/apod',
        {
          params: {
            date: TEST_DATES.BIRTHDAY_2020,
            api_key: 'test-api-key',
          },
        }
      );
    });

    itShould('filter out non-image media types', async () => {
      // Given
      const videoResponse = createMockVideoResponse(TEST_DATES.BIRTHDAY_2021);
      mockedAxios.get.mockResolvedValue({ data: videoResponse });

      // When
      const result = await fetchApodByDate(TEST_DATES.BIRTHDAY_2021);

      // Then
      expect(result).toBeNull();
    });
  });

  describeScenario('API failures', () => {
    itShould('handle network errors gracefully', async () => {
      // Given
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      // When
      const result = await fetchApodByDate(TEST_DATES.BIRTHDAY_2022);

      // Then
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        `Error fetching APOD for ${TEST_DATES.BIRTHDAY_2022}:`,
        errorMessage
      );
    });
  });

  describeScenario('caching behavior', () => {
    itShould('cache successful image responses', async () => {
      // Given
      const cachedResponse = createMockApodResponse({ date: TEST_DATES.CURRENT_YEAR });
      mockedAxios.get.mockResolvedValue({ data: cachedResponse });

      // When
      const firstCall = await fetchApodByDate(TEST_DATES.CURRENT_YEAR);
      const secondCall = await fetchApodByDate(TEST_DATES.CURRENT_YEAR);

      // Then
      expect(firstCall).toEqual(cachedResponse);
      expect(secondCall).toEqual(cachedResponse);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    itShould('not cache non-image responses', async () => {
      // Given
      const videoResponse = createMockVideoResponse(TEST_DATES.LEAP_YEAR);
      mockedAxios.get.mockResolvedValue({ data: videoResponse });

      // When
      const firstCall = await fetchApodByDate(TEST_DATES.LEAP_YEAR);
      const secondCall = await fetchApodByDate(TEST_DATES.LEAP_YEAR);

      // Then
      expect(firstCall).toBeNull();
      expect(secondCall).toBeNull();
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    });
  });
}); 