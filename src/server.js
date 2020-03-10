import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRouters from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import session from "./config/session";
import passport from "passport";
import http from "http";
import socketio from "socket.io";
import initSockets from "./sockets/index";
import cookieParser from "cookie-parser";
import configSocketIo from "./config/socketio";


  
// init app
let app = express();

// init server with socket.io and express app
let server =  http.createServer(app);
let io = socketio(server);

//Connect to DB
ConnectDB();

// Config Session
session.config(app);

// Config viewEngine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// Enable flash messages
app.use(connectFlash());

// User cookie parser
app.use(cookieParser());

// Config PassportJS
app.use(passport.initialize());
app.use(passport.session());

// Init all  routers
initRouters(app);

// Config for socket.io
configSocketIo(io, cookieParser, session.sessionStore);

// init all socket
initSockets(io);

server.listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
    console.log(`Hello Duy Nguyen,Im running at: ${process.env.APP_HOST}:${process.env.APP_PORT}/`)
});

// import pem from "pem";
// import https from "https";

// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err;
//     } // init app
//     let app = express();
    
//     //Connect to DB
//     ConnectDB();
    
//     // Config Session
//     configSession(app);
    
//     // Config viewEngine
//     configViewEngine(app);
    
//     // Enable post data for request
//     app.use(bodyParser.urlencoded({extended: true}));
    
//     // Enable flash messages
//     app.use(connectFlash());
    
//     // Config PassportJS
//     app.use(passport.initialize());
//     app.use(passport.session());
    
//     // Init all  routers
//     initRouters(app);
    
//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
//         console.log(`Hello Duy Nguyen,Im running at: ${process.env.APP_HOST}:${process.env.APP_PORT}/`);
//     }); 

//   })
