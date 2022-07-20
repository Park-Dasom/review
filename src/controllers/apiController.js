/* eslint-disable import/prefer-default-export */
import Choice from "../models/Choice";
import User from "../models/User";
import Comment from "../models/Comment";
import Rate from "../models/Rate";
import Merchandise from "../models/Merchandise";

// 마음에 들어요 데이터 입력
export const postChoice = async (req, res) => {
  try {
    const {
      body: { merchandiseID },
    } = req;
    if (!req.user) {
      res.json({ msg: "not login" });
    } else {
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
        user.save();
        merchandises.choiceUserID.push(userID);
        merchandises.save();
        res.json({ msg: "fill heart" });
      } else {
        const choiceID = choices._id;
        console.log("hi");
        await Choice.findByIdAndDelete(choiceID);
        await Merchandise.updateMany({}, { $pull: { choiceUserID: { $in: userID } } });
        await User.updateMany({}, { $pull: { choiceID: { $in: choiceID } } });
        res.json({ msg: "empty heart" });
      }
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
      const merchandises = await Merchandise.findById(merchandiseID);
      const users = await User.findById(userID);
      const rates = await Rate.findOne({ merchandiseID, userID });
      if (!rates) {
        const newRate = await Rate.create({
          merchandiseID,
          userID,
          rate,
        });
        merchandises.rateUserID.push(userID);
        merchandises.rateID.push(newRate._id);
        merchandises.save();
        users.rateID.push(newRate._id);
        users.save();
        res.json({ msg: "success rating" });
      } else {
        await Rate.findOneAndUpdate({ merchandiseID, userID }, { rate });
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

// 비로그인 유저의 장바구니 cartlist post
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

// 비로그인 유저의 장바구니 cartlist delete
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

// 비로그인 유저의 장바구니 cartlist 구매 체크 post
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
