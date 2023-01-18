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
import Chat from "../models/Chat";

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

// 비밀번호 재설정 reset password
export const getResetPassword = (req, res) => {
  try {
    return res.render("findPW");
  } catch (err) {
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
          location.href="${routes.home}"</script>`
    );
  }
};

// 비밀번호 변경 change password
export const getChangePassword = async (req, res) => {
  try {
    const {
      query: { token, email },
    } = req;
    const users = await User.findOne({ userID: email });
    const now = moment(new Date()).tz("Asia/seoul");
    const end = moment(users.resetPasswordExpires).tz("Asia/seoul");
    if (now.diff(end, "minutes") > 0) {
      res.send(
        `<script>alert("해당 링크는 만료되었습니다.");\
        location.href="${routes.user}${routes.resetPW}"</script>`
      );
    } else if (users.resetPasswordToken !== token) {
      res.send(
        `<script>alert("유효하지 않은 토큰값입니다.");\
        location.href="${routes.home}"</script>`
      );
    } else {
      res.render("changePW", { users });
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postChangePassword = async (req, res) => {
  try {
    const {
      query: { email },
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
      const user = await User.findOne({ userID: email });
      await user.setPassword(newPassword);
      await user.save();
      req.logout();
      res.send(
        `<script>alert("비밀번호가 변경되었습니다. \\r\\n다시 로그인해주세요.");\
        location.href="${routes.home}"</script>`
      );
    }
  } catch (err) {
    console.log(err);
  }
};

// export const postUserChangePassword = async (req, res) => {
//   try {
//     const {
//       body: { newPassword, newPasswordConfirm },
//     } = req;
//     if (newPassword !== newPasswordConfirm) {
//       res.send(`
//         <script>\
//           alert("비밀번호가 일치하지 않습니다.\\r\\n다시 한 번 확인해 주세요.");\
//           history.go(-1);\
//         </script>
//       `);
//     } else {
//       const userID = req.user._id;
//       const user = await User.findById(userID);
//       await user.setPassword(newPassword);
//       await user.save();
//       req.logout();
//       req.session.destroy((e) => {
//         console.log(e);
//         res.send(
//           `<script>alert("비밀번호가 변경되었습니다. \\r\\n다시 로그인해주세요.");\
//           location.href="${routes.home}"</script>`
//         );
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

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
    return res.render("wishlist", { user, merchandise, choices });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const getMerchandisePayment = async (req, res) => {
  try {
    const {
      params: { merchandiseID },
    } = req;

    const merchandise = await Merchandise.findById(merchandiseID);

    res.render("merchandiseDetail", { merchandise });
  } catch (err) {
    console.log(err);
    res.send(`<script>alert("오류가 발생했습니다:\\r\\n${err}");\
location.href="${routes.home}"</script>`);
  }
};

// 로그인 유저의 개인 profile
export const getUserProfile = async (req, res) => {
  try {
    const {
      params: { userID },
    } = req;
    const user = await User.findById(userID);
    return res.render("myProfile", { user });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const getChatList = async (req, res) => {
  try {
    const userID = req.user._id;
    let normalUserID;
    const allChats = await Chat.find({ userID: { $in: userID } })
      .sort({ createdAt: -1 })
      .populate([{ path: "userID", model: "User" }]);
    res.render("chatList", { allChats });
  } catch (err) {
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const getCheckChat = async (req, res) => {
  try {
    const {
      params: { userOneID, userTwoID },
    } = req;
    const chats = await Chat.findOne({ $and: [{ userID: userOneID }, { userID: userTwoID }, { status: true }] });
    // 기존 채팅이 존재할 때
    if (chats) {
      res.send(`<script>location.href="${routes.user}${routes.chat}/detail/${chats._id}"</script>`);
    } else {
      // 채팅이 존재하지 않을 때
      const newChats = await Chat.create({
        userID: [userOneID, userTwoID],
        createdAt: moment(new Date()).tz("Asia/Seoul"),
      });
      res.send(`<script>location.href="${routes.user}${routes.chat}/detail/${newChats._id}"</script>`);
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const getChatDetail = async (req, res) => {
  try {
    const { chatID } = req.params;
    let adminID;
    const chats = await Chat.findById(chatID);

    if (chats) {
      chats.userID.forEach((x) => {
        if (req.user._id !== x) {
          adminID = x;
        }
      });
      console.log(chats.unread.userID);
      console.log(req.user._id);
      if (String(chats.unread.userID) !== String(req.user._id)) {
        chats.unread.count = 0;
      }
      chats.toUser = chats.userID[0];
      chats.fromUser = chats.userID[1];
      if (chats.userID[0].toString() === req.user._id.toString()) {
        chats.toUser = chats.userID[1];
        chats.fromUser = chats.userID[0];
      }
      const tempTalk = chats.talk.replaceAll(chats.toUser.toString(), `${chats.toUser.toString()} left`);
      chats.finalTalk = tempTalk.replaceAll(chats.fromUser.toString(), `${chats.fromUser.toString()} right`);
      chats.save();
      const admin = await User.findById(adminID);
      res.render("chat", { chats, admin });
    } else {
      res.send(
        `<script>alert("존재하지 않는 채팅방입니다.");\
        location.href="${routes.home}"</script>`
      );
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
