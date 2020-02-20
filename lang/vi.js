export const transValidation = {
  email_incorrect: "Email phải có dạng example@gmail.com",
  gender_incorrect: "What the hell",
  password_incorrect: "Mật Khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ số và ký tự đặc biệt",
  password_confirmation_incorrect: "Mật khẩu chưa chính xác",
  update_username: "Username giới hạn khoảng từ 3 - 17 ký tự và không chứa kys tự đặc biệt ",
  update_gender: "Oops dữ liệu giới tính có vấn đề , bạn hack ư",
  update_address: "Địa chỉ giới hạn 3 đến 70 ký tự ",
  update_phone:  "Số điện thoại bắt đầu bằng số 0 và chỉ 10 ký tự ",
};

export const transErrors = {
  account_in_use: "Email này đã được sử dụng",
  account_removed: "Email này đã bị vô hiệu hóa hoặc xóa bỏ, bạn vui lòng liên hệ quản trị viên để biết thông tin chi tiết, xin cảm ơn ",
  account_not_active: "Email này đã đăng ký và chưa được kích hoạt, bạn vui lòng kiểm tra email để kích hoạt tài khoản này, xin cảm ơn ",
  token_undefined: "Token không tồn tại !!!",
  login_failed: "Sai tài khoản hoặc mật khẩu!!!",
  server_error: "Hệ thống đang có lỗi, bạn vui lòng chờ trong giây lát!!!",
  avatar_type: "Kiểu file không hợp lệ, chỉ chấp nhận file jpg và png ",
  avatar_size: "Ảnh upload tối da cho phép là 1 MB",
};

export const transSuccess = {
  userCreated:  (userEmail) => {
    return `Tài Khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập, xin cảm ơn !`;
  },

  account_active: "Kích hoạt tài khoản thành công!!!",

  loginSuccess: (username) => {
    return `Xin chào ${username}, bạn đã đang nhập thành công!!!`
  },

  logoutSuccess: "Đăng xuất tài khoản thành công, Hẹn gặp lại bạn!!!",
  user_info_updated: " Cập nhật thông tin người dùng thành công"
};

export const transMail = {
  subject: "I_Chat(Duy Nguyễn): Xác nhận kích hoạt tài khoản",
  template: (linkVerify) => {
    return `
    <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng I Chat của chúng tôi </h2>
    <h3>Vui lòng click vào liên kết bên dưới để xác nhận kích hoạt tài khoản.</h3>
    <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
    <h4>Nếu tin rằng email này là nhầm lẫn hãy bỏ qua nó. Trân trọng !!! </h4>`
  },
  
  send_failed: "Có lỗi xảy ra trong quá trình gửi email xác nhận, vui lòng liên hệ lại với  bộ phận hỗ trợ của chúng tôi"
};
