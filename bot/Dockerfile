FROM node

WORKDIR /opt
COPY . .

RUN rm -rf node_modules
RUN npm install

ENV ENV PRODUCTION

CMD ["index.js"]