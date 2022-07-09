import moment from "moment-timezone";
import passport from "passport";
import User from "../models/User";
import routes from "../routes";

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
    console.log(body);
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
