FROM node:23-alpine3.20

WORKDIR /fastchat

ENV NODE_ENV=production

COPY . /fastchat

RUN npm i && npm cache clean --force

# Whichever PORT used in environment variables
EXPOSE 8000

CMD ["npm", "start"]
