# HarmonicX - MERN Stack Application

A full-stack HarmonicX application built using the MERN (MongoDB, Express, React, Node.js) stack. This application replicates the core functionalities of Web based Music Player, including song browsing, album details, and user authentication.

## Features

- **Frontend**: Developed using React with Clerk for authentication and Material-UI for styling.
- **Backend**: Built using Express.js, MongoDB for the database, and Socket.io for real-time updates.
- **User Authentication**: Powered by Clerk authentication.
- **Cloud Storage**: Integrated with Cloudinary for media uploads.
- **Styling**: Tailwind CSS for responsive and modern design.

## Tech Stack

- **Frontend**:
  - React
  - React Router DOM
  - Clerk (authentication)
  - Material-UI
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - Cloudinary
  - Socket.io

## Installation

### Prerequisites

- Node.js and npm installed.
- MongoDB database set up.
- Cloudinary account for media storage.
- Clerk account for authentication.

### Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:

   ```env
   MONGO_URI=<your_mongo_connection_string>
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   CLERK_API_KEY=<your_clerk_api_key>
   CLERK_SECRET_KEY=<your_clerk_secret_key>
   ```

4. Seed the database with sample songs and albums:

   ```bash
   npm run seed:songs
   npm run seed:albums
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

