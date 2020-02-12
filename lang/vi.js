export const transValidation = {
  email_incorrect: "Email phải có dạng example@gmail.com",
  gender_incorrect: "What the hell",
  password_incorrect: "Mật Khẩu phải chứa ít nhất 8 ký tự, bao gồm chữ hoa, chữ số và ký tự đặc biệt",
  password_confirmation_incorrect: "Mật khẩu chưa chính xác"
};

export const transErrors = {
  account_in_use: "Email này đã được sử dụng",
  account_removed: "Email này đã bị vô hiệu hóa hoặc xóa bỏ, bạn vui lòng liên hệ quản trị viên để biết thông tin chi tiết, xin cảm ơn ",
  account_not_active: "Email này đã đăng ký và chưa được kích hoạt, bạn vui lòng kiểm tra email để kích hoạt tài khoản này, xin cảm ơn "
};

export const transSuccess = {
  userCreated:  (userEmail) => {
    return `Tài Khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để kích hoạt tài khoản trước khi đăng nhập, xin cảm ơn !`;
  }
};
