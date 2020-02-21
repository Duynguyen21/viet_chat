import {contact} from "./../services/index";
import {validationResult} from "express-validator/check";


let findUsersContact = async (req, res) => {
  let errorArray = [];

  let validationErrors = validationResult(req);

  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach(item => {
      errorArray.push(item.msg);
    });
    return res.status(500).send(errorArray);
  }
  try {
    let currentUserId = req.user._id;
    let keyword = req.params.keyword;
    let users = await contact.findUsersContact(currentUserId, keyword);
    return res.render("main/contacts/sections/_findUsersContact",{users});
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  findUsersContact: findUsersContact
};
