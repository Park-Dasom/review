import express from "express";
import routes from "../routes";
import { home, getJoin, getLogin } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, home);

export default globalRouter;
