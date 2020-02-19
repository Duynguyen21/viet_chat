import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRouters from "./routers/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";
  
// init app
let app = express();

//Connect to DB
ConnectDB();

// Config Session
configSession(app);

// Config viewEngine
configViewEngine(app);

// Enable post data for request
app.use(bodyParser.urlencoded({extended: true}));

// Enable flash messages
app.use(connectFlash());

// Config PassportJS
app.use(passport.initialize());
app.use(passport.session());

// Init all  routers
initRouters(app);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () =>{
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
    
//   });
