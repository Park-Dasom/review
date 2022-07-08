import routes from "../routes";
import Choice from "../models/Choice";

// 홈 Home
export const home = async (req, res) => {
  try {
    const choices = await Choice.find();
    res.render("home", { choices });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const anotherController = () => {};
