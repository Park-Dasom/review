/* eslint-disable import/prefer-default-export */
import Choice from "../models/Choice";
import User from "../models/User";

// 마음에 들어요 데이터 입력
export const postChoice = async (req, res) => {
  try {
    const { body } = req;
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
    await Choice.findOneAndUpdate(
      { choiceID: body.choiceID },
      { rate: body.rate }
    );
    res.json({ msg: "success rating" });
  } catch (err) {
    console.log(err);
  }
};

// 회원가입 이메일 증복 확인
export const checkEmail = async (req, res) => {
  try {
    const { body } = req;
    const userEmail = await User.findOne({ userID: body.userEmail });
    if (!userEmail) {
      res.json({ msg: "no data" });
    } 
  } catch (err) {
    console.log(err);
  }
};
