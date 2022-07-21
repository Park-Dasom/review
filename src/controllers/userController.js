import moment from "moment-timezone";
import dotenv from "dotenv";
import passport from "passport";
import sgMail from "@sendgrid/mail";
import User from "../models/User";
import routes from "../routes";
import Comment from "../models/Comment";
import Choice from "../models/Choice";
import Rate from "../models/Rate";
import Merchandise from "../models/Merchandise";

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// 비밀번호 변경 change password
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
      res.send(`
        <script>\
          alert("비밀번호가 일치하지 않습니다.\\r\\n다시 한 번 확인해 주세요.");\
          history.go(-1);\
        </script>
      `);
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

// 비밀번호 재설정 reset password
export const getResetPassword = (req, res) => {
  try {
    // const msg = {
    //   to: "tkfkdgo3057@naver.com",
    //   from: res.locals.singleSenderEmail,
    //   subject: "Sending with Twilio SendGrid is Fun",
    //   html: `
    //     <table style="font-family: 'Montserrat',Arial,sans-serif; width: 100%;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
    //       <tbody>
    //         <tr>
    //           <td class="sm-px-24" style="--bg-opacity: 1; background-color: #ffffff; background-color: rgba(255, 255, 255, var(--bg-opacity)); border-radius: 4px; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; line-height: 24px; padding: 48px; text-align: left; --text-opacity: 1; color: #626262; color: rgba(98, 98, 98, var(--text-opacity));" bgcolor="rgba(255, 255, 255, var(--bg-opacity))" align="left">
    //             <p style="margin: 0;">비밀번호를 잊어버리셨나요?</p>
    //             <p style="margin: 0;">괜찮아요. 이번 기회에 비밀번호를 변경하면 되니까요.</p>
    //             <br>
    //             <p style="margin: 0;">아래 링크를 클릭하셔서 새로운 비밀번호를 입력해 주세요.</p>
    //             <p style="margin: 0;">참고로 아래 링크는 메일을 받은 시간으로부터 10분간 유효해요.</p>
    //             <br>
    //             <p style="margin: 0;">
    //               <a href="http://localhost:8000/user/change-pw/?token=${token}&email=${users.userID}" target="_blank" style="color: #000; font-weight: bold;text-decoration: underline;">비밀번호 변경하기</a>
    //             </p>
    //             <br>
    //             <p style="margin: 0;">주의사항: 비밀번호를 재설정하실 때 대소문자를 구분해서 입력해 주세요. </p>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   `,
    // };
    // sgMail.send(msg).then(
    //   () => {
    //     res.send(`<script>window.location.href="${routes.user}${routes.login}";</script>`);
    //   },
    //   (error) => {
    //     console.log(error);
    //     res.send(`<script>alert("메일 전송에 실패했습니다.");</script>`);
    //   }
    // );
  } catch (err) {
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postResetPassword = (req, res) => {};

// 회원탈퇴
export const deleteUser = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findById(userID);
    const choices = user.choiceID;
    const rates = user.rateID;
    if (user) {
      await User.findByIdAndDelete(userID);
      await Comment.deleteMany({ userID });
      await Choice.deleteMany({ userID });
      await Rate.deleteMany({ userID });
      await Merchandise.updateMany({}, { $pull: { choiceUserID: { $in: userID }, rateUserID: { $in: userID }, choiceID: { $in: choices }, rateID: { $in: rates } } });
    }
    req.logout();
    req.session.destroy();
    res.send(`<script>alert("회원탈퇴가 처리되었습니다.");\
    location.href="${routes.home}"</script>`);
  } catch (err) {
    console.log(err);
  }
};

// 비로그인 유저의 장바구니 cartList
export const getCartList = async (req, res) => {
  try {
    const {
      cookies: { merchandiseID },
    } = req;
    return res.render("cartlist", { merchandiseID });
  } catch (err) {
    console.log(err);
  }
};

// 좋아요 list
export const getwishList = async (req, res) => {
  try {
    const {
      params: { userID },
    } = req;
    const user = await User.findById(userID);
    const merchandise = await Merchandise.find({ choiceUserID: userID }).populate([{ path: "choiceID", model: "Choice" }]);
    const choices = await Choice.findOne({ userID });
    return res.render("wishList", { user, merchandise, choices });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
