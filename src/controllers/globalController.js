import routes from "../routes";
import Choice from "../models/Choice";
import Comment from "../models/Comment";
import Merchandise from "../models/Merchandise";
import Rate from "../models/Rate";
import User from "../models/User";

// 홈 Home
export const home = async (req, res) => {
  try {
    const comments = await Comment.find().populate("userID");
    const merchandises = await Merchandise.find().populate([
      { path: "choiceID", model: "Choice" },
      { path: "rateID", model: "Rate" },
    ]);
    const users = await User.find().populate([
      { path: "choiceID", model: "Choice" },
      { path: "rateID", model: "Rate" },
      { path: "commentID", model: "Comment" },
    ]);
    res.render("home", { comments, merchandises, users });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const anotherController = () => {};
