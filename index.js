const express = require('express');
const http = require('http');
const Server = require('socket.io').Server;
const cors = require('cors');
const  {roomHandler}  = require('./room');

const port=5000;

const app = express();
app.use(cors);
const server = http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});

io.on("connection",(socket)=>{
    console.log("user is connected");
    roomHandler({socket,io});
    socket.on("disconnect",()=>{
        console.log("user is disconnected");
    })
})


// Start the server

server.listen(port, () => {
    console.log(`Socket.IO server is running on port ${port}`);
});
