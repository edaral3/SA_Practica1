FROM node:14

RUN mkdir -p /user_get

WORKDIR /user_get

COPY ./ ./

EXPOSE 4002

RUN npm install

CMD ["node","index.js"]