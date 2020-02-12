import {validationResult} from "express-validator/check";

let getLoginRegister =  (req, res) => {
  return res.render("auth/master");
};

let postRegister = (req, res) => {
  let errorArray = [];

  let validationError = validationResult(req);
  if(!validationError.isEmpty()){
    let errors = Object.values(validationError.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    console.log(errorArray);
    return;
  }
  console.log(req.body);

}

module.exports = {
  getLoginRegister : getLoginRegister,
  postRegister: postRegister
};
