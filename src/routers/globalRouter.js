import paginate from "express-paginate";
import express from "express";
import routes from "../routes";
import { home } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, paginate.middleware(10, 50), home);

export default globalRouter;
