

const io = require("socket.io")(8000,{ 
    cors: {
      origin: '*',
    }
})

const users = {}
io.on('connection', socket=>{

    // if new user joins let the other user know
    socket.on('new-user-joined', name=>{
        // console.log("new user", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    // if someone sends a message , brodcast the msg to others
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message : message , name: users[socket.id]});
    })
    // if someone leave the chat then pre defined disconnect works 
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})