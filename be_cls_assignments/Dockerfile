FROM node:lts-alpine

ENV NODE_ENV=
ENV DB_HOST=
ENV DB_PORT=
ENV DB_USER=
ENV DB_PASSWORD=
ENV DB_DATABASE=

ENV SECRET_KEY=

# mail settings
ENV SMTP_HOST=
ENV SMTP_PORT=
ENV SMTP_USER=
ENV SMTP_PASSWORD=

# redis host
ENV REDIS_URL=

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3001

RUN chown -R node /usr/src/app

USER node

CMD ["npm", "start"]
