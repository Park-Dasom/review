/* eslint-disable import/prefer-default-export */
import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import dotenv from "dotenv";
import Choice from "../models/Choice";
import User from "../models/User";
import Comment from "../models/Comment";
import Rate from "../models/Rate";
import Merchandise from "../models/Merchandise";
import routes from "../routes";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// 좋아요 버튼 post 좋아요 활성화
export const postChoice = async (req, res) => {
  try {
    const {
      body: { merchandiseID },
    } = req;
    const userID = req.user._id;
    const user = await User.findById(userID);
    const merchandises = await Merchandise.findById(merchandiseID);
    const choices = await Choice.findOne({ merchandiseID, userID });
    if (!choices) {
      const choice = await Choice.create({
        merchandiseID,
        userID,
        status: true,
      });
      user.choiceID.push(choice._id);
      merchandises.choiceUserID.push(userID);
      user.save();
      merchandises.save();
      res.json({ msg: "fill heart" });
    } else {
      const choiceID = choices._id;
      const userID = req.user._id;
      await Choice.findByIdAndDelete(choiceID);
      await Merchandise.findByIdAndUpdate(merchandiseID, { $pull: { choiceUserID: { $in: userID } } });
      await User.updateMany({}, { $pull: { choiceID: { $in: choiceID } } });
      res.json({ msg: "empty heart" });
    }
  } catch (err) {
    console.log(err);
  }
};

