import moment from "moment-timezone";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
import User from "./models/User";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

const multerMerchandisePic = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "gooooooods/merchandise",
    key(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
  }),
});

// 한 개의 input(type="file")일 경우
export const uploadMerchandisePic = multerMerchandisePic.fields([{ name: "thumbnail1" }, { name: "thumbnail2" }]);
// 여러 input(type="file")일 경우
// export const uploadSamplePic = multerSamplePic.fields([{ name: "thumbnail1" }, { name: "thumbnail2" }]);

export const localsMiddleware = async (req, res, next) => {
  res.locals.siteName = "Gooooooods";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  res.locals.currentYear = new Date().getFullYear().toString();
  res.locals.currentUrl = req.url;
  res.locals.addComma = (number) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return number.toString().replace(regexp, ",");
  };
  res.locals.replaceAll = (str, searchStr, replaceStr) => str.split(searchStr).join(replaceStr);

  // 회원 유형 체크
  res.locals.latestUser = req.user ? await User.findById(req.user._id) : null;

  // 할인율 적용 후 가격 (할인가)
  res.locals.discountPrice = (price, discountRate) => Math.ceil(price * ((100 - discountRate) * 0.01), 1);

  // 날짜 형식 변환
  res.locals.dateFormatYMD = (date) => moment(date).tz("Asia/Seoul").format("YYYY-MM-DD");
  res.locals.dateFormatYMDHm = (date) => moment(date).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm");
  res.locals.dateFormatYMDHms = (date) => moment(date).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
  console.log(moment.tz.guess());
  // 배열 Random 섞기
  res.locals.shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  // SendGrid Single Sender Email Address
  res.locals.singleSenderEmail = "studiverum@naver.com";
  // 랜덤 이미지 URL
  res.locals.randomImg = "https://source.unsplash.com/random";
  // 이미지 파일 경로
  res.locals.imgPath = "/images";
  // 캐시 삭제 방지용 Date Query
  res.locals.versionDateQuery = new Date().getTime();
  next();
};

// --- 접근 권한 설정 ---
// 비회원만 접근 가능
export const onlyPublic = (req, res, next) => {
  try {
    if (req.user) {
      res.send(
        `<script>alert("잘못된 접근입니다."); \
        location.href="${routes.home}"</script>`
      );
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("알 수 없는 오류가 발생하였습니다."); \
      location.href="${routes.home}"</script>`
    );
  }
};
// 회원만 접근 가능
export const onlyUser = (req, res, next) => {
  try {
    if (req.user) {
      next();
    } else {
      res.send(
        `<script>alert("잘못된 접근입니다."); \
        location.href="${routes.home}"</script>`
      );
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("알 수 없는 오류가 발생하였습니다."); \
      location.href="${routes.home}"</script>`
    );
  }
};
// 관리자만 접근 가능
export const onlyAdmin = (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.role === "master" || req.user.role === "admin") {
        next();
      } else {
        res.send(
          `<script>alert("관리자 권한이 필요합니다."); \
          location.href="${routes.home}"</script>`
        );
      }
    } else {
      res.send(
        `<script>alert("관리자 로그인이 필요합니다."); \
        location.href="${routes.admin}"</script>`
      );
    }
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("알 수 없는 오류가 발생하였습니다."); \
      location.href="${routes.home}"</script>`
    );
  }
};
