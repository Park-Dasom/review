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
      const choices = await Choice.findOne({ merchandiseID });
      if (!choices || choices.userID !== userID) {
        const choice = await Choice.create({
          merchandiseID,
          userID,
          choice: true,
        });
        user.choiceID.push(choice._id);
        merchandises.choiceID.push(choice._id);
        user.save();
        res.json({ msg: "fill heart" });
      } else if (choices.merchandiseID === merchandiseID) {
        choices.choice = false;
        choices.save();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// 별점 데이터 입력
export const postRating = async (req, res) => {
  try {
    const { body } = req;
    const id = req.user._id;
    const rates = await Rate.findOne({ merchandiseID: body.merchandiseID });
    if (!rates) {
      const rate = await Rate.create({
        merchandiseID: body.merchandiseID,
        userID: req.user._id,
        rate: body.rate,
      });
      await User.findByIdAndUpdate(id, { rateID: rate._id });
      await Merchandise.findByIdAndUpdate(body.merchandiseID, { rateID: rate._id });
      res.json({ msg: "success rating" });
    } else {
      await Rate.findOneAndUpdate({ merchandiseID: body.merchandiseID }, { rate: body.rate });
      res.json({ msg: "success rating" });
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
    console.log(body);
    const commentID = body.userID;
    await Comment.findByIdAndRemove(commentID);
    res.json({ msg: "comment delete" });
  } catch (err) {
    console.log(err);
  }
};
