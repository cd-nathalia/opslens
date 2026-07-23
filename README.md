# OpsLens

OpsLens is an infrastructure-analysis tool that turns configuration files and system logs into a concise operational report. Paste or upload supported text files in the React interface and receive an AI-assisted assessment of the stack, including security findings, operational risks, and prioritized next steps.

https://github.com/user-attachments/assets/679543d8-6a76-4213-9bef-e470368fbe72

## Features

- Accepts pasted text and common infrastructure files, including Docker Compose, Nginx, SSH configuration, system logs, and environment files.
- Identifies detected infrastructure components and summarizes the stack.
- Produces grouped security findings, operational risks, and suggested next steps.
- Uses a Spring Boot API to validate requests and call the configured Gemini model.

## Tech stack

- Frontend: React and Vite
- Backend: Java 21, Spring Boot, Maven
- AI: Google Gemini API

## Project structure

```text
.
|-- backend/    # Spring Boot API and Gemini integration
|-- frontend/   # React/Vite single-page application
`-- README.md
```

## Prerequisites

- Java 21
- Node.js and npm
- A Google Gemini API key

## Run locally

1. Set your Gemini API key in the shell where the backend will run.

   PowerShell:

   ```powershell
   $env:GEMINI_API_KEY = "your-api-key"
   ```

2. Start the backend from the repository root.

   ```powershell
   .\backend\mvnw.cmd -f .\backend\pom.xml spring-boot:run
   ```

   The API starts at `http://localhost:8080`. Its health endpoint is available at `GET /api/health`.

3. In another terminal, start the frontend.

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

4. Open the URL printed by Vite (normally `http://localhost:5173`).

The frontend sends analysis requests to `POST http://localhost:8080/api/analyses`. The backend permits the Vite development origin at `http://localhost:5173`.

## Build

Build the frontend:

```powershell
cd frontend
npm run build
```

Build and test the backend:

```powershell
.\backend\mvnw.cmd -f .\backend\pom.xml test
```

## Configuration

The backend configuration is in `backend/src/main/resources/application.properties`:

```properties
gemini.api.key=${GEMINI_API_KEY}
gemini.api.model=gemini-3.6-flash
```

Keep `GEMINI_API_KEY` out of source control. You can change the configured Gemini model in this file if needed.
