function bufferToBase64(buffer) {
  return btoa(
    new Uint8Array(buffer) .reduce((data, byte) => data +  String.fromCharCode(byte), "")
  );
};  

function attachmentChat(divId){
  $(`#attachment-chat-${divId}`).unbind("change").on("change", function(){
    let fileData = $(this).prop("files")[0];
    let limit = 1048576; //byte = 1 MB

    if (fileData.size > limit) {
      alertify.notify("file upload tối đa cho phép là 1 MB ", "error", 7);
      $(this).val(null);
      return false;
    };

    let targetId = $(this).data("chat");
    let isChatGroup = false; 
 
    let messageFormData = new FormData();
    messageFormData.append("my-attachment-chat", fileData);
    messageFormData.append("uid", targetId);
 
 
     if ($(this).hasClass("chat-in-group") ) {
        messageFormData.append("isChatGroup", true);
        isChatGroup = true;
     };

     $.ajax({
      url: "/message/add-new-attachment",
      type: "post", 
      cache: false,
      contentType: false,
      processData: false,
      data: messageFormData,
      success: function(data) {
        console.log(data);  
        let dataToEmit ={
          message: data.message,            
        };
        
        //step 1 handle message data before show
        let messageOfMe = $(`<div class="bubble me bubble-attachment-file" data-mess-id="${data.message._id}"></div>`);

        let attachmentChat = `<a href="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}" 
        download="${data.message.file.fileName}">
        ${data.message.file.fileName}
        </a>`;

         if(isChatGroup) {
             let senderAvatar =`<img src="/images/users/${data.message.sender.avatar}" 
             class="avatar-small" title="${data.message.sender.name}">`;

             messageOfMe.html(`${senderAvatar} ${attachmentChat}`);

             increaseNumberMessageGroup(divId);
             dataToEmit.groupId = targetId;
         }else {             
           messageOfMe.html(imageChat);
           dataToEmit.contactId = targetId;
         };


           //step 2: append  message data to screen
           $(`.right .chat[data-chat = ${divId}]`).append(messageOfMe);
           nineScrollRight(divId);

           //step 4:  change data preview left side
           $(`.person[data-chat = ${divId}]`).find("span.time").removeClass("message-time-realtime").html( moment(data.message.createdAt).locale("vi").startOf("seconds").fromNow());
           $(`.person[data-chat = ${divId}]`).find("span.preview").html("File đính kèm ..."); 

           //step 5:  move conversation to the top
           $(`.person[data-chat = ${divId}]`).on("ckick.moveConversationToTheTop", function() {
            let dataToMove = $(this).parent();
            $(this).closest("ul").prepend(dataToMove);
            $(this).off("ckick.moveConversationToTheTop")
          });
          $(`.person[data-chat=${divId}]`).trigger("ckick.moveConversationToTheTop"); 

          //step 6 : Emit realtime
          socket.emit("chat-attachment", dataToEmit);

          //step 9:  Add message file to modal attachment
          let attachmentChatToAddModal = `<li>
                <a href="data:${data.message.file.contentType}; base64, ${bufferToBase64(data.message.file.data.data)}" 
                    download="${data.message.file.fileName}">
                    ${data.message.file.fileName}
                </a>
            </li>`;
          
          $(`#attachmentsModal_${divId}`).find("ul.list-attachments").append(attachmentChatToAddModal);

      },
      error: function(error) {
        alertify.notify(error.responseText, "error", 7);
      },
    });
  });
};

$(document).ready(function(){
  socket.on("response-chat-attachment", function(response){
    let divId = "";

     //step 1 handle message data before show
     let messageOfYou = $(`<div class="bubble you  bubble-attachment-file" data-mess-id="${response.message._id}"></div>`);

     let attachmentChat = `<a href="data:${response.message.file.contentType}; base64, ${bufferToBase64(response.message.file.data.data)}" 
        download="${response.message.file.fileName}">
        ${response.message.file.fileName}
        </a>`;
 
 
       if(response.currentGroupId) {
         let senderAvatar =`<img src="/images/users/${response.message.sender.avatar}" 
         class="avatar-small" title="${response.message.sender.name}">`;
 
         messageOfYou.html(`${senderAvatar} ${attachmentChat}`);
 
         divId = response.currentGroupId;
 
         if(response.currentUserId !== $("#dropdown-navbar-user").data("uid")){
         increaseNumberMessageGroup(divId);
       }; 
      }else {             
        messageOfYou.html(attachmentChat);
        divId = response.currentUserId;
      };


        //step 2: append  message data to screen
        if(response.currentUserId !== $("#dropdown-navbar-user").data("uid")){
          $(`.right .chat[data-chat = ${divId}]`).append(messageOfYou);
          nineScrollRight(divId);
          $(`.person[data-chat = ${divId}]`).find("span.time").addClass("message-time-realtime");
        };

        //step 4:  change data preview left side
      $(`.person[data-chat = ${divId}]`).find("span.time").html(moment(response.message.createdAt).locale("vi").startOf("seconds").fromNow());
      $(`.person[data-chat = ${divId}]`).find("span.preview").html("Tệp đính kèm ..."); 

       //step 5:  move conversation to the top . ckick set for me
       $(`.person[data-chat = ${divId}]`).on("ckick.moveConversationToTheTop", function() {
        let dataToMove = $(this).parent();
        $(this).closest("ul").prepend(dataToMove);
        $(this).off("ckick.moveConversationToTheTop")
      });
      $(`.person[data-chat=${divId}]`).trigger("ckick.moveConversationToTheTop");


        //step 9:  Add message file to modal attachment
        let attachmentChatToAddModal = `<li>
            <a href="data:${response.message.file.contentType}; base64, ${bufferToBase64(response.message.file.data.data)}" 
                download="${response.message.file.fileName}">
                ${response.message.file.fileName}
            </a>
        </li>`;
        
        $(`#attachmentsModal_${divId}`).find("ul.list-attachments").append(attachmentChatToAddModal);
  });
});