// 별점 데이터 입력
export const postRating = async (req, res) => {
  try {
    const {
      body: { merchandiseID, rate },
    } = req;
    if (!req.user) {
      res.json({ msg: "not login" });
    } else {
      const userID = req.user._id;
      const users = await User.findById(userID);
      const rates = await Rate.findOne({ merchandiseID, userID });
      let rateArrayField = [];
      if (!rates) {
        const merchandises = await Merchandise.findById(merchandiseID).populate("rateID");
        // 새로운 별점이 추가되기 전 기존의 별점을 rateArrayField에 push
        const rateArray = merchandises.rateID;
        rateArray.forEach((elem) => {
          const arrayRates = elem.rate;
          rateArrayField.push(arrayRates);
        });
        // 새로운 별점 추가
        const newRate = await Rate.create({
          merchandiseID,
          userID,
          rate,
        });
        merchandises.rateUserID.push(userID);
        merchandises.rateID.push(newRate._id);
        users.rateID.push(newRate._id);
        users.save();
        // 평균 별점을 구하기 위한 array에 push
        rateArrayField.push(newRate.rate);
        // 평균 별점 계산식
        merchandises.avgRate = Math.floor(rateArrayField.reduce((a, b) => a + b) / rateArrayField.length);
        merchandises.save();
        res.json({ msg: "success rating" });
      } else {
        // 기존의 별점을 수정하고 바로 새로운 수정 값이 return 되도록 설정 '{new : true}
        await Rate.findOneAndUpdate({ merchandiseID, userID }, { rate }, { new: true });
        // 별점이 수정된 이후에 merchandise를 새롭게 불러와야 수정된 별점을 찾을 수 있음.
        const merRate = await Merchandise.findById(merchandiseID).populate("rateID");
        // 수정된 별점 값이 있는 array 를 rateArrayField에 push
        const rateArray = merRate.rateID;
        rateArray.forEach((elem) => {
          rateArrayField.push(elem.rate);
        });
        // 별점 평균 계산식
        merRate.avgRate = Math.floor(rateArrayField.reduce((a, b) => a + b) / rateArrayField.length);
        merRate.save();
        res.json({ msg: "success rating" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// 회원가입 이메일 증복 확인
export const postIdDoubleCheck = async (req, res) => {
  try {
    const { body } = req;
    const userEmails = await User.findOne({ userID: body.userID });
    if (userEmails) {
      res.json({ msg: "user exist" });
    } else {
      res.json({ msg: "create user" });
    }
  } catch (err) {
    console.log(err);
  }
};

// 로그인 아이디, 비밀번호 확인
export const postJoinCheck = async (req, res) => {
  try {
    const { body } = req;
    const userID = body.userID;
    const password = body.password;
    const user = await User.findOne({ userID, password });
    if (!user) {
      res.json({ msg: "unknown user" });
    }
  } catch (err) {
    console.log(err);
  }
};

// 댓글 creat post
export const postCreatComment = async (req, res) => {
  try {
    const { body } = req;
    const { text } = req.body;
    body.userID = req.user._id;
    body.comments = text;
    const comment = await Comment.create(body);
    const user = await User.findById(req.user._id);
    user.commentID.push(comment._id);
    user.save();
    res.json({ msg: "comment update" });
  } catch (err) {
    console.log(err);
  }
};

// 댓글 delete post
export const postDeleteComment = async (req, res) => {
  try {
    const { body } = req;
    const commentID = body.userID;
    await Comment.findByIdAndRemove(commentID);
    res.json({ msg: "comment delete" });
  } catch (err) {
    console.log(err);
  }
};

// 장바구니 cartlist post
let merchandiseArray = [];
export const postPostCartlist = async (req, res) => {
  try {
    const {
      body: { merchandiseID },
    } = req;
    const merchandise = await Merchandise.findById(merchandiseID);
    merchandiseArray.push(merchandise);
    res.cookie("merchandiseID", merchandiseArray, {
      httpOnly: true,
      secure: true,
    });
    res.json({ msg: "cookie sending" });
  } catch (err) {
    console.log(err);
  }
};

// 장바구니 cartlist delete
export const postDeleteCartlist = async (req, res) => {
  try {
    const {
      body: { merchandiseID },
    } = req;
    const cookie = req.cookies;
    merchandiseArray = cookie.merchandiseID;
    merchandiseArray = merchandiseArray.filter((elem) => String(elem._id) !== String(merchandiseID));
    res.cookie("merchandiseID", merchandiseArray, {
      httpOnly: true,
      secure: true,
    });
    res.json({ msg: "cookie deleting" });
  } catch (err) {
    console.log(err);
  }
};

// 장바구니 cartlist 구매 체크 post
export const postBuyingCheck = async (req, res) => {
  try {
    const {
      body: { merchandiseID },
    } = req;
    const merchandise = await Merchandise.findById(merchandiseID);
    if (merchandise.extraDiscount !== 0) {
      res.json({ msg: "extraDiscount price" });
    } else if (merchandise.discountRate !== 0) {
      res.json({ msg: "discountRate price" });
    } else if (merchandise.price) {
      res.json({ msg: "nomal price" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const postBuyingCheckOff = async (req, res) => {
  try {
    const {
      body: { merchandiseID },
    } = req;
    const merchandise = await Merchandise.findById(merchandiseID);
    if (merchandise.extraDiscount !== 0) {
      res.json({ msg: "extraDiscount price" });
    } else if (merchandise.discountRate !== 0) {
      res.json({ msg: "discountRate price" });
    } else if (merchandise.price) {
      res.json({ msg: "nomal price" });
    }
  } catch (err) {
    console.log(err);
  }
};

// SendGrid 비밀번호 찾기 이메일 post
export const postFindPW = async (req, res) => {
  try {
    const {
      body: { userID },
    } = req;
    const users = await User.findOne({ userID });
    const token = crypto.randomBytes(20).toString("hex");
    users.resetPasswordToken = token;
    users.resetPasswordExpires = Date.now() + 1200000;
    users.save();
    const msg = {
      to: userID,
      from: res.locals.singleSenderEmail,
      subject: "비밀번호 찾기 안내 메일입니다.",
      html: `<p>'비밀번호 변경하기'를 눌러 비밀번호를 재설정 해주세요.</p>
      <br>
      <p>링크 이용 가능 시간은 20분입니다.</p>
      <br>
      <a href="http://localhost:8000/user/change-pw/?token=${token}&email=${userID}" target="_blank" style="color: #000; font-weight: bold;text-decoration: underline;">비밀번호 변경하기</a>
      `,
    };
    sgMail.send(msg).then(
      () => {
        res.json({ msg: "E-mail sending" });
      },
      (error) => {
        console.log(error);
        res.send(`<script>alert("메일 전송에 실패했습니다.");</script>`);
      }
    );
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href=""${routes.home}"</script>`
    );
  }
};

// thumbnail1 사진 업로드 미리보기 post
export const postThumbnail1Preview = async (req, res) => {
  const { files } = req;
  const location = files.thumbnail1[0].location;
  res.json({ location });
};

// thumbnail2 사진 업로드 미리보기 post
export const postThumbnail2Preview = async (req, res) => {
  const { files } = req;
  const location = files.thumbnail2[0].location;
  res.json({ location });
};

// 회원정보 변경 post
export const postUpdateProfile = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.findOneAndUpdate({ userID: body.userID }, { name: body.name });
    await user.setPassword(body.password);
    await user.save();
    res.json({ msg: "user-update" });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("알 수 없는 오류가 발생하였습니다."); \
      location.href="${routes.home}"</script>`
    );
  }
};
