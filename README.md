# Stock API Project

## General Setup

### Prerequisites

Before you begin, ensure you have the following dependencies installed on your system:

- Docker version 26.0.0
- Docker Compose version v2.26.1
- Node.js v18.19.0 (npm v10.2.3)

## Development Setup

After cloning the repository, start up both services by navigating to each directory. I reccomend using the flag `--build` because Docker can get tricky with the cache sometimes.

Terminal 1:
```bash
cd stock-service && docker compose up --build
```

Terminal 2:
```bash
cd api-service && docker compose up --build
```

Docker Compose will automatically install all the needed dependencies and run the project in containers.

The project should now be running in your development environment. You can access the API endpoints locally using the provided base URLs.

## Production Setup

To run any of the applications in production, all you have to do is build a docker image using the `Dockerfile`.

Make sure you are in the directory of the service you want to build.

```bash
docker build -t stock-service-image .
```

You should be able to run the created image.

```bash
docker run --rm --name stock-service-container -p 3001:3001 stock-service-image
```

## Endpoints

Here is a small overview of the app endpoints. You can also use `/docs` for an interactive experience.

### API Service Endpoints

| Endpoint      | Method | Summary                           | Description                                                     |
|---------------|--------|-----------------------------------|-----------------------------------------------------------------|
| /register     | POST   | Register User                     | Registers a new user with an email address and role.            |
| /login        | POST   | User Login                        | Logs in a user with email and password and returns a JWT token. |
| /stock        | GET    | Retrieve Stock Quote              | Retrieves stock information for the given stock code.           |
| /history      | GET    | Retrieve Query History            | Retrieves the history of queries made by the user.              |
| /stats        | GET    | Retrieve Stats                    | Retrieves the top 5 most requested stocks.                      |
| /docs         | GET    | Swagger Documentation             | Endpoint for accessing Swagger/OpenAPI documentation.           |

### Stock Service Endpoints

| Endpoint      | Method | Summary                           | Description                                                     |
|---------------|--------|-----------------------------------|-----------------------------------------------------------------|
| /stock        | GET    | Retrieve Stock Quote              | Retrieves stock information for the given stock code.           |
| /docs         | GET    | Swagger Documentation             | Endpoint for accessing Swagger/OpenAPI documentation.           |
