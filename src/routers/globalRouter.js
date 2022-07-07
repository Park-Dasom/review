import express from "express";
import routes from "../routes";
import { home, getJoin } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);

export default globalRouter;
