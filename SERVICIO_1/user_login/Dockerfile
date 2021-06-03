FROM node:14

RUN mkdir -p /user_login

WORKDIR /user_login

COPY ./ ./

EXPOSE 4003

RUN npm install

CMD ["node","index.js"]