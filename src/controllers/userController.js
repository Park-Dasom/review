import moment from "moment-timezone";
import passport from "passport";
import User from "../models/User";
import routes from "../routes";
import Comment from "../models/Comment";
import Choice from "../models/Choice";
import Rate from "../models/Rate";
import Merchandise from "../models/Merchandise";

// 회원가입 Join
export const getJoin = (req, res) => {
  try {
    res.render("join");
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postJoin = async (req, res, next) => {
  try {
    const { body } = req;
    body.role = "normal";
    body.createdAt = moment(new Date()).tz("Asia/Seoul");
    body.updatedAt = moment(new Date()).tz("Asia/Seoul");
    const user = await User(body);
    await User.register(user, body.password);
    next();
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 로그인 Login
export const getLogin = (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postLogin = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, _) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(
          `<script>alert("로그인 정보가 잘못되었습니다.");\
          location.href="${routes.home}"</script>`
        );
      } else {
        req.logIn(user, (e) => {
          if (err) {
            return next(e);
          }
          return res.send(
            `<script>alert("로그인 되었습니다.");\
              location.href="${routes.home}"</script>`
          );
        });
      }
    })(req, res, next);
  } catch (err) {
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 자동로그인 autoLogin
export const autoLogin = passport.authenticate("local", { successRedirect: `${routes.home}`, failureRedirect: `${routes.user}${routes.login}` });

// 로그아웃 Logout
export const getLogout = (req, res) => {
  try {
    req.logout();
    req.session.destroy(() => {
      res.send(
        `<script>alert("로그아웃 되었습니다.");\
        location.href="${routes.home}"</script>`
      );
    });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 비밀번호 password
export const getChangePassword = (req, res) => {
  try {
    res.render("changePW");
  } catch (err) {
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postChangePassword = async (req, res) => {
  try {
    const {
      body: { newPassword, newPasswordConfirm },
    } = req;
    if (newPassword !== newPasswordConfirm) {
      res.send(`<script>\
      alert("비밀번호가 일치하지 않습니다.\\r\\n다시 한 번 확인해 주세요.");\
      history.go(-1);\
    </script>`);
    } else {
      const userID = req.user._id;
      const user = await User.findById(userID);
      await user.setPassword(newPassword);
      await user.save();
      req.logout();
      req.session.destroy((e) => {
        console.log(e);
        res.send(
          `<script>alert("비밀번호가 변경되었습니다. \\r\\n다시 로그인해주세요.");\
          location.href="${routes.home}"</script>`
        );
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// 회원탈퇴
export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    // const choices = user.choiceID;
    // const rates = user.rateID;
    if (user) {
      await User.findByIdAndDelete(userID);
      await Comment.deleteMany({ userID });
      await Choice.deleteMany({ userID });
      await Rate.deleteMany({ userID });
      await Merchandise.updateMany({}, { $pull: { choiceUserID: { $in: userID }, rateUserID: { $in: userID } } });
    }
    req.logout();
    req.session.destroy();
    res.send(`<script>alert("회원탈퇴가 처리되었습니다.");\
    location.href="${routes.home}"</script>`);
  } catch (err) {
    console.log(err);
  }
};
