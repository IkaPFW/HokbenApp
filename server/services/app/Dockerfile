FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production

ENV DATABASE_URL="postgresql://postgres:110KA2831170@db.duayvgqofjoeyguysgeb.supabase.co:5432/postgres"
ENV DATABASE_NAME="postgres"
ENV NODE_ENV=production
ENV PORT=4002

EXPOSE 4002

CMD ["node", "app.js"]