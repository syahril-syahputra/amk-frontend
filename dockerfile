
FROM node:16.14.2-alpine as builder
WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile --production
RUN yarn add tailwindcss
COPY . .
RUN yarn build

FROM node:16.14.2-alpine as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

EXPOSE 3000

CMD ["yarn", "start"]