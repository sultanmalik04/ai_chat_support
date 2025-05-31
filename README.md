# AI Chat Support

A full-stack AI-powered chat support application using Next.js (React) for the frontend and Spring Boot for the backend, integrating with the Ollama LLM API.

## Technology Stack

### Frontend
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for API requests

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Ollama](https://ollama.com/) (local LLM API)

## Prerequisites
- Node.js (v18 or later recommended)
- npm or yarn
- Java 17+ (for Spring Boot backend)
- Ollama running locally (default: http://localhost:11434)

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ai_chat_support
```

### 2. Start the Backend (Spring Boot)
1. Open a terminal in the backend directory (usually `src/main/java/...` or the project root if using Maven/Gradle).
2. Build and run the backend:
   - **Maven:**
     ```bash
     ./mvnw spring-boot:run
     ```
   - **Gradle:**
     ```bash
     ./gradlew bootRun
     ```
3. Ensure Ollama is running locally (http://localhost:11434).

### 3. Start the Frontend (Next.js)
1. Open a terminal in the `frontend/ai_chat_support` directory.
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Troubleshooting
- If Tailwind CSS styles are not applied, ensure:
  - `globals.css` is imported in `app/layout.js`.
  - `tailwind.config.js` and `postcss.config.mjs` are correctly set up.
  - The dev server is restarted after config changes.
- The backend must be running and accessible at `http://localhost:8080` for the chat to work.
- Ollama must be running and accessible at `http://localhost:11434` for the backend to generate responses.

## Customization
- You can update the model used by Ollama in the backend service (`ChatbotService.java`).
- Frontend UI can be customized via Tailwind classes in the React components.

## License
MIT (or your preferred license)
