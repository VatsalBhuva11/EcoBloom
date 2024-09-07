# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app/frontend

# Copy all files/folders
COPY ./frontend/package*.json ./
COPY ./.firebaserc ../.firebaserc
COPY ./firebase.json ../firebase.json
COPY ./firestore.indexes.json ../firestore.indexes.json
COPY ./firestore.rules ../firestore.rules
COPY ./storage.rules ../storage.rules

# Install dependencies
RUN npm install
COPY ./frontend .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
