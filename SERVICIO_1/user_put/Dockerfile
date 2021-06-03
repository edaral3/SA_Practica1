FROM node:14

RUN mkdir -p /user_put

WORKDIR /user_put

COPY ./ ./

EXPOSE 4004

RUN npm install

CMD ["node","index.js"]