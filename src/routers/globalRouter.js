import paginate from "express-paginate";
import express from "express";
import routes from "../routes";
import { home, getMerchadiseDetail, getSearch } from "../controllers/globalController";

const globalRouter = express.Router();

// 홈 Home
globalRouter.get(routes.home, paginate.middleware(10, 50), home);

// 장바구니 Merchandise
globalRouter.get(`${routes.merchandise}/:merchandiseID`, getMerchadiseDetail);

// 상품 상세페이지 Merchadise Detail
globalRouter.get(`${routes.merchadiseDetail}/:merchandiseID`, getMerchadiseDetail);

// 상품 검색 search
globalRouter.get(routes.search, getSearch);
export default globalRouter;
