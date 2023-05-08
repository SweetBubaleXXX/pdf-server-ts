FROM node:18-alpine as builder

WORKDIR /app

COPY . ./

RUN npm ci \
  && npm run build

FROM node:18-alpine

ENV PORT=3000 \
  NODE_ENV=production

WORKDIR /app

COPY package*.json .env ./

RUN npm ci

COPY --from=builder /app/dist ./

EXPOSE ${PORT}

CMD [ "node", "index.js" ]
