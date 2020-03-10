import {pushSocketIdToArray, removeSocketIdFromArray} from "./../../helpers/socketHelper";

/**
 * @param {io} from socket.io lib
 */
let userOnlineOffline = (io) => {
  let clients ={};

  io.on("connection",(socket) => {
    clients =  pushSocketIdToArray(clients, socket.request.user._id, socket.id);
    socket.request.user.chatGroupIds.forEach(group => {
      clients =  pushSocketIdToArray(clients, group._id, socket.id);
    });
    require('events').EventEmitter.defaultMaxListeners = 15;
    
    let listUserOnline = Object.keys(clients);
    //step 01 : Emit to user after login or refresh web page
    socket.emit("server-send-list-users-online",listUserOnline);

    //step 02: Emit to all another users when has new user online
    socket.broadcast.emit("server-send-when-new-user-online", socket.request.user._id);



    socket.on("disconnect", () => {
          clients= removeSocketIdFromArray(clients, socket.request.user._id, socket);
          socket.request.user.chatGroupIds.forEach(group => {
            clients= removeSocketIdFromArray(clients, group._id, socket);
        });
        //step 03: Emit to all user when user offline
        socket.broadcast.emit("server-send-when-new-user-offine", socket.request.user._id);
    });
  });
}; 

module.exports = userOnlineOffline;
