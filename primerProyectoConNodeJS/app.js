//Servidor con NodeJs y ExpressJS

const express = require("express");
const path = require("path");
const app = express();

app.listen(4081, ()=>{
    console.log("Server running on port", 4081);
});

app.get("/", (req, res)=>{
    //res.send("Hello world");
    res.sendFile(path.join(__dirname + "/index.html"));
});