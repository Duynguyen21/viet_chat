function removeRequestContactReceived () {
  $(".user-remove-request-contact-sent").unbind("click").on("click", function() {
    let targetId = $(this).data("uid");
      $.ajax({
        url: "/contact/remove-request-contact-received",
        type: "delete",
        data: {uid: targetId},
        success: function(data){
          if(data.success){       

        //  $(".noti_content").find(`div[data-uid = ${user.id}]`).remove();// delete popup 
        //  $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove();
        //  decreaseNumberNotification("noti_counter", 1); //js/caculateNotification.js


          decreaseNumberNotification("noti_contact_counter", 1); //js/caculateNotification.js

          decreaseNumberNotifContact("count-request-contact-received"); //js/caculateNotifiContact.js

            // Xóa ở modal tab yêu cầu kết bạn  
          $("#request-contact-received").find(`li[data-uid = ${targetId}]`).remove();
         

          socket.emit("remove-request-contact-received", {contactId: targetId});
        };
      },
    });
  });
};

socket.on("response-remove-request-contact-received", function(user){

  $("#find-user").find(`div.user-remove-request-contact-received[data-uid = ${user.id}]`).hide();
  $("#find-user").find(`div.user-add-new-contact[data-uid = ${user.id}]`).css("display", "inline-block"); 

  $("#request-contact-sent").find(`li[data-uid = ${user.id}]`).remove(); 

   decreaseNumberNotifContact("count-request-contact-sent"); //js/caculateNotifiContact.js

   decreaseNumberNotification("noti_contact_counter", 1); //js/caculateNotification.js
});

$(document).ready(function(){
  removeRequestContactReceived();
});
