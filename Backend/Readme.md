# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their first name, last name, email, and password. The password will be hashed before storing it in the database.

## Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "fullname": {
    "firstname": "string (min length: 3)",
    "lastname": "string (optional, min length: 3)"
  },
  "email": "string (valid email, min length: 5)",
  "password": "string (min length: 6)"
}
```

## Response
### Success (201 Created)
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```
### Error Responses
#### 400 Bad Request: If the request body is invalid or required fields are missing
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```
#### 500 Internal Server Error: If there is an error on the server side.
```json
{
  "error": "string"
}
```

## Example Request
```bash
curl -X POST http://localhost:4000/users/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

## Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint allows an existing user to log in by providing their email and password. If the credentials are valid, a JWT token will be returned.

## Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "email": "string (valid email)",
  "password": "string (min length: 6)"
}
```

## Response
### Success (200 OK)
```json
{
  "token": "string (JWT token)",
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```
### Error Responses
#### 400 Bad Request: If the request body is invalid or required fields are missing
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```
#### 401 Unauthorized: If the email or password is incorrect
```json
{
  "message": "Invalid Email or Password"
}
```
#### 500 Internal Server Error: If there is an error on the server side.
```json
{
  "error": "string"
}
```

## Example Request
```bash
curl -X POST http://localhost:4000/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'
```

## Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# Get User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
This endpoint retrieves the current user's profile information.

## Response
### Success (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "role": "string",
    "createdAt": "timestamp"
  }
}
```
### Error Responses
#### 401 Unauthorized: If the user is not authenticated
```json
{
  "message": "Unauthorized"
}
```
#### 404 Not Found: If the user profile doesn't exist
```json
{
  "message": "User profile not found"
}
```

# Logout User Endpoint

## Endpoint
`GET /users/logout`

## Description
This endpoint logs out the currently authenticated user and invalidates their token.

## Response
### Success (200 OK)
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```
### Error Responses
#### 401 Unauthorized: If the user is not authenticated
```json
{
  "message": "Unauthorized"
}
```

# Captain Registration Endpoint

## Endpoint
`POST /captains/register`

## Description
This endpoint allows a new captain to register by providing their first name, last name, email, password, and vehicle details. The password will be hashed before storing it in the database.

## Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "fullname": {
    "firstname": "string", // min length: 3
    "lastname": "string" // optional, min length: 3
  },
  "email": "string", // valid email, min length: 5
  "password": "string", // min length: 6
  "vehicle": {
    "model": "string",
    "year": "number"
  }
}
```

## Response
### Success (201 Created)
```json
{
  "token": "string", // JWT token
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "model": "string",
      "year": "number"
    }
  }
}
```
### Error Responses
#### 400 Bad Request: If the request body is invalid or required fields are missing
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```
#### 500 Internal Server Error: If there is an error on the server side.
```json
{
  "error": "string"
}
```

## Example Request
```bash
curl -X POST http://localhost:4000/captains/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "model": "Camry",
    "year": 2020
  }
}'
```

## Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "model": "Camry",
      "year": 2020
    }
  }
}
```

# Captain Login Endpoint

## Endpoint
`POST /captains/login`

## Description
This endpoint allows an existing captain to log in by providing their email and password. If the credentials are valid, a JWT token will be returned.

## Request Body
The request body should be in JSON format and include the following fields:

```json
{
  "email": "string", // valid email
  "password": "string" // min length: 6
}
```

## Response
### Success (200 OK)
```json
{
  "token": "string", // JWT token
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "model": "string",
      "year": "number"
    }
  }
}
```
### Error Responses
#### 400 Bad Request: If the request body is invalid or required fields are missing
```json
{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "string"
    }
  ]
}
```
#### 401 Unauthorized: If the email or password is incorrect
```json
{
  "message": "Invalid Email or Password"
}
```
#### 500 Internal Server Error: If there is an error on the server side.
```json
{
  "error": "string"
}
```

## Example Request
```bash
curl -X POST http://localhost:4000/captains/login \
-H "Content-Type: application/json" \
-d '{
  "email": "jane.doe@example.com",
  "password": "password123"
}'
```

## Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "model": "Camry",
      "year": 2020
    }
  }
}
```

# Get Captain Profile Endpoint

## Endpoint
`GET /captains/profile`

## Description
This endpoint retrieves the current captain's profile information.

## Response
### Success (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "vehicle": {
      "model": "string",
      "year": "number"
    },
    "role": "string",
    "createdAt": "timestamp"
  }
}
```
### Error Responses
#### 401 Unauthorized: If the captain is not authenticated
```json
{
  "message": "Unauthorized"
}
```
#### 404 Not Found: If the captain profile doesn't exist
```json
{
  "message": "Captain profile not found"
}
```

# Logout Captain Endpoint

## Endpoint
`GET /captains/logout`

## Description
This endpoint logs out the currently authenticated captain and invalidates their token.

## Response
### Success (200 OK)
```json
{
  "success": true,
  "message": "Captain logged out successfully"
}
```
### Error Responses
#### 401 Unauthorized: If the captain is not authenticated
```json
{
  "message": "Unauthorized"
}
```