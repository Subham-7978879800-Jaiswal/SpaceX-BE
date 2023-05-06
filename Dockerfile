FROM node:lts-alpine


COPY . .

RUN npm install --only=production

USER node

CMD ["npm", "run", "start-docker"]

EXPOSE 4000