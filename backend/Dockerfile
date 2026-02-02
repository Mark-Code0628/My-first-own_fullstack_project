FROM node:20-bullseye

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Prisma generate futtatása build során
COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 3000
CMD ["node", "src/server.js"]
