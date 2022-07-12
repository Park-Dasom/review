import paginate from "express-paginate";
import express from "express";
import routes from "../routes";
import { getAdminLogin, postAdminLogin, getAdminRegister, postAdminRegister, adminLogout, getAdminChangePW, postAdminChangePW, adminUser, adminUserApprove, adminUserDelete, adminMerchandise, getCreateMerchandise, postCreateMerchandise, getMerchandiseDetail, getUpdateMerchandise, postUpdateMerchandise, getDeleteMerchandise } from "../controllers/adminController";
import { onlyAdmin } from "../middlewares";

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

// 상품 관리
adminRouter.get(routes.adminMerchandise, onlyAdmin, paginate.middleware(20, 50), adminMerchandise);
adminRouter.get(`${routes.adminMerchandise}/create`, onlyAdmin, getCreateMerchandise);
adminRouter.post(`${routes.adminMerchandise}/create`, onlyAdmin, postCreateMerchandise);
adminRouter.get(`${routes.adminMerchandise}/detail/:merchandiseID`, onlyAdmin, getMerchandiseDetail);
adminRouter.get(`${routes.adminMerchandise}/update/:merchandiseID`, onlyAdmin, getUpdateMerchandise);
adminRouter.post(`${routes.adminMerchandise}/update/:merchandiseID`, onlyAdmin, postUpdateMerchandise);
adminRouter.get(`${routes.adminMerchandise}/delete/:merchandiseID`, onlyAdmin, getDeleteMerchandise);

export default adminRouter;
