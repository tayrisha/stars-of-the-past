import { fetchStars } from '../fetchStars';
import type { ApodResponse } from '~types/apod.types';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('fetchStars', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('fetches APOD data successfully (positive)', async () => {
    // Arrange
    const mockResponse: ApodResponse[] = [
      {
        date: '2024-01-01',
        title: 'Test Image',
        url: 'https://example.com/image.jpg',
        explanation: 'A test image',
        media_type: 'image'
      }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const birthday = '2024-01-01';

    // Act
    const result = await fetchStars(birthday);

    // Assert
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/stars-of-the-past?birthday=2024-01-01'
    );
    expect(result).toEqual(mockResponse);
  });

  it('throws error when API response is not ok (negative)', async () => {
    // Arrange
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const birthday = '2024-01-01';

    // Act & Assert
    await expect(fetchStars(birthday)).rejects.toThrow('Failed to fetch from backend');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/stars-of-the-past?birthday=2024-01-01'
    );
  });

  it('throws error when fetch fails (negative)', async () => {
    // Arrange
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const birthday = '2024-01-01';

    // Act & Assert
    await expect(fetchStars(birthday)).rejects.toThrow('Network error');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/stars-of-the-past?birthday=2024-01-01'
    );
  });

  it('constructs correct URL with different birthday formats (positive)', async () => {
    // Arrange
    const mockResponse: ApodResponse[] = [];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const birthday = '1995-06-16';

    // Act
    await fetchStars(birthday);

    // Assert
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:4000/api/stars-of-the-past?birthday=1995-06-16'
    );
  });
}); 