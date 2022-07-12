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
    const merchandises = await Merchandise.find().populate("choice").populate("rate");
    // const users = await User.find().populate("choice").populate("rate");
    res.render("home", { comments, merchandises });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const anotherController = () => {};
