import bluebird from "bluebird";
import mongoose from "mongoose";

/**
 * Connect to MongoDB
 */
let connectDb =  () => {
  mongoose.Promise = bluebird;
  
  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  return mongoose.connect(URI, {useMongoClient: true});
};

module.exports = connectDb;
