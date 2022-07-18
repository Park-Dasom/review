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
          choice: true,
        });
        user.choiceID.push(choice._id);
        user.save();
        merchandises.choiceUserID.push(userID);
        merchandises.choiceID.push(choice._id);
        merchandises.save();
        res.json({ msg: "fill heart" });
      } else {
        choices.choice = !choices.choice;
        choices.save();
        if (!choices.choice) {
          res.json({ msg: "empty heart" });
        } else {
          res.json({ msg: "fill heart" });
        }
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
    console.log(body);
    const commentID = body.userID;
    await Comment.findByIdAndRemove(commentID);
    res.json({ msg: "comment delete" });
  } catch (err) {
    console.log(err);
  }
};
