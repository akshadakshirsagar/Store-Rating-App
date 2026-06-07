# Store-Rating-App
# Store Rating Application

## Overview

A full-stack web application that allows users to rate stores. The system supports Admin, User, and Store Owner roles.

## Technologies Used

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs

### Database

* MySQL

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication

### Admin Features

* Add Store
* View Stores
* View Users
* Dashboard Statistics

### User Features

* View Stores
* View Average Ratings
* Submit Ratings
* Update Ratings

### Store Owner Features

* View Store Details
* View Average Rating
* View User Ratings

## Project Structure

store-rating-app/

* backend/

  * routes/
  * middleware/
  * db.js
  * server.js

* frontend/

  * src/

    * pages/
    * App.jsx

## Installation

### Backend

```bash
cd backend
npm install
npx nodemon server.js
```

Backend runs on:

http://localhost:5000

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

http://localhost:5173

## Database

Create MySQL database:

```sql
CREATE DATABASE store_rating_app;
```

Import the required tables:

* users
* stores
* ratings

## Author

Akshada Kshirsagar
