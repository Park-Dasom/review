import paginate from "express-paginate";
import express from "express";
import routes from "../routes";
import {
  getAdminLogin,
  postAdminLogin,
  getAdminRegister,
  postAdminRegister,
  adminLogout,
  getAdminChangePW,
  postAdminChangePW,
  adminUser,
  adminUserApprove,
  adminUserDelete,
  adminSample,
  getCreateSample,
  postCreateSample,
  getSampleDetail,
  getUpdateSample,
  postUpdateSample,
  getDeleteSample,
} from "../controllers/adminController";
import { onlyAdmin, uploadSamplePic } from "../middlewares";

const adminRouter = express.Router();

// 관리자 로그인
adminRouter.get("/", getAdminLogin);
adminRouter.post(routes.adminLogin, postAdminLogin);

// 관리자 회원가입
adminRouter.get(routes.adminRegister, getAdminRegister);
adminRouter.post(routes.adminRegister, postAdminRegister);

// 로그아웃
adminRouter.get(routes.adminLogout, onlyAdmin, adminLogout);

// 비밀번호 변경
adminRouter.get(`${routes.adminChangePW}`, onlyAdmin, getAdminChangePW);
adminRouter.post(`${routes.adminChangePW}`, onlyAdmin, postAdminChangePW);

// 관리자 계정 관리
adminRouter.get(routes.adminUser, onlyAdmin, paginate.middleware(20, 50), adminUser);
adminRouter.get(`${routes.adminUser}/approve/:userID`, onlyAdmin, adminUserApprove);
adminRouter.get(`${routes.adminUser}/delete/:userID`, onlyAdmin, adminUserDelete);

// 관리자 샘플 관리
adminRouter.get(routes.adminSample, onlyAdmin, paginate.middleware(20, 50), adminSample);
adminRouter.get(`${routes.adminSample}/create`, onlyAdmin, getCreateSample);
adminRouter.post(`${routes.adminSample}/create`, onlyAdmin, uploadSamplePic, postCreateSample);
adminRouter.get(`${routes.adminSample}/detail/:sampleID`, onlyAdmin, getSampleDetail);
adminRouter.get(`${routes.adminSample}/update/:sampleID`, onlyAdmin, getUpdateSample);
adminRouter.post(`${routes.adminSample}/update/:sampleID`, onlyAdmin, uploadSamplePic, postUpdateSample);
adminRouter.get(`${routes.adminSample}/delete/:sampleID`, onlyAdmin, getDeleteSample);

export default adminRouter;
