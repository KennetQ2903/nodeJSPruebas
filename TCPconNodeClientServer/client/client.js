//incluimos el modulo net para usar sockets
const net = require('net');

//modulo npm install readline-sync (leer mensajes desde la consola)
const readline = require('readline-sync');
//creamos un objeto con los parametros de a donde se conectara nuestro cliente
const options = {
    port: 4000,
    host: '127.0.0.1'
}

//creamos una variable que creara una conexion
const client = net.createConnection(options);
//conectamos al server y enviamos un mensaje
client.on('connect', ()=>{
    console.log("Conexion exitosa");
    sendLine();
});
//recibimos la respuesta del server
client.on('data', (data)=>{
    console.log("El servidor dice: " + data);
    sendLine();
});
//metodo por error
client.on('error',(err)=>{
    console.log(err.message);
});

//funcion para enviar un mensaje escrito por el cliente al servidor
function sendLine(){
    var line = readline.question("\nDigite su mensaje:\n");
    if(line == "0"){
        client.end();
    }else{
        client.write(line);
    }
}
