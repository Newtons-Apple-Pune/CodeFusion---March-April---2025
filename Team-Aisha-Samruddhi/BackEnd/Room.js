// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve static files from the 'build' directory
// const buildPath = path.resolve(__dirname, '..', 'FrontEnd','public');
// app.use(express.static(buildPath));

// // Define a route for the room page
// app.get('/room/:roomId', (req, res) => {
//     // Serve the main HTML file
//     res.sendFile(path.join(buildPath, 'index.html'));
// });

// // Start the server
// const port = process.env.PORT || 9000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
// Register Babel to transpile JSX code
require('@babel/register')({
    presets: ['@babel/preset-react']
  });
  
  const express = require('express');
  const cors = require('cors');
  const path = require('path');
  const ReactDOMServer = require('react-dom/server');
  const React = require('react');
  
  const app = express();
  const port = 9000;
  
  // Middleware for parsing JSON requests
  app.use(express.json());
  
  // Enable CORS for requests from http://localhost:3000
  app.use(cors({ origin: 'http://localhost:3000' }));
  
  // Define route for serving static files (if needed)
  // For example, if your React build output is in the 'build' directory:
  app.use(express.static(path.join(__dirname, 'build')));
  
  // Import your RoomPage component
  const RoomPage = require('.../Pages/room/RoomPage.jsx').default; // Replace with correct path
  
  // Define route for handling requests to /room/:roomId
  app.get('/room/:roomId', (req, res) => {
      // Render the RoomPage component and send it as response
      const roomId = req.params.roomId;
      const html = ReactDOMServer.renderToString(
          React.createElement(RoomPage, { roomId })
      );
      res.send(html);
  });
  
  // Start the server
  app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
  });
  
