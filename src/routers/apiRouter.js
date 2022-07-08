import express from "express";
import { postChoice, postRating, checkEmail, postJoin } from "../controllers/apiController";

const apiRouter = express.Router();
// choice true / fase
apiRouter.post("/check-heart", postChoice);
// rating
apiRouter.post("/rating", postRating);

// 회원가입 이메일 중복 확인
apiRouter.post("/user-id/check", checkEmail);
// post join
//apiRouter.post("/join/post-join", postJoin);

export default apiRouter;
