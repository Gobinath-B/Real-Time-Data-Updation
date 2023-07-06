const {Server} = require("socket.io");
const events = require('events');

const io = new Server({
    cors :{
        origin:"*",
    }
});

var likes = 0;

var eventEmitter = new events.EventEmitter();

setInterval(()=>{
    likes++;
    eventEmitter.emit("newdata");20000
})
 
io.on("connection",(socket)=>{
    console.log("socket connected");

    socket.emit('likeupdate',likes);
    socket.on('liked',()=>{
        likes++,
        socket.emit('likeupdate',likes);
        socket.broadcast.emit('likeupdate', likes);
    })

    eventEmitter.on("newdata",()=>{
        socket.broadcast.emit('likeupdate', likes);
    })
})

io.listen(3000);