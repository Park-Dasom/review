/* eslint-disable import/prefer-default-export */
import Choice from "../models/Choice";
import User from "../models/User";
import Comment from "../models/Comment";

// 마음에 들어요 데이터 입력
export const postChoice = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const choices = await Choice.find({ choiceID: body.choiceID });
    if (choices.length === 0) {
      await Choice.create({
        choiceID: body.choiceID,
        choice: true,
      });
      res.json({ msg: "fill heart" });
    } else {
      choices[0].choice = !choices[0].choice;
      await choices[0].save();
      if (choices[0].choice) {
        res.json({ msg: "fill heart" });
      } else {
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
    const { body } = req;
    await Choice.findOneAndUpdate({ choiceID: body.choiceID }, { rate: body.rate });
    res.json({ msg: "success rating" });
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

export const postDeleteUser = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const user = await User.findByIdAndRemove(body);
  } catch (err) {
    console.log(err);
  }
};
