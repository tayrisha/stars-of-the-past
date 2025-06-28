# Stars of the Past - Server

NASA APOD (Astronomy Picture of the Day) API server that fetches historical images for each anniversary of a birthday.

## API Endpoints

### GET /api/stars-of-the-past?birthday=YYYY-MM-DD

Returns APOD data for each year from the birth year to the current year on the same date.

**Query Parameters:**
- `birthday` (required): Date in YYYY-MM-DD format

**Response:** Array of APOD objects with image data

## Development

### Testing

The project includes a comprehensive test suite with **100% code coverage**.

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

```
__tests__/
├── test-helpers/       # Shared utilities and mock data
├── services/           # Unit tests for NASA service
├── controllers/        # Unit tests for request handlers
└── integration/        # End-to-end API integration tests
```

**Test Coverage:**
- ✅ NASA API service functionality and caching
- ✅ Input validation and error handling
- ✅ Date calculations and leap year handling
- ✅ Full API endpoint integration
- ✅ Edge cases and error scenarios
- ✅ Performance patterns and scalability

**Test Quality Features:**
- 🎯 **Given/When/Then** structure for clarity
- 🔄 **Shared utilities** eliminate duplication
- 📊 **Scenario-based testing** improves readability
- 🧹 **Clean separation** between unit and integration tests

### Environment Variables

- `NASA_API_KEY`: NASA API key for APOD service
- `PORT`: Server port (default: 4000)

### Tech Stack

- **Runtime:** Node.js + TypeScript
- **Framework:** Express.js
- **Testing:** Jest 30.0.3 + Supertest
- **API:** NASA APOD API 