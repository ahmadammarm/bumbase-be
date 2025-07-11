# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Deploy stage
FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app ./

CMD ["npm", "start"]
