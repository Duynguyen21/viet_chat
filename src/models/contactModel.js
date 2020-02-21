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
  * remove requesst contact
   * @param{} userId
   * @param{} contactId
  */
  removeRequestContact(userId, contactId){
    return this.remove({
      $and: [
        {"userId": userId},
        {"contactId": contactId},
      ]
    }).exec();
  },
  
};

module.exports = mongoose.model("contact", ContactSchema);
