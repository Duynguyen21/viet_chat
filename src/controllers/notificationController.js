import {notification} from "./../services/index";

let readMore = async(req, res) => {
    try {
      //get skip number from query param
      let skipNumberNotification = +(req.query.skipNumber);
      //  get mỏe item
     let newNotification = await notification.readMore(req.user._id, skipNumberNotification);
     return readMorees.status(200).send(newNotification);
    } catch (error) {
      return res.status(500).send(error); 
    }
};

module.exports = {
  readMore: readMore
};
