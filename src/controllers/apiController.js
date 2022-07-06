import routes from "../routes";
import Rating from "../models/Rating";
import Choice from "../models/Choice";

export const postChoice = async (req, res) => {
  try {
    const {body}=req;
    console.log(body);
    // const choice = await Choice.find();
    // if (!choice) {
    //   await Choice.updateOne({ choice: true });
    // } else {
    //   await Choice.updateOne({ choice: false });
    // }
    res.json({ msg: "Choice is changed" });
  } catch (err) {
    console.log(err);
  }
};
