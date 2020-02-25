function markNotificationAsRead(targetUsers){
  $.ajax({
    url: "/notification/mark-all-as-read",
    type: "put",
    data: {targetUsers: targetUsers},
    success: function(result){
      if(result){
        targetUsers.forEach(function(uid){
          $(".noti_content").find(`div[data-uid =${uid}]`).removClass("notif-reader-false");
          $("ul.list_notifications").find(`div[data-uid =${uid}]`).removClass("notif-reader-false");
        });
        decreaseNumberNotification("noti_counter", targetUsers.length);
      }
    }
  })
};

$(document).ready(function() {
  // link at popup notification
  $("#popup-mark-notif-as-read").bind("click", function() {
    let targetUsers = [];
    $(".noti_content").find("div.notif-reader-false").each(function(index, notification){
      targetUsers.push($(notification).data("uid"));
    });

    if(!targetUsers.length){
      alertify.notify("Bạn không còn thông báo nào chưa được đọc", "error", 7);
      return false;
    };

    markNotificationAsRead(targetUsers);
  });
  // link at modal notification
  $("#modal-mark-notif-as-read").bind("click", function() {
    let targetUsers = [];
    $("ul.list_notifications").find("li>div.notif-reader-false").each(function(index, notification){
      targetUsers.push($(notification).data("uid"));
    });
    if(!targetUsers.length){
      alertify.notify("Bạn không còn thông báo nào chưa được đọc", "error", 7);
      return false;
    };
    markNotificationAsRead(targetUsers);
  });
});
