FROM node:14

RUN mkdir -p /back

WORKDIR /back

COPY ./ ./

EXPOSE 4002

RUN npm install

CMD ["node","index.js"]