FROM node:14

RUN mkdir -p /FRONTEND

WORKDIR /FRONTEND

COPY ./ ./

EXPOSE 3000

RUN npm install

CMD ["npm","start"]