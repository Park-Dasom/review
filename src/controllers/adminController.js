import passport from "passport";
import paginate from "express-paginate";
import moment from "moment-timezone";
import routes from "../routes";
import User from "../models/User";
import Sample from "../models/Sample";

// 관리자 로그인
export const getAdminLogin = (req, res) => {
  try {
    if (req.user) {
      res.send(`<script>location.href="${routes.admin}${routes.adminUser}"</script>`);
    } else {
      res.render("admin/adminLogin");
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postAdminLogin = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, _) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(
          `<script>alert("로그인 정보가 잘못되었습니다.");\
          location.href="${routes.admin}"</script>`
        );
      } else {
        if (user.role === "general") {
          return res.send(
            `<script>alert("마스터 관리자에게 승인 요청이 필요합니다.");\
              location.href="${routes.admin}"</script>`
          );
        } else {
          req.logIn(user, (e) => {
            if (err) {
              return next(e);
            }
            return res.send(
              `<script>alert("로그인 되었습니다.");\
              location.href="${routes.admin}${routes.adminUser}"</script>`
            );
          });
        }
      }
    })(req, res, next);
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 회원가입
export const getAdminRegister = (req, res) => {
  try {
    if (req.user) {
      res.send(`<script>location.href="${routes.admin}${routes.adminUser}"</script>`);
    } else {
      res.render("admin/adminRegister");
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postAdminRegister = async (req, res) => {
  try {
    const { body } = req;
    body.role = "general";
    if (body.password !== body.password2) {
      res.send(
        `<script>\
          alert("비밀번호가 일치하지 않습니다.");\
          location.href="${routes.admin}"\
        </script>`
      );
    } else {
      try {
        body.createdAt = moment(new Date()).tz("Asia/Seoul");
        body.updatedAt = moment(new Date()).tz("Asia/Seoul");
        const user = await User(body);
        await User.register(user, body.password);
        res.send(
          `<script>\
            alert("회원가입이 완료되었습니다.\\r\\n마스터 관리자 승인 후 로그인 하세요.");\
            location.href="${routes.admin}"\
          </script>`
        );
      } catch (err) {
        console.log(err);
        res.send(
          `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
          location.href="${routes.home}"</script>`
        );
      }
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}"); \
      location.href="${routes.home}"</script>`
    );
  }
};

// 로그아웃
export const adminLogout = (req, res) => {
  try {
    req.logout();
    req.session.destroy(() => {
      res.send(
        `<script>alert("로그아웃 되었습니다.");\
        location.href="${routes.admin}"</script>`
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

// 비밀번호 변경
export const getAdminChangePW = (req, res) => {
  try {
    res.render("admin/adminChangePW");
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postAdminChangePW = async (req, res) => {
  try {
    const {
      body: { newPassword, newPassword1 },
    } = req;
    if (newPassword !== newPassword1) {
      res.send(`<script>\
                  alert("비밀번호가 일치하지 않습니다.\\r\\n다시 한 번 확인해 주세요.");\
                  history.go(-1);\
                </script>`);
    } else {
      const user = await User.findById({ _id: req.user._id });
      await user.setPassword(newPassword);
      await user.save();

      req.logout();
      req.session.destroy((e) => {
        console.log(e);
        res.send(
          `<script>alert("비밀번호가 변경되었습니다. \\r\\n다시 로그인해주세요.");\
          location.href="${routes.admin}"</script>`
        );
      });
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 관리자 계정 관리
export const adminUser = async (req, res) => {
  try {
    const [adminItems, totalCount] = await Promise.all([User.find().sort({ createdAt: -1 }).limit(req.query.limit).skip(req.skip).exec(), User.countDocuments()]);
    const pageCount = Math.ceil(totalCount / req.query.limit);
    const pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);

    // 엑셀 다운로드용 전체 데이터
    const excelData = await Sample.find().sort({ createdAt: -1 });

    res.render("admin/adminUser", {
      adminNameKo: "관리자 계정",
      adminLink: routes.adminUser,
      limit: req.query.limit,
      adminItems,
      totalCount,
      pageCount,
      pages,
      excelData,
    });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const adminUserApprove = async (req, res) => {
  try {
    const {
      params: { userID },
    } = req;
    await User.findByIdAndUpdate(userID, { role: "admin" });
    res.send(
      `<script>\
        alert("승인 되었습니다.");\
        location.href="${routes.admin}${routes.adminUser}"\
      </script>`
    );
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const adminUserDelete = async (req, res) => {
  try {
    const {
      params: { userID },
    } = req;
    await User.findByIdAndDelete(userID);
    res.send(
      `<script>\
        alert("삭제 되었습니다.");\
        location.href="${routes.admin}${routes.adminUser}"\
      </script>`
    );
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 관리자 샘플 관리
export const adminSample = async (req, res) => {
  try {
    const {
      query: { searchKey, searchValue, limit },
    } = req;

    let findQuery = {};

    // 검색 기능이 있을 경우
    const searchArr = [
      { code: "0", title: "데이터1", value: "data1" },
      { code: "1", title: "데이터2", value: "data2" },
      { code: "2", title: "데이터3", value: "data3" },
      { code: "3", title: "데이터4", value: "data4" },
      { code: "5", title: "데이터5", value: "data5" },
    ];
    if (searchKey && searchValue) {
      findQuery[`${searchArr[parseInt(searchKey, 10)].value}`] = { $regex: searchValue, $options: "i" };
    }

    // pagination 데이터
    const [adminItems, totalCount] = await Promise.all([Sample.find(findQuery).sort({ createdAt: -1 }).limit(limit).skip(req.skip).exec(), Sample.countDocuments(findQuery)]);
    const pageCount = Math.ceil(totalCount / limit);
    const pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);

    // 엑셀 다운로드용 전체 데이터
    const excelData = await Sample.find(findQuery).sort({ createdAt: -1 });

    res.render("admin/adminSample", {
      adminNameKo: "샘플 데이터",
      adminLink: routes.adminSample,
      limit,
      searchArr,
      searchKey,
      searchValue,
      adminItems,
      totalCount,
      pageCount,
      pages,
      excelData,
    });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const getCreateSample = (_, res) => {
  try {
    res.render("admin/adminSampleForm", {
      adminNameKo: "샘플 데이터",
      adminLink: routes.adminSample,
      updateBool: false,
      formType: "등록",
    });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postCreateSample = async (req, res) => {
  try {
    const { body, file } = req;

    body.thumbnail = file ? file.location : null;
    body.createdAt = moment(new Date()).tz("Asia/Seoul");
    body.updatedAt = moment(new Date()).tz("Asia/Seoul");
    await Sample.create(body);

    res.send(`\
      <script>alert("샘플이 등록되었습니다.");\
      location.href="${routes.admin}${routes.adminSample}";</script>\
    `);
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const getSampleDetail = async (req, res) => {
  try {
    const {
      params: { sampleID },
    } = req;
    const adminItem = await Sample.findById(sampleID);
    res.render("admin/adminSampleDetail", {
      adminNameKo: "샘플 데이터",
      adminLink: routes.adminSample,
      adminItem,
    });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const getUpdateSample = async (req, res) => {
  try {
    const {
      params: { sampleID },
    } = req;
    const adminItem = await Sample.findById(sampleID);
    res.render("admin/adminSampleForm", {
      adminNameKo: "샘플 데이터",
      adminLink: routes.adminSample,
      updateBool: true,
      formType: "수정",
      adminItem,
    });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const postUpdateSample = async (req, res) => {
  try {
    const {
      params: { sampleID },
      body,
      file,
    } = req;
    const samples = await Sample.findById(sampleID);
    body.thumbnail = file ? file.location : samples.thumbnail;
    body.updatedAt = moment(new Date()).tz("Asia/Seoul");
    await Sample.findByIdAndUpdate(sampleID, body);
    res.send(
      `<script>alert("샘플이 수정되었습니다.");\
      location.href="${routes.admin}${routes.adminSample}"</script>`
    );
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
export const getDeleteSample = async (req, res) => {
  try {
    const {
      params: { sampleID },
    } = req;
    await Sample.findByIdAndDelete(sampleID);
    res.send(
      `<script>alert("샘플이 삭제되었습니다.");\
      location.href="${routes.admin}${routes.adminSample}"</script>`
    );
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};
