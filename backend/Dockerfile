FROM node:latest

WORKDIR /

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production

# Install TypeScript type definitions
RUN yarn add --dev @types/express @types/swagger-jsdoc @types/swagger-ui-express @types/cors @types/express-session @types/cookie-parser @types/bcryptjs @types/jsonwebtoken

# Copy the rest of the application files
COPY . .

# Run the build command
RUN yarn build

# Start the application
CMD ["yarn", "start"]
