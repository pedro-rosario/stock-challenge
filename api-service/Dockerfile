FROM node:18.19.0

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy source files into application directory
COPY . .

RUN npm run build

CMD [ "npm", "start" ]
