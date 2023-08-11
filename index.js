const express = require('express');
const http = require('http');
const Server = require('socket.io').Server;
const cors = require('cors');

const port=5000;

const app = express();
const server = http.createServer(app);

const io=new Server(server);

io.on("connection",()=>{
    console.log("user is connected");
})


// Start the server

server.listen(port, () => {
    console.log(`Socket.IO server is running on port ${port}`);
});
