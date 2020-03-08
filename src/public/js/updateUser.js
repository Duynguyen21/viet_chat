let userAvatar = null;
let userInfo = {};
let originAvatarSrc = null;
let originUserInfo = {};
let userUpdatePassword = {};


function callLogout () {
  let timerInterval;
  Swal.fire({
    position: "top-end",
    title: "Tự động đăng xuất sau 5 giây",
    html: "Thời gian: <strong></strong>",
    timer: 5000,
    onBeforOpen : () => {
      Swal.showLoading();
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector("strong").textContent = Math.ceil(Swal.getTimerLeft()/1000);
      }, 1000);
    },
    onClose: () => {
      clearInterval(timerInterval);
    }, 
  }).then((result) => {
    $.get("/logout", function(){
      location.reload();
    })
  })
};
function updateUserInfo() {
  $("#input-change-avatar").bind("change", function () {
    let fileData = $(this).prop("files")[0];
    let math = ["image/png", "image/jpg", "image/jpeg"];
    let limit = 1048576; //byte = 1 MB

    if ($.inArray(fileData.type, math) === -1) {
      alertify.notify("Kiểu file không hợp lệ, chỉ chấp nhận file jpg và png ", "error", 7);
      $(this).val(null);
      return false;
    }

    if (fileData.size > limit) {
      alertify.notify("Ảnh upload tối đa cho phép là 1 MB ", "error", 7);
      $(this).val(null);
      return false;
    }

    if (typeof (FileReader) != "undefined") {
      let imagePreview = $("#image-edit-profile");
      imagePreview.empty();

      let fileReader = new FileReader();
      fileReader.onload = function (element) {
        $("<img>", {
          "src": element.target.result,
          "class": "avatar img-circle",
          "id": "user-modal-avatar",
          "alt": "avatar"
        }).appendTo(imagePreview);
      }
      imagePreview.show();
      fileReader.readAsDataURL(fileData);

      let formData = new FormData();
      formData.append("avatar", fileData);

      userAvatar = formData;
    } else {
      alertify.notify("Trình duyệt của bạn không hỗ trợ FileReader", "error", 7)
    }
  });

  $("#input-change-userName").bind("change", function () {
    let username = $(this).val();
    let regexUsername = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
    if(!regexUsername.test(username) || username.length <= 3 || username.length > 17 ) {
      alertify.notify("Username giới hạn khoảng từ 3 - 17 ký tự và không chứa ký tự đặc biệt ", "error", 7);
      $(this).val(originUserInfo.username);
      delete userInfo.username;
      return false; 
    }
    userInfo.username = username;
  });

  $("#input-change-gender-male").bind("click", function () {
    let gender =  $(this).val();
    if(gender !== "male"){
      alertify.notify("Oops dữ liệu giới tính có vấn đề , bạn hack ư", "error", 7);
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $("#input-change-gender-female").bind("click", function () {
    let gender =  $(this).val();
    if(gender !== "female"){
      alertify.notify("Oops dữ liệu giới tính có vấn đề , bạn hack ư", "error", 7);
      $(this).val(originUserInfo.gender);
      delete userInfo.gender;
      return false;
    }
    userInfo.gender = gender;
  });

  $("#input-change-address").bind("change", function () {
    let address =  $(this).val();
    if(address.length <= 3 || address.length > 70 ){
      alertify.notify("Địa chỉ giới hạn 3 đến 70 ký tự ", "error", 7);
      $(this).val(originUserInfo.address);
      delete userInfo.address;
      return false;
    }

    userInfo.address = address;
  });

  $("#input-change-phone").bind("change", function () {
    
    let phone =  $(this).val();
    let regexPhone = new RegExp(/^(0)[0-9]{9,10}$/);
    if(!regexPhone.test(phone) || phone.length > 10){
      alertify.notify("Số điện thoại bắt đầu bằng số 0 và chỉ 10 ký tự", "error", 7);
      $(this).val(originUserInfo.phone);
      delete userInfo.phone;
      return false;
    }

    userInfo.phone = phone;
  });

  $("#input-change-current-pasword").bind("change", function () {
    
    let currentPassword =  $(this).val();
    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
    if(!regexPassword.test(currentPassword) || currentPassword.length < 8){
      alertify.notify("Mật Khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ số và ký tự đặc biệt", "error", 7);
      $(this).val(null);
      delete userUpdatePassword.currentPassword;
      return false;
    }

    userUpdatePassword.currentPassword = currentPassword;
  });

  $("#input-change-new-pasword").bind("change", function () {
    
    let newPassword =  $(this).val();
    let regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/);
    if(!regexPassword.test(newPassword)){
      alertify.notify("Mật Khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ số và ký tự đặc biệt", "error", 7);
      $(this).val(null);
      delete userUpdatePassword.newPassword;
      return false;
    }

    userUpdatePassword.newPassword = newPassword;
  });

  $("#input-change-confirm-new-pasword").bind("change", function () {
    
    let confirmNewPassword =  $(this).val();
    if(!userUpdatePassword.newPassword){
      alertify.notify("Bạn chưa nhập mật khẩu mới", "error", 7);
      $(this).val(null);
      delete userUpdatePassword.confirmNewPassword;
      return false;
    }

    if(confirmNewPassword !== userUpdatePassword.newPassword){
      alertify.notify("Mật khẩu không khớp, vui lòng nhập lại ", "error", 7);
      $(this).val(null);
      delete userUpdatePassword.confirmNewPassword;
      return false;
    }


    userUpdatePassword.confirmNewPassword = confirmNewPassword;
  });
}

function callUpdateAvatar() {
  $.ajax({
    url: "/user/update-avatar",
    type: "PUT", 
    cache: false,
    contentType: false,
    processData: false,
    data: userAvatar,
    success: function(result){
      //Displat success
      $(" .user-modal-alert-success " ).find("span").text(result.message);
      $(" .user-modal-alert-success " ).css("display", "block");

      //Update avatar at navbar for Home
      $("#navbar-avatar").attr("src", result.imageSrc);

      //Update origin AvatarSrc
      originAvatarSrc = result.imageSrc;

      //reset all
      $("#input-btn-cancel-update-user").click();

    },
    error: function(error){
      $(" .user-modal-alert-error " ).find("span").text(error.responseText);
      $(" .user-modal-alert-error " ).css("display", "block");
      //reset all
      $("#input-btn-cancel-update-user").click();
    },
  });
};

function callUpdateUserInfo() {
  $.ajax({
    url: "/user/update-info",
    type: "PUT", 
    data: userInfo,
    success: function(result){
      console.log(result);
      //Display success
      $(" .user-modal-alert-success " ).find("span").text(result.message);
      $(" .user-modal-alert-success " ).css("display", "block");

      originUserInfo = Object.assign(originUserInfo, userInfo);

      //Update user info at navbar for Home
      $("#navbar-username").text(originUserInfo.userInfo);

      //reset all
      $("#input-btn-cancel-update-user").click();
    },
    error: function(error){
      $(" .user-modal-alert-error " ).find("span").text(error.responseText);
      $(" .user-modal-alert-error " ).css("display", "block");
      //reset all
      $("#input-btn-cancel-update-user").click();
    },
  });
};

function callUpdateUserPassword() {
  $.ajax({
    url: "/user/update-password",
    type: "PUT", 
    data: userUpdatePassword,
    success: function(result){
      console.log(result);
      //Display success
      $(" .user-modal-password-alert-success " ).find("span").text(result.message);
      $(" .user-modal-password-alert-success " ).css("display", "block");

      //reset all
      $("#input-btn-cancel-update-user-password").click();

      // logout after success change password 

      callLogout();
    },
    error: function(error){
      $(" .user-modal-password-alert-error " ).find("span").text(error.responseText);
      $(" .user-modal-password-alert-error " ).css("display", "block");
      //reset all
      $("#input-btn-cancel-update-user-password").click();
    },
  });
};

$(document).ready(function () {
  originAvatarSrc = $("#user-modal-avatar").attr("src");

  originUserInfo = {
    username : $("#input-change-userName").val(),
    gender: ($("#input-change-gender-male").is(":checked")) ? $("#input-change-gender-male").val() : $("#input-change-gender-female").val(),
    address: $("#input-change-address").val(),
    phone: $("#input-change-phone").val()
  };

  //update user info after change value to update
  updateUserInfo();

  $("#input-btn-update-user").bind("click", function () {
    if ($.isEmptyObject(userInfo) && !userAvatar) {
      alertify.notify("Bạn phải thay đổi thông tin trước khi cập nhật dữ liệu ", "error", 7);
      return false;
    }
    if(userAvatar){
      callUpdateAvatar();
    };

    if(!$.isEmptyObject(userInfo)){
      callUpdateUserInfo();
    };
  
  });

  $("#input-btn-cancel-update-user").bind("click", function () {
    userAvatar = null;
    userInfo = {};

    $("#input-change-avatar").val(null);
    $("#user-modal-avatar").attr("src", originAvatarSrc);
    $("#input-change-userName").val(originUserInfo.username);
    (originUserInfo.gender === "male") ? $("#input-change-gender-male").click() : $("#input-change-gender-female").click();
    $("#input-change-address").val(originUserInfo.address);
    $("#input-change-phone").val(originUserInfo.phone);
  });

  $("#input-btn-update-user-password").bind("click", function () {
    if(!userUpdatePassword.currentPassword || !userUpdatePassword.newPassword || !userUpdatePassword.confirmNewPassword){
      alertify.notify("Bạn phải thay đổi đầy đủ thông tin ", "error", 7);
      return false;
    }
    Swal.fire({
      title: "Bạn chắc chắn muốn thay đổi mật khẩu chứ?",
      text: "Bạn không thể hoàn tác lại quá trình này!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: '#2ECC71',
      cancelButtonColor: '#ff7675',
      confirmButtonText: 'Xác nhận!',
      cancelButtonText: 'Hủy!',

    }).then((result) => {
      if(!result.value){
        $("#input-btn-cancel-update-user-password").click();
        return false;
      };
      callUpdateUserPassword();
    });
    
  });

  $("#input-btn-cancel-update-user-password").bind("click", function () {
    userUpdatePassword = {};
    $("#input-change-current-pasword").val(null);
    $("#input-change-new-pasword").val(null);
    $("#input-change-confirm-new-pasword").val(null)
  });

});
