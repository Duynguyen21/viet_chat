import UserModel from "./../models/userModel";
import {transErrors} from "./../../lang/vi";
import bcrypt from "bcrypt";

let saltRounds = 10 ;
/**
 * Update user info
 * @param {userId} id 
 * @param {dataUpdate } item 
 */
let updateUser = (id, item) => {
  return UserModel.updateUser(id, item);
};

/**
 * Update password 
 * @param {userId} id 
 * @param {data Update} dataUpdate
 */
let updatePassword = (id, updateData) => {
  return new Promise(async (resolve, reject) => {
    let currentUser = await UserModel.findUserByIdToUpdatePassword(id);
    if (!currentUser) {
      return reject(transErrors.account_undefined);
    }

    let checkCurrentPassword = await currentUser.comparePassword(updateData.currentPassword);

    if (!checkCurrentPassword) {
      return reject(transErrors.user_current_password_failed);
    }

    let salt = bcrypt.genSaltSync(saltRounds);

    await UserModel.updatePassword(id, bcrypt.hashSync(updateData.newPassword, salt));
    resolve(true);
  });
};

module.exports = {
  updateUser : updateUser,
  updatePassword: updatePassword
};
