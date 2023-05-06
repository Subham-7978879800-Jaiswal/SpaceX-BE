FROM node:lts-alpine


COPY . .

RUN npm install --only=production

RUN npm install pm2 -g

USER node

CMD ["sh", "-c", "npm run start-docker && npm run logs"]

EXPOSE 4000