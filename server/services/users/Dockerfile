FROM node:lts-hydrogen

WORKDIR /apps

COPY . .

RUN npm install --production

ENV MONGO_DB="mongodb+srv://IkaPFW:110K83Napp@hokbenapp.bz3t252.mongodb.net/test"
ENV NODE_ENV=production
ENV PORT=4001

EXPOSE 4001

CMD ["node", "app.js"]