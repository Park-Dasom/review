// Global
const HOME = "/";
const MERCHANDISE_DETAIL = "/merchadise-detail";

// User
const USER = "/user";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const FIND_ID = "/find-id";
const FORGOT_PW = "/forgot-pw";
const CHANGE_PW = "/change-pw";
const RESET_PW = "/reset-pw";
const DELETE = "/delete";
const WISHLIST = "/wishlist";
const CARTLIST = "/cartlist";
const PAYMENT = "/payment";
const UPDATE_PRPFILE = "/update-profile";
const SEARCH = "/search";
const CHAT = "/chat";
const MAP = "/map";
// Merchandise
const MERCHANDISE = "/merchandise";

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
  merchadiseDetail: MERCHANDISE_DETAIL,

  // User
  user: USER,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  findID: FIND_ID,
  forgotPW: FORGOT_PW,
  changePW: CHANGE_PW,
  resetPW: RESET_PW,
  delete: DELETE,
  wishlist: WISHLIST,
  cartlist: CARTLIST,
  payment: PAYMENT,
  updateProfile: UPDATE_PRPFILE,
  search: SEARCH,
  chat: CHAT,
  map: MAP,
  // Merchandise
  merchandise: MERCHANDISE,

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
