/* eslint-disable import/prefer-default-export */
import Choice from "../models/Choice";

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

export const postRating = async (req, res) => {
  try {
    const { body } = req;
<<<<<<< Updated upstream
    console.log(body.choiceID, body.rate);
    await Choice.findOneAndUpdate(
      { choiceID: body.choiceID },
      { rate: body.rate }
    );
=======

    const choices = await Choice.findOne({ choiceID: body.choiceID });

    if (!choices) {
      // Choice 생성
      await Choice.create(body);
    } else {
      // 별점 업데이트
      choices.rate = body.rate;
      choices.save();
    }

>>>>>>> Stashed changes
    res.json({ msg: "success rating" });
  } catch (err) {
    console.log(err);
  }
};
