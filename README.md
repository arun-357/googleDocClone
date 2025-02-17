# Google Doc Clone

This project is a real-time collaborative text editor similar to Google Docs. It uses Node.js, Express, MongoDB, and Socket.io on the server side, and React with Quill.js on the client side.

## Features

- Real-time collaborative editing
- Rich text formatting
- Document persistence

## Technologies Used

- Node.js
- React.js
- MongoDB
- Socket.io
- Quill.js
- TypeScript

## Setup Instructions

### Server Setup

1. Navigate to the server directory:

   ```sh
   cd /c:/Projects/googleDocClone/server
   ```

2. Install server dependencies:

   ```sh
   npm install
   ```

3. Start the MongoDB server:

   ```sh
   mongod
   ```

4. Start the server:
   ```sh
   node server.js
   ```

### Client Setup

1. Navigate to the client directory:

   ```sh
   cd /c:/Projects/googleDocClone/client
   ```

2. Install client dependencies:

   ```sh
   npm install
   ```

3. Start the client:
   ```sh
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. You will be redirected to a new document URL.
3. Share the document URL with others to collaborate in real-time.

## Project Structure

- `server/`: Contains the server-side code.
- `client/`: Contains the client-side code.

## License

This project is licensed under the MIT License.
