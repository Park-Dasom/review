import paginate from "express-paginate";
import express from "express";
import routes from "../routes";
import { home, getMerchandise } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, paginate.middleware(2, 50), home);

// 장바구니 Merchandise
globalRouter.get("/:merchandiseID", getMerchandise);

export default globalRouter;
