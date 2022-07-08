import express from "express";
import routes from "../routes";
import { getJoin, postJoin, getLogin } from "../controllers/userController";

const userRouter = express.Router();

// 회원가입 join
userRouter.get(routes.join, getJoin);
userRouter.post(routes.join, postJoin);

// 로그인 login
userRouter.get(routes.login, getLogin);

export default userRouter;
