/* eslint-disable import/prefer-default-export */
import Rating from "../models/Rating";
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
    console.log(body.ratingIndex, body.ratingID);
    const rating = await Rating.find();
    console.log(rating[0]);
    if (rating.length === 0 || rating[0].ratingIndex !== body.ratingIndex) {
      await Rating.create({
        ratingIndex: body.ratingIndex,
        ratingID: body.ratingID,
      });
      res.json({ msg: "success rating" });
    } else if (rating[0].ratingIndex === body.ratingIndex && rating[0].ratingID !== body.ratingID) {
      await Rating.findOneAndUpdate({ratingIndex: rating[0].ratingIndex},
        {ratingID: body.ratingID});
      // rating[0].rating = !rating[0].rating;
      // await rating[0].save();
      res.json({ msg: "success rating" });
    }
  } catch (err) {
    console.log(err);
  }
};
