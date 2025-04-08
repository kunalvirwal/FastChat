FROM node:23-alpine3.20

WORKDIR /fastchat

COPY . /fastchat

RUN npm i

# Whichever PORT used in environment variables
EXPOSE 8000

CMD ["npm", "start"]
