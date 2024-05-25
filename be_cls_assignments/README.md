# Backend Task - Classroom Assignment API

This project is a RESTful API for managing student assignments. It includes features for authentication, assignment creation, retrieval, update, deletion, and student submissions. The application also uses Redis for caching and JWT for authentication.

## Table of Contents

- [Backend Task - Classroom Assignment API](#backend-task---classroom-assignment-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Running Locally](#running-locally)
  - [Running in docker](#running-in-docker)
  - [Usage](#usage)
    - [Authentication](#authentication)
    - [Assignments](#assignments)
    - [Submissions](#submissions)
    - [Users](#users)

## Features

- User authentication with JWT
- CRUD operations for assignments
- Role-based access control (Teacher and Student)
- Assignment submission by students
- Grading by teachers
- Email notifications for new assignments
- Caching with Redis
- API documentation with Swagger

## Requirements

- Node.js (v18.x or higher)
- MySQL
- Redis
- Docker

## Running Locally

<!-- TODO: Add repository link -->
1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/pptask.git
    cd pptask/backend-task
    ```
2. **Install the dependencies**
    ```bash
    npm install
    ```
3. **Configure environment variables**
  
   Depending on what the NODE_ENV is, environment variables are loaded either from `.env.production` or `.env.development`. See `.env.example` for a list of variables.

4. **Create database tables**
   - Create a database named `assignments`
   - Use the script [db_fixture.sql](db_fixture.sql) to create tables and populate with dummy data.

5. Password for `admin` is `admin` and for remaining users it is `app_user`.

6. Ensure MySQL and Redis are running.

7. Start the dev server
   ```bash
    npm run dev
   ``` 

8. Visit [http://localhost:3001/api](http://localhost:3001/api). If previous steps were successful you should see the following response
    ```json
    {
      "name" : "Assignment server",
      "status":"RUNNING",
      "time":"2024-05-25T16:13:59.000Z"
    }
    ```
9.  To access API documentation, visit [http://localhost:3001/api-docs](http://localhost:3001/api-docs)


## Running in docker

You can also run the application using Docker.

1. **Build the docker image**
   
    ```bash
    docker build -t <tagname> .
    ```
2. **Run the docker container**
   
    ```bash
    docker run \
      --env-file ./env.development \
      --network host \
      -p 3001:3001 \
      -d <tagname>
    ```
3. **Or run with compose files**
   
   The accompanying sample compose files allow you to make the whole process simpler. In order to run with docker compose, first udpate the **environment variables** and **image** in `docker-compose.yml`,  `docker-compose.dev.yml` and `docker-compose.prod.yml`.

   - **Run in development mode:**

      ```bash
        docker compose -f docker-compose.yml -f docker-compose.dev.yml up
      ```

   - **Run in production mode:**

      ```bash
        docker compose -f docker-compose.yml -f docker-compose.prod.yml up
      ```
      > In development mode, the image is built from the dockerfile. Whereas, in production mode, the image is pulled from docker registry.

      You can build and publish your own and use it. To learn more on publishing your own images, visit [Docker Docs: Sharing the application](https://docs.docker.com/get-started/04_sharing_app/).

## Usage

### Authentication

- Login
  
  ```http
  POST http://localhost:3001/api/auth/login HTTP/1.1
  Content-Type: application/json

  {
    "username": "username",
    "password": "password"
  }
  ```
- Register
  
  ```http
  POST http://localhost:3001/api/auth/register HTTP/1.1
  Content-Type: application/json

  {
    "username": "username",
    "password": "password",
    "email": "name@domain.tld"
  }
  ```

### Assignments

- Get all assignments
  
  ```http
  GET http://localhost:3001/api/assignments HTTP/1.1
  Authorization: Bearer {{authToken}}
  ```
- Get assignment by id
  
  ```http
  GET http://localhost:3001/api/assignments/{{id}} HTTP/1.1
  Authorization: Bearer {{authToken}}
  ```
- Create assignment
  
  ```http
  POST http://localhost:3001/api/assignments HTTP/1.1
  Content-Type: application/json
  Authorization: Bearer {{authToken}}

  {
    "title": "Assignment title",
    "description": "Assignment description",
    "dueDate": "YYY-MM-DD"
  }
  ```
- Update asignment
  
  ```http
  PUT http://localhost:3001/api/assignments/{{id}} HTTP/1.1
  Content-Type: application/json
  Authorization: Bearer {{authToken}}

  {
    "title": "Updated title",
    "description": "Updated description",
    "dueDate": "YYYY-MM-DD"
  }
  ```
- Delete assignment
  
  ```http
  DELETE http://localhost:3001/api/assignments/{{id}} HTTP/1.1
  Authorization: Bearer {{authToken}}
  ```
### Submissions

- Create an submission (id: assignmentId)
  
  ```http
  POST http://localhost:3001/api/assignments/{{id}}/submissions HTTP/1.1
  Content-Type: application/json
  Authorization: Bearer {{authToken}}

  {
    "content": "Submission Content"
  }
  ```
- Grade a submission
  
  ```http
  POST http://localhost:3001/api/submissions/{{id}}/grade HTTP/1.1
  Content-Type: application/json
  Authorization: Bearer {{authToken}}

  {
    "grade": 90,
    "feedback": "Good Job"
  }
  ```
### Users

- Get user by id (Admin Only)
  ```http
  GET http://localhost:3001/api/users/4 HTTP/1.1
  Authorization: Bearer {{adminAccessToken}}
  ```

- Change role to teacher (Admin Only)

  ```http
  PATCH http://localhost:3001/api/users/4/makeTeacher
  Authorization: Bearer {{adminAccessToken}}
  ```