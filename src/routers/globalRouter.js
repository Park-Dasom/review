import express from "express";
import routes from "../routes";
import { home, creatComment } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, home);

//
// globalRouter.post(routes.home, creatComment);

export default globalRouter;
