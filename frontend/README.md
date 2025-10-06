# Lingua Learn Frontend

A React (Create React App) single-page application that connects to the Lingua Learn backend over WebSocket to stream camera frames for on-device AI classification of American Sign Language letters. Tailwind CSS is used for styling.

## Tech stack
- React ^19, ReactDOM ^19
- Create React App (react-scripts 5)
- Tailwind CSS 3 with PostCSS and plugins (`@tailwindcss/forms`, `@tailwindcss/container-queries`)
- Testing: React Testing Library, Jest DOM

## Project layout
```
frontend/
  public/
    index.html           # HTML template
  src/
    index.js             # SPA bootstrap
    App.js               # App shell; mode switcher and page selection
    components/
      VideoFeed.jsx      # Captures webcam and streams frames via WebSocket
      LetterDisplay.jsx  # Renders current letter
      Header.jsx, Footer.jsx, ModeSwitcher.jsx, ArrowButton.jsx
    pages/
      PracticePage.jsx   # Practice mode layout (video + reference image + letter)
      QuizPage.jsx       # Quiz mode layout
    index.css, App.css   # Global and component styles
  tailwind.config.js     # Tailwind config (content, theme, plugins)
  postcss.config.js      # PostCSS pipeline
  package.json           # Scripts and dependencies
```

## Installation and setup
Prerequisites:
- Node.js 18+ (LTS recommended)
- npm 9+

PowerShell (Windows):
```powershell
cd frontend
npm ci
```

POSIX (macOS/Linux):
```bash
cd frontend
npm ci
```

## Environment configuration
The app expects the backend WebSocket URL via CRA environment variable:
- `REACT_APP_API_WS_URL` (e.g., `ws://localhost:8000/ws`)

Create a `.env.local` in `frontend/` for local development:
```dotenv
REACT_APP_API_WS_URL=ws://127.0.0.1:8000/ws
```

Note: CRA only exposes variables prefixed with `REACT_APP_`.

## Scripts
Defined in `package.json`:
- `npm start`: Start the dev server at `http://localhost:3000` with HMR.
- `npm run build`: Production build into `build/`.
- `npm test`: Run tests in watch mode (Jest + React Testing Library).
- `npm run eject`: Eject CRA (irreversible).

## Running (development)
PowerShell:
```powershell
npm start
```
The dev server runs on port 3000. Ensure the backend is running and that `REACT_APP_API_WS_URL` points to it.

CORS/Proxy: No custom proxy is configured; WebSocket connects directly to the backend URL.

## Building (production)
```powershell
npm run build
```
- Outputs to `build/`.
- Ensure production environment includes `REACT_APP_API_WS_URL` at build time.

## AI models, tools, and integration
- On-device processing in the browser:
  - Camera capture via `navigator.mediaDevices.getUserMedia`.
  - Frames drawn to a hidden `<canvas>` and encoded as JPEG data URLs.
- Backend integration:
  - WebSocket client initialized from `REACT_APP_API_WS_URL` in `src/components/VideoFeed.jsx`.
  - Message schema sent to backend:
    ```json
    { "type": "frame", "data": "<data-url-or-base64-jpeg>" }
    ```
  - Server response handling selects the top-probability letter from `{ letter: probability }` mapping and logs it. Hook this into app state to drive UI updates.
- No in-browser AI models or ML frameworks are used; inference occurs in the backend.
- Safety/guardrails: Not configured in UI (e.g., no rate limit beyond client `targetFPS`).
- Observability/analytics: Not configured.

## Styling and UI system
- Tailwind CSS with dark mode class strategy (`darkMode: "class"`).
- Content scanning paths include `./index.html` and all files under `./src/**/*.{js,ts,jsx,tsx}`.
- Theme extends colors (`primary`, `background-light`, `background-dark`), fonts (`Lexend`), and radii.
- Plugins: `@tailwindcss/forms`, `@tailwindcss/container-queries`.

## Testing and quality
- Testing libraries present: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
- Run tests: `npm test`.
- ESLint configuration uses CRA defaults via `eslintConfig` in `package.json`.
- Prettier: Not explicitly configured.

## Performance and accessibility
- Frame send rate controlled by `targetFPS` in `VideoFeed.jsx` (default 1 FPS). Adjust as needed for UX/perf tradeoffs.
- Requested camera frameRate: ideal 30 fps; actual send rate is throttled.
- Consider debouncing or sampling strategies on slower devices/bandwidth.

## Deployment
- Serve the built `build/` directory via a static host or CDN.
- Ensure `REACT_APP_API_WS_URL` is defined at build time for the correct backend environment (dev/staging/prod).
- If deploying behind HTTPS, use `wss://` for the WebSocket URL and ensure CORS/WSS is allowed by the backend.

## Troubleshooting
- WebSocket fails to connect: verify `REACT_APP_API_WS_URL` (scheme/host/port/path) matches the backend and that the backend WebSocket is reachable at `/ws`.
- Camera access denied: ensure the site is served over `http://localhost` or HTTPS and the user has granted permission.
- Mixed content errors: use `wss://` when the site is served over HTTPS.
- Tailwind styles missing: verify `tailwind.config.js` content paths include your files and that PostCSS is active.
