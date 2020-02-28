import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: { type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null},
});

ContactSchema.statics = {
  createNew(item){
    return this.create(item);
  },

 /**Find all items that related with user
  * @Param {string} userId
  */
  findAllByUser (userId){
    return this.find({
      $or: [
        {"userId": userId},
        {"contactId": userId},
      ]
    }).exec();
  },
  /**
   * Check exist of 2 user
   * @param{} userId
   * @param{} contactId
   */
  checkExists(userId, contactId){
    return this.findOne({
      $or:  [
        {$and: [
          {"userId": userId},
          {"contactId": contactId},
        ]},
        {$and: [
          {"userId": contactId},
          {"contactId": userId},
        ]},
      ]
    }).exec();
  },
 /**
  * remove requesst contact sent
   * @param{} userId
   * @param{} contactId
  */
 removeRequestContactSent(userId, contactId){
    return this.remove({
      $and: [
        {"userId": userId},
        {"contactId": contactId},
      ]
    }).exec();
  },

   /**
  * remove request contact received
   * @param{} userId
   * @param{} contactId
  */
 removeRequestContactReceived(userId, contactId){
  return this.remove({
    $and: [
      {"contactId": userId},
      {"userId": contactId},
    ]
  }).exec();
},


  /**
   * get contact by user by id
   * @param {string} userId 
   * @param {number} limit 
   */
  getContacts(userId, limit){
    return this.find({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).sort({"createdAt": -1 }).limit(limit).exec();
  },

  /**
   * get contacts sent userId and limit 
   * @param {string} userId 
   * @param {number} limit 
   */
  getContactsSent(userId, limit){
    return this.find({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1 }).limit(limit).exec();
  },
  
    /**
   * get contacts receiver userId and limit 
   * @param {string} userId 
   * @param {number} limit 
   */
  getContactsReceived(userId, limit){
    return this.find({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1 }).limit(limit).exec();
  },

  /**
   * count contact by userId
   * @param {string} userId 
   */
  countAllContacts(userId){
    return this.count({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).exec();
  },

   /**
   * count contact sent userId
   * @param {string} userId 
   */
  countAllContactsSent(userId){
    return this.count({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).exec();
  },

   /**
   * count contact received userId
   * @param {string} userId 
   */
  countAllContactsReceived(userId){
    return this.count({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).exec();
  },

  /**
   * 
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  readMoreContacts(userId, skip, limit){
    return this.find({
      $and: [
        {$or: [
          {"userId": userId},
          {"contactId": userId}
        ]},
        {"status": true}
      ]
    }).sort({"createdAt": -1 }).skip(skip).limit(limit).exec();
  },

  /**
   * 
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  readMoreContactsSent(userId, skip, limit){
    return this.find({
      $and: [
        {"userId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1 }).skip(skip).limit(limit).exec();
  },

  /**
   * 
   * @param {string} userId 
   * @param {number} skip 
   * @param {number} limit 
   */
  readMoreContactsReceived(userId, skip, limit){
    return this.find({
      $and: [
        {"contactId": userId},
        {"status": false}
      ]
    }).sort({"createdAt": -1 }).skip(skip).limit(limit).exec();

  },
};

module.exports = mongoose.model("contact", ContactSchema);
