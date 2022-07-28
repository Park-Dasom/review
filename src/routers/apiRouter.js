import express from "express";
import { postChoice, postRating, postIdDoubleCheck, postJoinCheck, postCreatComment, postDeleteComment, postPostCartlist, postDeleteCartlist, postBuyingCheck, postFindPW, postThumbnail1Preview, postThumbnail2Preview, postUpdateProfile, postBuyingCheckOff } from "../controllers/apiController";
import { uploadMerchandisePic } from "../middlewares";

const apiRouter = express.Router();
// 좋아요 버튼 post
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

// 장바구니 cartList
apiRouter.post("/post-cartlist", postPostCartlist);
apiRouter.post("/delete-cartlist", postDeleteCartlist);
// 장바구니 cartList 구매 체크 post
apiRouter.post("/post-buyingCheck", postBuyingCheck);
apiRouter.post("/post-buyingCheck-off", postBuyingCheckOff);

// SendGrid 비밀번호 찾기 이메일 post
apiRouter.post("/post-findPW", postFindPW);

// adminMerchandiseForm 사진 업로드 미리보기 post
apiRouter.post("/admin-post-thumbnail1-preview", uploadMerchandisePic, postThumbnail1Preview);
apiRouter.post("/admin-post-thumbnail2-preview", uploadMerchandisePic, postThumbnail2Preview);

// 회원정보 변경 post
apiRouter.post("/update-profile", postUpdateProfile);

export default apiRouter;
