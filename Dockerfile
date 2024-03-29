FROM node:16.13.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@4.0.1 -g --silent

COPY . .

ENV PORT=3000

EXPOSE 3000

# start app
CMD ["npm", "start"]