# Bug Tracker App

A simple **Bug Tracker** application built with **React.js** for the frontend and **Node.js** for the backend. This app allows users to report, update, and delete bugs, making it easy to manage software bugs with a user-friendly interface. The app features color-coded status labels (Open, In Progress, Resolved) to provide an efficient and organized bug management experience.

## Features

- **Report New Bug**: Users can report new bugs with a title, description, and status.
- **Edit Bug**: Users can edit the details of an existing bug.
- **Delete Bug**: Bugs can be deleted from the system.
- **Bug Status**: Track bug progress with color-coded status labels (Open, In Progress, Resolved).
- **Responsive Design**: The app is designed to work across various screen sizes, ensuring a smooth user experience on both desktop and mobile devices.
- **Backend Integration**: Built with Node.js, providing a simple API to store and retrieve bug information.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (using Mongoose for data modeling)
- **Styling**: Tailwind CSS for modern UI components and responsive design
- **Routing**: React Router for client-side navigation
- **HTTP Requests**: Axios for making API requests
- **Version Control**: Git and GitHub for version control

## Installation

### Prerequisites

Before starting, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MongoDB](https://www.mongodb.com/) (or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud hosting)

### Steps to Run the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/ashu-devv/bug-tracker.git

2. Navigate into the project directory:

```bash
    cd bug-tracker
```

3. Install backend dependencies:

```bash
    cd backend
    npm install
```


4.Install frontend dependencies:

```bash
    cd ../frontend
    npm install
```

5. Set up environment variables for the backend (in .env file) and replace MongoDB Connection String in server.js:
```bash
PORT=5000
```
6. Start the backend server

```bash
cd backend
npm start
```

7. Start the frontend development server:

```bash
cd ../frontend
npm start
```

API Endpoints
```bash
GET /api/bugs: Retrieve all bugs
POST /api/bugs: Create a new bug
PUT /api/bugs/:id: Update an existing bug
DELETE /api/bugs/:id: Delete a bug
```

```bash
Folder Structure
/bug-tracker
├── /backend
│   ├── /models
│   ├── /routes
│   ├── server.js
│   └── .env
└── /frontend
    ├── /src
    │   ├── /components
    │   ├── /pages
    │   ├── App.js
    │   └── index.js
    └── package.json
```


