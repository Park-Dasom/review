import express from "express";
import routes from "../routes";
import { getJoin, postJoin, getLogin, postLogin, getLogout, autoLogin, getChangePassword, postChangePassword, deleteUser, getCartList, getwishList } from "../controllers/userController";

const userRouter = express.Router();

// 회원가입 join
userRouter.get(routes.join, getJoin);
userRouter.post(routes.join, postJoin, autoLogin);

// 로그인 login
userRouter.get(routes.login, getLogin);
userRouter.post(routes.login, postLogin);

// 로그아웃 logout
userRouter.get(routes.logout, getLogout);

// 비밀번호 password
userRouter.get(routes.changePW, getChangePassword);
userRouter.post(routes.changePW, postChangePassword);

// 회원탈퇴
userRouter.get(`${routes.delete}/:userID`, deleteUser);

// 비로그인 유저의 장바구니 cartList
userRouter.get(routes.cartlist, getCartList);

// 좋아요 list
userRouter.get(`${routes.wishlist}/:userID`, getwishList);

export default userRouter;
