import express from "express";
import { postChoice, postRating, postIdDoubleCheck, postJoinCheck, postCreatComment, postDeleteComment, postPostCartlist, postDeleteCartlist, postBuyingCheck } from "../controllers/apiController";

const apiRouter = express.Router();
// choice true / fase
apiRouter.post("/check-heart", postChoice);

// rating
apiRouter.post("/rating", postRating);

// 회원가입 아이디(이메일) 중복 확인
apiRouter.post("/id-double-check", postIdDoubleCheck);

// 로그인 아이디, 비밀번호 확인
apiRouter.post("/join-check", postJoinCheck);

// 댓글 post
apiRouter.post("/creat-comment", postCreatComment);
apiRouter.delete("/delete-comment", postDeleteComment);

// 비로그인 유저의 장바구니 cartList
apiRouter.post("/post-cartlist", postPostCartlist);
apiRouter.post("/delete-cartlist", postDeleteCartlist);

// 비로그인 유저의 장바구니 구매 체크 post
apiRouter.post("/post-buyingCheck", postBuyingCheck);

export default apiRouter;
