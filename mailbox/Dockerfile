FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

#ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_PATH=./node_modules
ENV PATH=$PATH:/node_modules/.bin

#RUN npm install --silent
RUN npm install
#RUN npm install react-scripts@latest -g --silent
RUN npm install react-scripts@latest -g


#COPY src /app/src
#COPY public /app/public
COPY . .

CMD ["npm", "start"]
