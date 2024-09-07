# Use an official Node.js image as the base image
FROM node:18
ARG FIREBASE_VERSION=13.2.1
# Set the working directory inside the container
WORKDIR /app/functions

# Install Java (OpenJDK 17)
RUN apt-get update -y && \
    apt-get install -y openjdk-17-jdk

# Copy package.json and package-lock.json
COPY ./functions/package*.json ./
COPY ../.firebaserc ../.firebaserc
COPY ../firebase.json ../firebase.json
COPY ../firestore.indexes.json ../firestore.indexes.json
COPY ../firestore.rules ../firestore.rules
COPY ../storage.rules ../storage.rules

# Install Firebase CLI and dependencies
RUN npm install -g firebase-tools@$FIREBASE_VERSION
RUN npm install -g firebase-admin
RUN npm install

# Copy the remaining functions code
COPY ./functions .

# Expose the port that the backend runs on
EXPOSE 5001 4000 4400

# Command to run the backend
CMD ["npm", "run", "serve"]
