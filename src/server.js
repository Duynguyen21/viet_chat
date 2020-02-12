import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRouters from "./routers/web";

// init app
let app = express();

//Connect to DB
ConnectDB();

// Config viewEngine
configViewEngine(app);

// Init all  routers
initRouters(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
    console.log(`Hello Duy Nguyen,Im running at: ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
})
