import express from "express";
import routes from "../routes";
import { getJoin, postJoin, getLogin, postLogin, getLogout } from "../controllers/userController";

const userRouter = express.Router();

// 회원가입 join
userRouter.get(routes.join, getJoin);
userRouter.post(routes.join, postJoin);

// 로그인 login
userRouter.get(routes.login, getLogin);
userRouter.post(routes.login, postLogin);

// 로그아웃 logout
userRouter.get(routes.logout, getLogout);
export default userRouter;
