# Use bun as server
FROM oven/bun:latest

# Copy to working directory
# COPY ./server /app/server
# COPY ./dist /app/dist
COPY ./index.ts .
COPY ./index.html .

# Run with bun
ENTRYPOINT ["bun", "run", "index.ts"]