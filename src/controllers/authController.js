import {validationResult} from "express-validator/check";
import {auth} from "./../services/index";

let getLoginRegister =  (req, res) => {
  return res.render("auth/master",{
    errors: req.flash("errors"),
    success: req.flash("success")
  });
};

let postRegister = async (req, res) => {
  let errorArray = [];
  let successAray = [];

  let validationError = validationResult(req);
  if(!validationError.isEmpty()){
    let errors = Object.values(validationError.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    req.flash("errors", errorArray);
    return res.redirect("/login-register");
  }

  try {
   let createdUserSuccess = await auth.register(req.body.email, req.body.gender, req.body.password);
    successAray.push(createdUserSuccess);
    req.flash("success", successAray);
    return res.redirect("/login-register");
  } catch (error) {
    errorArray.push(error);  
    req.flash("errors", errorArray);
    return res.redirect("/login-register");
  }

}

module.exports = {
  getLoginRegister : getLoginRegister,
  postRegister: postRegister
};
