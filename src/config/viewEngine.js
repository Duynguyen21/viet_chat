import express from "express";
import expressEjsExtend from "express-ejs-extend";

/**
 * Config view engine for app
 */
let configviewEngine = (app) => {
  //khai bao dia chi thu vien   
  app.use(express.static("./src/public"));
  //Cau hinh cho ejs them expressEjsExtend
  app.engine("ejs", expressEjsExtend);
  //set view engine cua ung dung la ejs
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};

module.exports = configviewEngine;
