# Campus Lost & Found

Campus Lost & Found is a simple website that helps students report and find lost items on campus.

## Features

- View lost and found items
- Add a new lost or found item
- Show item details such as location, date, description, and contact email
- Delete an item when it is no longer needed

## Technologies used

- HTML
- CSS
- JavaScript
- Node.js and Express
- MongoDB
- Mongoose
- Bootstrap

## Project structure

```text
campus-lost-found/
├── backend/     # Server and database code
└── frontend/    # Website pages, styles, and JavaScript
```

## How to run the project

### 1. Download the project

```bash
git clone https://github.com/Kailash-Rooj/campus-lost-found.git
cd campus-lost-found
```

### 2. Start the backend

```bash
cd backend
npm install
```

Create a file named `.env` inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:

```bash
node index.js
```

### 3. Open the frontend

From the project folder, run:

```bash
python -m http.server 5500 --directory frontend
                  OR
Alternatively, you can use the VS Code Live Server extension.
```

Then open this address in your browser:

```text
http://localhost:5500
```

## API routes

- `GET /api/items` - View all items
- `POST /api/items` - Add a new item
- `DELETE /api/items/:id` - Delete an item

## Important note

Make sure MongoDB is running and the backend server is started before opening the frontend.

