# mobile/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install
RUN yarn add react-native-safe-area-context@4.10.5 react-native-screens@3.31.1 typescript@~5.3.3

COPY . .

# Start the Expo project with tunnel
CMD ["yarn", "start"]