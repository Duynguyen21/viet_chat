import express from "express";

let app = express();

let hostname = "localhost";
let port= 8021;

app.get("/", (req, res)=>{
    res.send("<h1>Hello World</h1>")
});

app.listen(port, hostname, () =>{
    console.log(`Hello Duy Nguyen,Im running at: ${hostname}:${port}/`)
})
