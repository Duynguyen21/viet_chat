/**
 * Created by https://trungquandev.com's author on 25/02/2018.
 */

 const socket = io();

function nineScrollLeft() {
  $('.left').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
};

function nineScrollRight(divId) {
  $(`.right .chat[data-chat = ${divId}]`).niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
  $(`.right .chat[data-chat = ${divId}]`).scrollTop($(`.right .chat[data-chat = ${divId}]`)[0].scrollHeight);
};

function enableEmojioneArea(divId) {
  $(`#write-chat-${divId}`).emojioneArea({
    standalone: false,
    pickerPosition: 'top',
    filtersPosition: 'bottom',
    tones: false,
    autocomplete: false,
    inline: true,
    hidePickerOnBlur: true,
    search: false,
    shortnames: false,
    events: {
      keyup: function(editor, event) {
        //gắn giá trị thay đổi vào thẻ input đã bị ẩn
        $(`#write-chat-${divId}`).val(this.getText());
      },
      click: function(){
        //bật lắng nghe  DOM cho việc chat tin nhắn văn bản và emoji
        textAndEmojiChat(divId);
        // bật chức năng typing 
        typingOn(divId);
        
      },
      blur: function(){
        //tắt chức năng typing
        typingOff(divId);
      }
    },
  });
  $('.icon-chat').bind('click', function(event) {
    event.preventDefault();
    $('.emojionearea-button').click();
    $('.emojionearea-editor').focus();
  });
};

function spinLoaded() {
  $('.master-loader').css('display', 'none');
};

function spinLoading() {
  $('.master-loader').css('display', 'block');
};

function ajaxLoading() {
  $(document)
    .ajaxStart(function() {
      spinLoading();
    })
    .ajaxStop(function() {
      spinLoaded();
    });
};

function showModalContacts() {
  $('#show-modal-contacts').click(function() {
    $(this).find('.noti_contact_counter').fadeOut('slow');
  });
};

function configNotification() {
  $('#noti_Button').click(function() {
    $('#notifications').fadeToggle('fast', 'linear');
    $('.noti_counter').fadeOut('slow');
    return false;
  });
  $(".main-content").click(function() {
    $('#notifications').fadeOut('fast', 'linear');
  });
};

function gridPhotos(layoutNumber) {
  $(".show-images").unbind("click").on("click", function(){
    let href = $(this).attr("href");
    let modalImagesId = href.replace("#", "");

    let originalDataImage = $(`#${modalImagesId}`).find("div.modal-body").html();

    let countRows = Math.ceil($(`#${modalImagesId}`).find("div.all-images>img").length / layoutNumber);
    let layoutStr = new Array(countRows).fill(layoutNumber).join("");

    $(`#${modalImagesId}`).find("div.all-images").photosetGrid({
      highresLinks: true,
      rel: "withhearts-gallery",
      gutter: "2px",
      layout: layoutStr,
      onComplete: function() {
        $(`#${modalImagesId}`).find(".all-images").css({
          "visibility": "visible"
        });
        $(`#${modalImagesId}`).find(".all-images a").colorbox({
          photo: true,
          scalePhotos: true,
          maxHeight: "90%",
          maxWidth: "90%"
        }); 
      }
    });

    $(`#${modalImagesId}`).on('hidden.bs.modal', function () {
      $(this).find("div.modal-body").html(originalDataImage);
    });
  });
};

function addFriendsToGroup() {
  $('ul#group-chat-friends').find('div.add-user').bind('click', function() {
    let uid = $(this).data('uid');
    $(this).remove();
    let html = $('ul#group-chat-friends').find('div[data-uid=' + uid + ']').html();

    let promise = new Promise(function(resolve, reject) {
      $('ul#friends-added').append(html);
      $('#groupChatModal .list-user-added').show();
      resolve(true);
    });
    promise.then(function(success) {
      $('ul#group-chat-friends').find('div[data-uid=' + uid + ']').remove();
    });
  });
};

function cancelCreateGroup() {
  $('#cancel-group-chat').bind('click', function() {
    $('#groupChatModal .list-user-added').hide();
    if ($('ul#friends-added>li').length) {
      $('ul#friends-added>li').each(function(index) {
        $(this).remove();
      });
    }
  });
};

function flashMasterNotify() {
  let notify = $(".master-success-message").text();
  if(notify.length){
    alertify.notify(notify, "success", 7);
  }
};

function changeTypeChat() {
  $("#select-type-chat").bind("change", function() {
    let optionSelected = $("option:selected", this);
    optionSelected.tab("show");
    
    if($(this).val() =="user-chat"){
      $(".create-group-chat").hide();
    }else {
      $(".create-group-chat").show();
    }
  });
};

function changeScreenChat() {
  $(".room-chat").unbind("click").on("click", function() {
    //Cấu hình thanh cuộn bên box chat
    let divId  = $(this).find("li").data("chat");

    $(".person").removeClass("active");
    $(`.person[data-chat = ${divId}]`).addClass("active");
    $(this).tab("show");
    
    nineScrollRight(divId);

    // Bật emoji, tham số truyền vào là id của box nhập nội dung tin nhắn
    enableEmojioneArea(divId);

    //bật lắng nghe cho việc chat hình ảnh
    imageChat(divId);

    //bật lắng nghe cho việc gởi file
    attachmentChat(divId);

  });
};

function convertEmoji() {
      $(".convert-emoji").each(function() {
          var original = $(this).html();
          // use .shortnameToImage if only converting shortnames (for slightly better performance)
          var converted = emojione.toImage(original);
          $(this).html(converted);
  });
};

$(document).ready(function() {
  // Hide số thông báo trên đầu icon mở modal contact
  showModalContacts();

  // Bật tắt popup notification
  configNotification();

  // Cấu hình thanh cuộn
  nineScrollLeft();

  // Icon loading khi chạy ajax
  ajaxLoading();

  // Hiển thị hình ảnh grid slide trong modal tất cả ảnh, tham số truyền vào là số ảnh được hiển thị trên 1 hàng.
  // Tham số chỉ được phép trong khoảng từ 1 đến 5
  gridPhotos(5);

  // Thêm người dùng vào danh sách liệt kê trước khi tạo nhóm trò chuyện
  addFriendsToGroup();

  // Action hủy việc tạo nhóm trò chuyện
  cancelCreateGroup();

  //Flash message ở màn hình master
  flashMasterNotify();

  //thay đổi kiểu trò chuyện
  changeTypeChat();

  //thay đổi màn hình chat
  changeScreenChat();

  //convert unicode thành các hình ảnh cảm xúc
  convertEmoji();

  if($("ul.people").find("a").length){
    $("ul.people").find("a")[0].click();
  };

});
