FROM node:14

RUN mkdir -p /user_delete

WORKDIR /user_delete

COPY ./ ./

EXPOSE 4005

RUN npm install

CMD ["node","index.js"]