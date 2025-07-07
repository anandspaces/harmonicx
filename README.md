# HarmonicX - MERN Stack Application

A full-stack HarmonicX application built using the MERN (MongoDB, Express, React, Node.js) stack. This application replicates the core functionalities of Web based Music Player, including song browsing, album details, and user authentication.

## Features

- **Frontend**: Developed using React with Material-UI for styling.
- **Backend**: Built using Express.js, MongoDB for the database, and Socket.io for real-time updates.
- **User Authentication**: Powered by Google OAuth authentication.
- **Cloud Storage**: Integrated with Firebase for media uploads.
- **Styling**: Tailwind CSS for responsive and modern design.

## Tech Stack

- **Frontend**:
  - React
  - React Router DOM
  - Google OAuth
  - Material-UI
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - Firebase Storage
  - Socket.io

## Installation

### Prerequisites

- Node.js and npm installed.
- MongoDB database set up.
- Firebase account for media storage.
- Google account for authentication.

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

