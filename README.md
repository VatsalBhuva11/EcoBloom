# EcoBloom - Cleanliness Campaign Platform

## Overview

EcoBloom is a web platform designed to facilitate and incentivize cleanliness campaigns organized by various entities. Users can actively participate in campaigns, earn rewards, and contribute to a cleaner environment. The project utilizes React for the frontend, Firebase for authentication and real-time updates, Tailwind CSS for styling, and MongoDB for data storage.

## Table of Contents

1. [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
    - [Usage](#usage)
2. [Key Highlights](#key-highlights)
    - [User Authentication](#user-authentication)
    - [Campaign Creation](#campaign-creation)
    - [Campaign Participation](#campaign-participation)
    - [Gamification](#gamification)
3. [Contributing](#contributing)
4. [Bug Reporting](#bug-reporting)
5. [Tech Stack](#tech-stack)
6. [License](#license)

## Getting Started

### Installation

To set up EcoBloom locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ecobloom.git

2. Install dependencies
   ```bash
   npm install


### Configuration

To initialise and configure , follow these steps:

1. Create a firebase project here.
2. Obtain your Firebase configuration details.
3. Create a .env file in the project root and add your Firebase config:
   
   ```bash
   REACT_APP_DEPLOYED_API_URL= deployed-app-url
   REACT_APP_LOCAL_API_URL= local-api-url
   REACT_APP_API_KEY= your-api-key
   REACT_APP_DEPLOYED_URL= your-project.web.app
   REACT_APP_PROJECT_ID= your-project-id
   REACT_APP_MESSAGING_SENDER_ID= messaging-sender-id
   REACT_APP_APP_ID= your-app-id
   REACT_APP_MEASUREMENT_ID= your-measurement-id
   REACT_APP_GOOGLE_MAPS_API_KEY= your-google-maps-api
   
5. Create a .env file in the functions folder and add your Firebase and MongoDB config:
   
    ```bash
   DEPLOYED_URL= deployed-url
   API_URL= your-api-url
   LOCAL_API_URL= your-local-api-url
   MONGO_URI= your-api-key
   API_KEY= your-api-key
   DEPLOYED_URL= your-deployed-url
   AUTH_DOMAIN= your-auth-domain
   PROJECT_ID= your-project-id
   BUCKET_ID= your-bucket-id
   MESSAGING_SENDER_ID= your-messaging-sender-id
   APP_ID= your-app-id
   MEASUREMENT_ID= your-measurement-key
   JWT_SECRET_KEY= your-jwt-secret-key
    ```


### Usage

Run the development server:

  ```bash
npm run start
```


## Key Highlights


### User Authentication
EcoBloom implements Firebase Authentication for secure user login and signup.

### Campaign Creation

Organizations can easily create and launch campaigns through an intuitive interface. Tailored for simplicity, this feature allows campaign organizers to set goals, define participation criteria, and engage the community seamlessly.

### Campaign Participation
Users can actively join and participate in cleanliness campaigns, contributing to a cleaner environment.

### Gamification
EcoBloom incorporates a gamified point system, encouraging users through rewards for their active involvement in campaigns.


## Contributing

We welcome and appreciate contributions from the community! To contribute to EcoBloom, please follow these guidelines:

1. Fork the repository to your own GitHub account.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature` or `git checkout -b bugfix/your-bug-fix`.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork: `git push origin feature/your-feature`.
5. Open a Pull Request (PR) against the `main` branch of this repository.
6. Ensure that your PR description clearly describes the problem and solution.

### Code Style

Follow the existing code style and conventions. Ensure your code is well-documented.

### Testing

If your contribution includes new features or bug fixes, add relevant tests and ensure existing tests pass.

### Reporting Issues

If you encounter any issues or have suggestions, please report them on the [Issues](https://github.com/yourusername/ecobloom/issues) page.

### Development Environment

To set up your development environment, refer to the [Getting Started](#getting-started) section.

Thank you for contributing to EcoBloom! 🌿


## Bug Reporting

If you encounter any bugs, glitches, or unexpected behavior while using EcoBloom, we appreciate your help in improving the project. Please follow these guidelines when reporting issues:

1. Check the [existing issues](https://github.com/VatsalBhuva11/EcoBloom/issues) to ensure the bug hasn't been reported before.

2. If your issue is not already reported, open a new issue and provide the following details:

    - **Title:** A concise and descriptive title.
    
    - **Description:** Clearly describe the issue, including steps to reproduce it.
    
    - **Expected Behavior:** What you expected to happen.
    
    - **Actual Behavior:** What actually happened.

    - **Screenshots or Code Snippets:** If applicable, include screenshots or code snippets to help illustrate the issue.

3. Assign appropriate labels to your issue, such as "bug" or "enhancement," to help categorize and prioritize it.

4. If you're able to address the issue yourself, feel free to open a Pull Request (PR) with the fix. Follow the [Contributing Guidelines](#contributing) for PR submissions.

Thank you for helping make EcoBloom better! 🌱


## Tech Stack

EcoBloom is built using the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Firebase**: A comprehensive platform for building web and mobile applications, including authentication and real-time database features.
- **Tailwind CSS**: A utility-first CSS framework for building modern designs.
- **MongoDB**: A NoSQL database for storing and retrieving data efficiently.

### Frontend

- **React**: Our frontend is primarily built with React, providing a dynamic and responsive user interface.

- **Tailwind CSS**: Tailwind CSS is used for styling, enabling a streamlined and customizable design approach.

### Backend

- **Firebase Authentication**: Provides secure user authentication for EcoBloom.

- **MongoDB**: Serves as our backend database, storing and retrieving data efficiently.

### Additional Tools

- **npm**: The package manager for JavaScript, used for installing and managing project dependencies.

- **Git**: Version control system for tracking changes in the source code.

### Development Environment

To set up your development environment, refer to the [Getting Started](#getting-started) section.

Thank you to the communities behind these technologies for making EcoBloom possible!


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.












