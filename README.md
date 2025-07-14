# Bumbase Backend

Backend project for blog based food recipe application.

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)


## Prequisites

- NodeJs 18 or later
- ExpressJs
- MongoDB
- Docker (optional)


## Features

- *Middleware*: Implements JWT authentication and request rate limiting.
- *CRUD Implementation*: Implements full Create, Read, Update, and Delete (CRUD) logic for model entities.
- *Email Verification*: Uses Nodemailer with SMTP to send user verification emails.
- *Environment Configuration*: Supports environment variables configuration via .env files.
- *CORS Support*: Enables Cross-Origin Resource Sharing (CORS) configuration.
- *Deployment*: Supports containerized development and deployment via Docker.

## 📡 REST API Overview

This project provides a RESTful API for managing categories and recipes, following standard REST conventions.

### 🔐 Authentication API Routes

- POST /api/v1/auth/signup - Register a new user.
- POST /api/v1/auth/signin - Signin for the existing user.
- POST /api/v1/auth/send-verification-email - Send a verification email to the user.
- POST /api/v1/auth/verification - Verify the user's email using a verification code.
- POST /api/v1/auth/forgot-password-code - Send a password recovery code to the user's email.
- POST /api/v1/auth/recover-password - Recover a user’s password using email and verification code.
- PUT /api/v1/auth/change-password - Update the user’s password.
- PUT /api/v1/auth/update-profile - Update the user’s profile information.
- GET /api/v1/auth/current-user - Retrieve the currently authenticated user's information.


### 🗂 Category API Routes

Superadmin Only
- POST /api/v1/admin/category - Create a new category.
- PUT /api/v1/admin/category/:id - Update a category by id.
- DELETE /api/v1/admin/category/:id - Delete a category by id.
- DELETE /api/v1/admin/category - Delete all categories.

Accessible by All Roles
- GET /api/v1/category - Retrieve all categories.
- GET /api/v1/category/:id - Retrieve a category by id.


### 🍽 Recipe API Routes

Superadmin Only
- POST /api/v1/admin/recipe - Create a new recipe.
- PUT /api/v1/admin/recipe/:id - Update a recipe by id.
- DELETE /api/v1/admin/recipe/:id - Delete a recipe by id.

Accessible by All Roles
- GET /api/v1/recipe - Retrieve all recipes.
- GET /api/v1/recipe/:id - Retrieve a recipe by id.

### 🖼 Image Upload API Routes

Superadmin Only
- POST /api/v1/file - Upload an image (JPG, JPEG, PNG formats supported).
- DELETE /api/v1/file/:id - Delete an image by ID.

### 🤖 Google Gemini API Route
- POST /api/v1/gemini - Generate content for a recipe based on the user’s prompt using the Gemini AI model.

## Getting Started

1. Clone the repository:

```
git clone https://github.com/ahmadammarm/bumbase-be.git
```

2. Navigate to the project directory:

```
cd bumbase-be
```

3. Install the project dependencies:

```
npm install
```


4. Configure Environment Variable: Copy the file .env.example to .env and adjust it to your configuration:

```
cp .env.example .env
```


5. Run the project:

```
npm start
```


## Getting Started with Docker

1. Clone the repository:
```
git clone https://github.com/ahmadammarm/bumbase-be.git
```

2. Navigate to the project directory:

sh
cd bumbase-be


3. Run the Docker Compose:

```
docker-compose up
```

or run in detach mode:
```
docker-compose up -d
```

4. To stop the Docker Compose:
```
docker-compose down
```

The project will be available at:

http://localhost:8000

### 🌱 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.


### 🔗 Frontend Project
You can find the frontend repository here: <br>
<a href="https://github.com/ahmadammarm/bumbase-fe">Bumbase Frontend</a>


