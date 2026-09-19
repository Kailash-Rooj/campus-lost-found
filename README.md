# Campus Lost & Found

A full-stack web application that helps students report lost items and find items that have been found on campus.

## Features

- View lost and found items
- Add a new lost or found item
- Show item details such as location, date, description, and contact email
- Delete an item when it is no longer needed


## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript
- Bootstrap
- Apache HTTP Server

**Backend**
- Node.js
- Express.js
- Mongoose

**Database**
- MongoDB

## Project Structure

```text
campus-lost-found/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── add-item.html
│   ├── script.js
│   └── style.css
│
├── docker-compose.yml
├── .gitignore
└── README.md