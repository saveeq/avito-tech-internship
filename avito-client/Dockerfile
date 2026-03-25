# Этап 1 — сборка
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL=http://localhost:8080
ARG VITE_LLM_API_URL=http://localhost:11434
ARG VITE_LLM_MODEL=llama3
ARG VITE_LLM_API_KEY=""

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_LLM_API_URL=$VITE_LLM_API_URL
ENV VITE_LLM_MODEL=$VITE_LLM_MODEL
ENV VITE_LLM_API_KEY=$VITE_LLM_API_KEY

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80