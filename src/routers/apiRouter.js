import express from "express";
import { postChoice, postRating, postIdDoubleCheck } from "../controllers/apiController";

const apiRouter = express.Router();
// choice true / fase
apiRouter.post("/check-heart", postChoice);

// rating
apiRouter.post("/rating", postRating);

// 회원가입 아이디(이메일) 중복 확인
apiRouter.post("/id-double-check", postIdDoubleCheck);

export default apiRouter;
