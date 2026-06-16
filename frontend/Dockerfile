FROM node:20-alpine AS builder
WORKDIR /app
ARG VITE_API_URL
ARG VITE_CDN_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CDN_URL=${VITE_CDN_URL}
COPY package*.json ./
RUN npm ci
RUN npm install @rollup/rollup-linux-x64-musl
COPY . .
RUN npm run build

FROM alpine:latest
COPY --from=builder /app/dist /dist