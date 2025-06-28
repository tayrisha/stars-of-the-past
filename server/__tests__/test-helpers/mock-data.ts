import { ApodResponse } from '../../types/apod.types';

/**
 * Base APOD response template for testing
 */
export const createMockApodResponse = (overrides: Partial<ApodResponse> = {}): ApodResponse => ({
  date: '2023-01-01',
  title: 'Test APOD Image',
  url: 'https://example.com/test-image.jpg',
  explanation: 'A beautiful test image from space showcasing the cosmos.',
  media_type: 'image',
  ...overrides,
});

/**
 * Creates a video-type APOD response (should be filtered out)
 */
export const createMockVideoResponse = (date: string): ApodResponse => 
  createMockApodResponse({ date, media_type: 'video', title: 'Test Video' });

/**
 * Creates multiple APOD responses for year range testing
 */
export const createYearlyResponses = (startYear: number, endYear: number, baseDate: string): ApodResponse[] => {
  const [, month, day] = baseDate.split('-');
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => 
    createMockApodResponse({
      date: `${startYear + i}-${month}-${day}`,
      title: `APOD ${startYear + i}`,
    })
  );
};

/**
 * Common test dates for consistency
 */
export const TEST_DATES = {
  BIRTHDAY_2020: '2020-01-15',
  BIRTHDAY_2021: '2021-06-01', 
  BIRTHDAY_2022: '2022-12-25',
  LEAP_YEAR: '2020-02-29',
  CURRENT_YEAR: '2023-07-01',
  INVALID_DATE: 'invalid-date',
} as const;

/**
 * Common error messages
 */
export const ERROR_MESSAGES = {
  MISSING_BIRTHDAY: 'Missing or invalid `birthday` query parameter. Use YYYY-MM-DD.',
  INVALID_DATE_FORMAT: 'Invalid date format. Use YYYY-MM-DD.',
} as const; 