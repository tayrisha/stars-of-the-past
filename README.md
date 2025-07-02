# Stars of the Past

## Overview

**Stars of the Past** lets users enter a birthdate (or any meaningful date) and view the NASA Astronomy Picture of the Day (APOD) for that date — for each year since that date.

- **Live Demo:** [https://stars-of-the-past.vercel.app/](https://stars-of-the-past.vercel.app/)

##  Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, TypeScript, Express
- **Testing:** Jest (client & server)
- **Deployment:** Vercel (frontend), Render (backend)
- **APIs:** NASA APOD

---


---

##  Getting started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Clone the repository

```sh
git clone https://github.com/your-username/stars-of-the-past.git
cd stars-of-the-past
```

### Environment Variables Setup
Both the frontend and backend require environment variables for proper operation. Example file is provided in the server folder.

Copy the example environment file and rename it to .env.

The .env file includes:
- VITE_API_URL — The URL of your backend API (use http://localhost:3000 for local development).
- NASA_API_KEY — Your NASA API key (the public DEMO_KEY is included and works for most cases).
### Frontend

```sh
cd client
npm install
npm run dev
```

### Backend

```sh
cd server
npm install
npm run dev
```

---

##  Testing

- **Frontend:**  
  In client:
  ```sh
  npm test
  ```
- **Backend:**  
  In server:
  ```sh
  npm test
  ```

---

##  Deployment

- **Frontend:** Deployed on Vercel: [https://stars-of-the-past.vercel.app/](https://stars-of-the-past.vercel.app/)
- **Backend:** Deployed on Render

---

##  Image Credits

All images are sourced from [Unsplash](https://unsplash.com/) and are free to use under the Unsplash License.

---

##  License

This project is licensed under the MIT License.
