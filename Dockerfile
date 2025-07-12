# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Deploy stage
FROM alpine:latest

RUN apk update && apk add --no-cache nodejs npm curl

WORKDIR /app
COPY --from=builder /app ./

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

CMD ["node", "src/index.js"]
