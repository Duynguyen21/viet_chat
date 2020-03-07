function textAndEmojiChat (divId){
  $(".emojionearea").unbind("keyup").on("keyup", function(element){
    let curentEmojiOneArea = $(this);
    if(element.which === 13){
        let targetId = $(`#write-chat-${divId}`).data("chat");
        let messageVal = $(`#write-chat-${divId}`).val();

        if(!targetId.length || !messageVal.length){
          return false;
        };

        let dataTextEmojiForSend = {
          uid: targetId,
          messageVal: messageVal, 
        };

        if ($(`#write-chat-${divId}`).hasClass("chat-in-group") ) {
            dataTextEmojiForSend.isChatGroup = true;
        };

        $.post("/message/add-new-text-emoji", dataTextEmojiForSend, function(data){
            //sutep 1 handle message data before show
            let messageOfMe = $(`<div class="bubble me" data-mess-id="${data.message._id}"></div>`);
            if(dataTextEmojiForSend.isChatGroup ){
              messageOfMe.html(`<img src="/images/users/${data.message.avatar}" class="avatar-small" title="${data.message.name}">`);

              messageOfMe.text(data.message.text);
              increaseNumberMessageGroup(divId)
            }else{             
              messageOfMe.text(data.message.text);
            }

            
            let convertEmojiMessage = emojione.toImage(messageOfMe.html());
            messageOfMe.html(convertEmojiMessage);

            //step 2: append  message data to screen
            $(`.right .chat[data-chat = ${divId}]`).append(messageOfMe);
            nineScrollRight(divId);


            //step 3 :remove data input
            $(`#write-chat-${divId}`).val("");
            curentEmojiOneArea.find(".emojionearea-editor").text("");

            //step 4:  change data preview left side
            $(`.person[data-chat = ${divId}]`).find("span.time").html( moment(data.message.createdAt).locale("vi").startOf("seconds").fromNow());
            $(`.person[data-chat = ${divId}]`).find("span.priview").html(emojione.toImage(data.message.text)); 

            //step 5:  move conversation to the top
            $(`.person[data-chat = ${divId}]`).on("click.moveConversationToTheTop", function() {
              let dataToMove = $(this).parent();
              $(this).closest("ul").prepend(dataToMove);
              $(this).off("click.moveConversationToTheTop")
            });
            $(`.person[data-chat=${divId}]`).click();

        }).fail(function(response){
            //error
            alertify.notify(response.responseText, "error", 7);
        });
    };
  });
};
