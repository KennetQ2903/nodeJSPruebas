//incluimos el modulo net para usar sockets
const net = require('net');
//creamos el servidor
const server = net.createServer();

//preparamos los sockets para recibir datos
server.on('connection', (socket)=>{
    socket.on('data', (data)=>{
        console.log("Mensaje recibido desde el cliente: " + data);
        socket.write("Mensaje recibido");
    });
    socket.on('close', ()=>{
        console.log('Comunicacion cerrada');
    });
    socket.on('error',(err)=>{
        console.log(err.message);
    });
});

//le decimos al servidor que este escuchando en la puerta 4000
server.listen(4000, ()=>{
    console.log("Server running in", server.address().port);
});