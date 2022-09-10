FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN mkdir on-request-pdk
COPY on-request-pdk/package*.json on-request-pdk/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN cd on-request-pdk && npm install

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]