import express from "express";
import routes from "../routes";
import { home, getJoin, getLogin } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, home);
// 회원가입 join
globalRouter.get(routes.join, getJoin);
// 로그인 login
globalRouter.get(routes.login, getLogin);

export default globalRouter;
