// Global
const HOME = "/";

// User
const USER = "/user";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const FIND_ID = "/find-id";
const FORGOT_PW = "/forgot-pw";
const CHANGE_PW = "/change-pw";
const DELETE = "/delete";

// Admin
const ADMIN = "/admin";
const ADMIN_REGISTER = "/register";
const ADMIN_LOGIN = "/login";
const ADMIN_LOGOUT = "/logout";
const ADMIN_CHANGE_PW = "/change-pw";
const ADMIN_USER = "/user";
const ADMIN_NORMAL_USER = "/normal-user";

// ADMIN SAMPLE(CRUD용)
const ADMIN_MERCHANDISE = "/merchandise";
const ADMIN_SAMPLE = "/sample";
// API
const API = "/api";

const routes = {
  // Global
  home: HOME,

  // User
  user: USER,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  findID: FIND_ID,
  forgotPW: FORGOT_PW,
  changePW: CHANGE_PW,
  delete: DELETE,

  // Admin
  admin: ADMIN,
  adminRegister: ADMIN_REGISTER,
  adminLogin: ADMIN_LOGIN,
  adminLogout: ADMIN_LOGOUT,
  adminChangePW: ADMIN_CHANGE_PW,
  adminUser: ADMIN_USER,
  adminNormalUser: ADMIN_NORMAL_USER,

  // ADMIN SAMPLE(CRUD용)
  adminMerchandise: ADMIN_MERCHANDISE,
  adminSample: ADMIN_SAMPLE,
  // API
  api: API,
};

export default routes;
