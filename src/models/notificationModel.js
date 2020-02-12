import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  sender: {
    id: String,
    userName: String,
    avatar: String,
  },
  receiver: {
    id: String,
    userName: String,
    avatar: String,
  },
  tepe: String,
  content: String,
  isread: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
});

module.exports = mongoose.model("notification", NotificationSchema);
