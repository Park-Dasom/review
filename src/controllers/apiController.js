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
    console.log(body.choiceID, body.rate);
    await Choice.findOneAndUpdate(
      { choiceID: body.choiceID },
      { rate: body.rate }
    );
    res.json({ msg: "success rating" });
  } catch (err) {
    console.log(err);
  }
};
