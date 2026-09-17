# Campus Lost & Found

A simple web application that helps students report lost items, share items they have found, and contact the person who submitted an item. The project has a lightweight HTML/CSS/JavaScript frontend and an Express/MongoDB backend.

## Features

- View all reported lost and found items.
- Add a lost or found item with:
  - Item name
  - Status (`Lost` or `Found`)
  - Location
  - Date
  - Contact email
  - Description
- Delete an item after it has been returned or is no longer relevant.
- Store item records in MongoDB.
- Display an empty state when no items have been reported.
- Display useful error responses from the backend.
- Escape user-provided text before rendering it in the browser.
- Responsive interface using Bootstrap 5 and Bootstrap Icons.

## Tech stack

- **Frontend:** HTML, CSS, and vanilla JavaScript
- **UI:** Bootstrap 5.3.3 and Bootstrap Icons 1.11.3 via CDN
- **Backend:** Node.js and Express 5
- **Database:** MongoDB with Mongoose
- **Middleware:** CORS, JSON request parsing, dotenv, asynchronous error handling

## Project structure

```text
campus-lost-found/
├── backend/
│   ├── index.js                 # Express server and API routes
│   ├── package.json             # Backend dependencies and scripts
│   ├── middleware/
│   │   ├── errorHandler.js      # Converts errors into JSON responses
│   │   └── wrapAsync.js          # Forwards rejected async route promises
│   └── models/
│       └── Item.js               # Mongoose schema for lost/found items
├── frontend/
│   ├── index.html               # Page that lists all items
│   ├── add-item.html            # Form for adding an item
│   ├── script.js                # API calls, rendering, form handling
│   └── style.css                # Custom responsive styling
└── .gitignore                   # Ignores node_modules and .env files
```

## How the application works

1. The backend starts an Express server on port `5000` by default.
2. The backend connects to MongoDB using the `MONGO_URI` environment variable.
3. `frontend/script.js` requests item data from `http://localhost:5000/api/items`.
4. The home page renders each item as a card and provides a delete action.
5. The add-item page sends a `POST` request containing the form data.
6. The backend validates required fields, stores the item through the Mongoose `Item` model, and returns JSON.

## Requirements

Install the following before running the project:

- [Node.js](https://nodejs.org/) 18 or newer recommended
- npm
- A running MongoDB instance, either local or hosted through MongoDB Atlas
- A local static file server for the frontend, or another way to serve the `frontend` directory over HTTP

## Installation and setup

### 1. Clone the repository

```bash
git clone https://github.com/Kailash-Rooj/campus-lost-found.git
cd campus-lost-found
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure MongoDB

Create a file named `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/campus-lost-found
PORT=5000
```

For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string. Do not commit `.env`; it is ignored by Git.

### 4. Start the backend

From the `backend` directory:

```bash
node index.js
```

When the server starts successfully, the API is available at:

```text
http://localhost:5000
```

You can verify the server with:

```bash
curl http://localhost:5000/
```

Expected response:

```text
Campus Lost & Found API is running!
```

### 5. Start the frontend

In a second terminal, from the repository root, serve the frontend directory. For example, if you have Python installed:

```bash
python -m http.server 5500 --directory frontend
```

Open the application at:

```text
http://localhost:5500
```

You can also use VS Code Live Server or another static web server. Serving the files over HTTP is recommended instead of opening `index.html` directly in the browser.

> The frontend currently uses `http://localhost:5000/api/items` as its API URL. If the backend is deployed elsewhere, update `API_URL` in `frontend/script.js`.

## API reference

Base URL: `http://localhost:5000`

### Health check

```http
GET /
```

Returns a short message confirming that the API is running.

### List items

```http
GET /api/items
```

Returns all items, sorted from newest to oldest.

### Add an item

```http
POST /api/items
Content-Type: application/json
```

Request body:

```json
{
  "name": "Black wallet",
  "type": "Lost",
  "location": "College library",
  "date": "2026-09-17",
  "email": "student@example.com",
  "description": "Black leather wallet with a student ID inside."
}
```

All fields are required. `type` must be either `Lost` or `Found`.

### Delete an item

```http
DELETE /api/items/:id
```

Example:

```bash
curl -X DELETE http://localhost:5000/api/items/<item-id>
```

## Data model

Each item contains the following fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | String | Yes | Name of the lost or found item |
| `type` | String | Yes | Either `Lost` or `Found` |
| `location` | String | Yes | Where the item was lost or found |
| `date` | Date | Yes | Date associated with the report |
| `email` | String | Yes | Contact email shown to users |
| `description` | String | Yes | Additional identifying details |
| `createdAt` | Date | Automatic | Time the record was created |
| `updatedAt` | Date | Automatic | Time the record was last updated |

## Available npm commands

The backend currently provides the following script:

```bash
npm test
```

There are currently no automated tests configured, so this command exits with a placeholder error. Use the manual API checks above when developing locally.

## Troubleshooting

### The frontend says it cannot load items

- Confirm that the backend is running with `node index.js`.
- Confirm that MongoDB is running and `MONGO_URI` is correct.
- Check that the frontend is calling the same backend URL configured in `frontend/script.js`.
- Check the browser console and the backend terminal for errors.

### MongoDB does not connect

- Check that `backend/.env` exists.
- Confirm the variable is named exactly `MONGO_URI`.
- For a local database, confirm MongoDB is running on the expected port.
- For MongoDB Atlas, check the connection string, database user, network access rules, and password encoding.

### CORS or browser access problems

The backend enables CORS with Express middleware. If the app is deployed, verify that the frontend API URL is updated and that the deployed backend is reachable over the network.

## Security notes

- The frontend escapes user-provided values before inserting them into item cards.
- The backend validates that all required fields are present and restricts the item type to `Lost` or `Found` through the Mongoose schema.
- Contact email addresses are publicly displayed in the item list, so only submit an address that is appropriate to share.
- The current delete endpoint does not require authentication or authorization. Add authentication and ownership checks before using this application in a public or production environment.
- Add stronger validation, rate limiting, and production CORS restrictions before deployment.

## Possible improvements

- Add user authentication and protected delete operations.
- Add search, filtering, pagination, and item status updates.
- Add image uploads for item photos.
- Move the API URL into frontend configuration instead of hard-coding it.
- Add automated backend and frontend tests.
- Add a production deployment configuration and CI workflow.

## Contributing

1. Create a feature branch:

   ```bash
   git checkout -b feature/your-change
   ```

2. Make and test your changes locally.
3. Commit your changes with a clear message.
4. Open a pull request explaining what changed and how it was tested.

## License

The backend package currently declares the `ISC` license. If this project is intended for wider distribution, add a root-level `LICENSE` file and update this section to match the project's final licensing decision.
