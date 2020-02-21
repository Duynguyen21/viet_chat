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

let addNew = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
  
    let newContact = await contact.addNew(currentUserId, contactId);

    return res.status(200).send({success: !!newContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};

let removeRequestContact = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
  
    let removeReqContact = await contact.removeRequestContact(currentUserId, contactId);
    return res.status(200).send({success: !!removeReqContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};

module.exports = {
  findUsersContact: findUsersContact,
  addNew: addNew,
  removeRequestContact: removeRequestContact
};
