FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN npm install @rollup/rollup-linux-x64-musl
COPY . .
RUN npm run build

FROM alpine:latest
COPY --from=builder /app/dist /dist