const http = require('http');
const url = require('url');
const net = require('net');
const fs = require('fs');
const path = require('path');

// // Create an interface for reading from the terminal
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// Function to handle HTTP requests

// Create an HTTP server
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  // Serve the HTML file when the root path is requested
  if (reqUrl.pathname === '/' || reqUrl.pathname === '/index.html') {
    const htmlPath = path.join(__dirname, 'index.html');

    // Read the HTML file
    fs.readFile(htmlPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Handle other requests, e.g., stylesheets or scripts
    // Add more cases as needed
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Create a TCP server for Telnet connections
const telnetServer = net.createServer((socket) => {
  // Connection event
  console.log('Telnet client connected');

  // Send a welcome message to the client
  socket.write('Welcome to the Bulletin Board System over Telnet!\n');

    // Prompt the user to enter their name
  socket.write('Enter your name: ');


  // Event handler for data received from the client
  socket.on('data', (data) => {
    const name = data.toString().trim();
    console.log(`Telnet data received: ${name}`);

    // You can implement your Telnet-specific logic here
    socket.write(`Hello, ${name}! This is your Bulletin Board System over Telnet.\n`);
    socket.end();
  });

  // Event handler for the connection termination
  socket.on('end', () => {
    console.log('Telnet client disconnected');
  });
});

const HTTP_PORT = 3000;
const TELNET_PORT = 4000;

// Start both servers
server.listen(HTTP_PORT, () => {
  console.log(`HTTP server running at http://localhost:${HTTP_PORT}/`);
});

telnetServer.listen(TELNET_PORT, () => {
  console.log(`Telnet server running at port ${TELNET_PORT}`);
});
