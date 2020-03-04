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

let removeContact = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
  
    let removeContact = await contact.removeContact(currentUserId, contactId);
    return res.status(200).send({success: !!removeContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};

let removeRequestContactSent = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
  
    let removeReqContact = await contact.removeRequestContactSent(currentUserId, contactId);
    return res.status(200).send({success: !!removeReqContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};

let removeRequestContactReceived = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
  
    let removeReqContact = await contact.removeRequestContactReceived(currentUserId, contactId);
    return res.status(200).send({success: !!removeReqContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};

let readMoreContacts = async (req, res) => {
  try {
      //get skip number from query param
      let skipNumberContacts = +(req.query.skipNumber);
      //  get mỏe item
     let newContactUser = await contact.readMoreContacts(req.user._id, skipNumberContacts);
     return res.status(200).send(newContactUser);
  } catch (error) {
    res.status(500).send(error)
  }
};

let readMoreContactsSent = async (req, res) => {
  try {
      //get skip number from query param
      let skipNumberContacts = +(req.query.skipNumber);
      //  get mỏe item
     let newContactUser = await contact.readMoreContactsSent(req.user._id, skipNumberContacts);
     return res.status(200).send(newContactUser);
  } catch (error) {
    res.status(500).send(error)
  }
};

let readMoreContactsReceived = async (req, res) => {
  try {
      //get skip number from query param
      let skipNumberContacts = +(req.query.skipNumber);
      //  get mỏe item
     let newContactUser = await contact.readMoreContactsReceived(req.user._id, skipNumberContacts);
     return res.status(200).send(newContactUser);
  } catch (error) {
    res.status(500).send(error)
  }
};

let approveRequestContactReceived = async (req, res) => {
  try {
    let currentUserId = req.user._id;
    let contactId = req.body.uid;
  
    let approveReqContact = await contact.approveRequestContactReceived(currentUserId, contactId);
    return res.status(200).send({success: !!approveReqContact});
  } catch (error) {
    return res.status(500).send(error);
  };
};

module.exports = {
  findUsersContact: findUsersContact,
  addNew: addNew,
  removeContact: removeContact,
  removeRequestContactSent: removeRequestContactSent,
  removeRequestContactReceived: removeRequestContactReceived,
  approveRequestContactReceived: approveRequestContactReceived,
  readMoreContacts: readMoreContacts,
  readMoreContactsSent: readMoreContactsSent,
  readMoreContactsReceived: readMoreContactsReceived,
};
