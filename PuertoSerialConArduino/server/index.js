//inicializamos el modulo express el cual nos servira para el servidor
const express = require('express');

//inicializamos socket.io la cual nos permitira enviar datos en tiempo real a muchos clientes
const socketIo = require('socket.io');
const http = require('http');

//configuramos el servidor donde app es el server express 
//y server es el servidor http que se basa en app 
//y le decimos a socket que este atento a server
const app = express();
const server = http.createServer(app); 
const io = socketIo(server); //le decimos que escuche al servidor

//nos avisa de una conexion de un cliente
io.on('connection', (socket)=>{
    console.log("A new socket connected");
});

//le decimos que al acceder al servidor devuelva un html
app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/index.html');
});

const serialPort = require('serialport'); // instalamos el modulo de puertos serial

//le damos la propiedad de poder leer los datos del puerto serial
const readLine = serialPort.parsers.Readline;
const parser = new readLine();
//le decimos a que puerto se conectara y a que baudios
const mySerial = new serialPort('COM3', {
    baudRate: 9600
});

//le damos una funcion cuando se conecte
mySerial.on('open', ()=>{
    console.log("Serial port opened");
});

//le decimos que cuando reciba datos los muestre
mySerial.on('data', (data)=>{
    console.log(data.toString()); //lo transformamos a string ya que los envia en formato binario
    io.emit('arduino:data', {
        value: data.toString()
    });
});
//en dado caso ocurra un error
mySerial.on('err', (err)=>{
    console.log(err.message);
});

server.listen(4080, ()=>{
    console.log("Server running on port ", 4080);
});
