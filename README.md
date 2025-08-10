# AI Insurance Recommender

AI Insurance Recommender is a full-stack application that uses generative AI to provide personalized insurance recommendations to clients. The system analyzes user input and preferences to suggest the most suitable insurance policies, streamlining the decision-making process for both clients and insurance providers.

## Overview

This app leverages modern AI models to:

- Analyze client needs and preferences
- Generate tailored insurance policy recommendations
- Provide an interactive chat interface for user engagement

The app is built with a TypeScript/React frontend and a Node.js/Express backend, and supports containerized deployment with Docker.

## App Structure

```
ai-insurance-recommender/
   backend/    # Node.js/Express backend with AI logic
   frontend/   # React/TypeScript frontend
   docker-compose.yml
   README.md
   ...
```

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Safdari10/ai-insurance-recommender.git
   cd ai-insurance-recommender
   ```
2. Install dependencies for both backend and frontend using pnpm:
   ```sh
   cd backend
   pnpm install
   cd ../frontend
   pnpm install
   ```

## Usage

### With pnpm (local development)

1. Start the backend server:
   ```bash
   cd backend
   pnpm start
   ```
2. Start the frontend application:
   ```bash
   cd ../frontend
   pnpm dev
   ```
3. Open your browser and navigate to the frontend at `http://localhost:5173` and the backend at `http://localhost:3001`.

### With Docker

You can also run the entire stack using Docker Compose:

```bash
docker-compose up --build
```

This will start both the backend and frontend containers. Adjust ports as needed in the `docker-compose.yml` files.

For more details, see the README files in the `backend` and `frontend` directories.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more details.

## License

This app is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please create a pull request or open an issue on GitHub.
