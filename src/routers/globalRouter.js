import paginate from "express-paginate";
import express from "express";
import routes from "../routes";
import { home, getMerchadiseDetail } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, paginate.middleware(10, 50), home);

// 장바구니 Merchandise
globalRouter.get(`${routes.merchandise}/:merchandiseID`, getMerchadiseDetail);

// 상품 상세페이지 Merchadise Detail
globalRouter.get(`${routes.merchadiseDetail}/:merchandiseID`, getMerchadiseDetail);

export default globalRouter;
