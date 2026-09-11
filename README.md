# N-Queens Visualizer

A single Spring Boot web application that finds every valid N-Queens arrangement using Java backtracking and displays each arrangement as an interactive browser board.

## Requirements

- Java 17 or later
- Maven 3.9+ (optional when using the included Maven wrapper)

The solver accepts `N` from 1 through 12. Larger boards produce many configurations (for example, N=12 has 14,200), so the limit protects the server and browser from excessive work.

## Run locally

1. Clone the repository and open its directory.
2. Start the app with Maven:

   ```bash
   mvn spring-boot:run
   ```

   Or use the wrapper if Maven is not installed:

   ```bash
   ./mvnw spring-boot:run
   ```

   On Windows, use `mvnw.cmd spring-boot:run`.
3. Open `http://localhost:8080`.

## Build and run the JAR

```bash
./mvnw clean package
java -jar target/n-queens-visualizer-1.0.0.jar
```

The server uses the `PORT` environment variable when present, and otherwise uses port 8080.

## API

`POST /api/nqueens/solve`

```json
{ "n": 4 }
```

The response includes `n`, `solutionCount`, and all solutions as rows of `Q` and `X` characters. The frontend is served by the same application, so no CORS configuration is required.

## GitHub and Render deployment

1. Create a GitHub repository, then run `git add .`, `git commit -m "Build N-Queens visualizer"`, and push your branch.
2. In Render, select **New → Web Service** and connect that repository.
3. Use **Java** as the runtime, **Build Command** `./mvnw clean package`, and **Start Command** `java -jar target/*.jar`.
4. Deploy. Render supplies `PORT` automatically. The included `render.yaml` provides the same settings for Blueprint deployment.
