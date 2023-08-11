const { v4: uuidv4 } = require('uuid');

const rooms = {};

const roomHandler = ({socket,io}) => {
    const joinRoom = ({ roomId, peerId }) => {
        if (rooms[roomId]) {
            for(let i=0;i<rooms[roomId].length;i++)
            {
                if(rooms[roomId][i]===peerId)
                {
                    return ;
                }
            }
            console.log(roomId)
            rooms[roomId].push(peerId);
            socket.join(roomId);
            socket.to(roomId).emit("user-joined",{peerId});
            socket.emit("get-users", {
                roomId,
                participants: rooms[roomId]
            });
        }

        socket.on("disconnect",()=>{
            console.log("user left the room",peerId);
            leaveRoom({roomId,peerId});
        })


    }
    const createRoom = () => {
        const roomId = uuidv4();
        rooms[roomId] = [];
        socket.emit("room-created", { roomId });
        console.log("user created the room");
    }

    const leaveRoom=({peerId,roomId})=>{
        if(rooms[roomId])
        {
            for(let i=0;i<rooms[roomId].length;i++)
            {
                if(rooms[roomId][i]===peerId)
                {
                    rooms[roomId].splice(i,1);
                    break;
                }
            }
            socket.to(roomId).emit("user-disconnected",peerId);
        }
    }

    socket.on("create-room", createRoom)
    socket.on("join-room", joinRoom)
}
module.exports = { roomHandler };
