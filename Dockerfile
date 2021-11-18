# Node server
FROM node:15 as node-server
WORKDIR /backend/app
COPY . /backend/app
RUN rm -f package-lock.json \
    ;rm -rf node_modules \
    ;npm install --production --silent && mv node_modules ../
COPY server.js .
COPY /server backend/server

# Final image
# CMD ["node", "server.js"]
CMD ["npm", "prod"]

