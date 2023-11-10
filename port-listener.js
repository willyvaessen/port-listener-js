const net = require('net');

const portsToListen = [21, 22, 23, 24];

function handlePort23Connection(socket) {
  console.log('Custom function for port 23: Connection established');

  // Send a prompt to the client
  socket.write('Welcome to Port 23. Please enter something: ');

  socket.setEncoding('utf-8');


  // Handle data received from the client
  socket.on('data', data => {
    const userInput = data.toString().trim();
    console.log(`User input on port 23: ${userInput}`);

    // You can add your custom logic here based on user input

    // Send a response back to the client
    socket.write(`You entered: ${userInput}\n`);

    // Close the connection
    socket.end();
  });

  // Handle connection close
  socket.on('end', () => {
    console.log('Connection on port 23 closed');
  });

  // Handle errors
  socket.on('error', err => {
    console.error(`Error on port 23: ${err.message}`);
  });
}
function handlePort24Connection(socket) {
  console.log('Custom function for port 24: Connection established');

  // Send a prompt to the client
  socket.write('Welcome to Port 24. Please enter something: ');

  socket.setEncoding('utf-8');


  // Handle data received from the client
  socket.on('data', data => {
    const userInput = data.toString().trim();
    console.log(`User input on port 24: ${userInput}`);

    // You can add your custom logic here based on user input

    // Send a response back to the client
    socket.write(`You entered: ${userInput}\n`);

    // Close the connection
    socket.end();
  });

  // Handle connection close
  socket.on('end', () => {
    console.log('Connection on port 24 closed');
  });

  // Handle errors
  socket.on('error', err => {
    console.error(`Error on port 24: ${err.message}`);
  });
}

portsToListen.forEach(port => {
  const server = net.createServer(socket => {
    console.log(`Connection established on port ${port}`);

    // Check if the connection is on port 24
    if (port === 24) {
      handlePort24Connection(socket);
    } else {
      // Handle connections on other ports as needed
      // For example, you can just log the data received
      socket.on('data', data => {
        console.log(`Data received on port ${port}: ${data}`);
      });

      // Handle connection close
      socket.on('end', () => {
        console.log(`Connection on port ${port} closed`);
      });
    }
  });

  // Start listening on the specified port
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  // Handle server errors
  server.on('error', err => {
    console.error(`Error on port ${port}: ${err.message}`);
  });
});
