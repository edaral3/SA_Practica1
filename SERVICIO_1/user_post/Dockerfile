FROM node:14

RUN mkdir -p /user_post

WORKDIR /user_post

COPY ./ ./

EXPOSE 4001

RUN npm install

CMD ["node","index.js"]