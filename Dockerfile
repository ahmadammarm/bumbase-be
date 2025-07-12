# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Deploy stage
FROM alpine:latest

RUN apk update && apk add nodejs npm

WORKDIR /app
COPY --from=builder /app ./

CMD ["npm", "start"]
