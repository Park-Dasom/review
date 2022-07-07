import express from "express";
import { postChoice, postRating, checkEmail } from "../controllers/apiController";

const apiRouter = express.Router();
// choice true / fase
apiRouter.post("/check-heart", postChoice);
// rating
apiRouter.post("/rating", postRating);

// 회원가입 이메일 중복 확인
apiRouter.post("/user-id/check", checkEmail);

export default apiRouter;
