
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY tsconfig.json ./
COPY apps/api/tsconfig.json ./apps/api/

# Workspace install might need root package-lock or adjustment
# For simplicity in this monorepo context without a complex build tool like Turbo yet:
RUN npm install

COPY . .
RUN npm run build -w packages/shared -w packages/sdk
RUN npm run build -w apps/api

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "apps/api/dist/server.js"]
