import {validationResult} from "express-validator/check";
import {auth} from "./../services/index";
import { transSuccess } from "../../lang/vi";

let getLoginRegister =  (req, res) => {
  return res.render("auth/master",{
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let postRegister = async (req, res) => {
  let errorArray = [];
  let successAray = [];

  let validationErrors = validationResult(req);
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    req.flash("errors", errorArray);
    return res.redirect("/login-register");
  }

  try {
   let createdUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password, req.protocol, req.get("host"));
    successAray.push(createdUserSuccess);
    req.flash("success", successAray);
    return res.redirect("/login-register");
    
  } catch (error) {
    errorArray.push(error);  
    req.flash("errors", errorArray);
    return res.redirect("/login-register");
  }
};

let verifyAccount = async(req, res) => {
  let errorArray = [];
  let successAray = []
  try {
    let verifySuccess = await auth.verifyAccount(req.params.token);
    successAray.push(verifySuccess);
    req.flash("success", successAray);
    return res.redirect("/login-register");

  } catch (error) {
    errorArray.push(error);
    req.flash("errors", errorArray);
    return res.redirect("/login-register");
  }
};

let getLogout = (req, res) => {
  req.logout(); //remove session passport user
  req.flash("success", transSuccess.logoutSuccess);
  return res.redirect("/login-register");
};

let checkLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()){
    return res.redirect("/login-register");
  }
  next();
};

let checkLoggedOut = (req, res, next) => {
  if (req.isAuthenticated()){
    return res.redirect("/");
  }
  next();
};

module.exports = {
  getLoginRegister : getLoginRegister,
  postRegister: postRegister,
  verifyAccount: verifyAccount,
  getLogout: getLogout,
  checkLoggedIn: checkLoggedIn,
  checkLoggedOut: checkLoggedOut
};
