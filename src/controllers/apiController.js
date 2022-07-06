/* eslint-disable import/prefer-default-export */
import Rating from "../models/Rating";
import Choice from "../models/Choice";

export const postChoice = async (req, res) => {
  try {
    const { body } = req;
    console.log(body.choiceItem);
    const choices = await Choice.find({choiceID: body.choiceItem});
    if(choices.length === 0){
      await Choice.create({
        choiceID: body.choiceItem,
        choice: true,
      });
    }else{
      if(choices.choice){
         choices.choice = false;
         await choices.save()
      }else{
         choices.choice = true;
      }
    }
    res.json({ msg: "success" });
    
  } catch (err) {
    console.log(err);
  }
};

// export const postRating = async (req, res) => {
//   try {
//     const { body } = req;
//     console.log(req.value);
//     const rating = await Rating.find();
//     console.log(rating);
//     // if (body.rating) {

//     // }
//   } catch (err) {
//     console.log(err);
//   }
// };
