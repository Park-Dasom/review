import moment from "moment-timezone";
import paginate from "express-paginate";
import routes from "../routes";
import Choice from "../models/Choice";
import Comment from "../models/Comment";
import Merchandise from "../models/Merchandise";
import Rate from "../models/Rate";
import User from "../models/User";

// 홈 Home
export const home = async (req, res) => {
  try {
    // 쿼리 조건에 따라 홈 화면 정렬
    const {
      query: { sort },
    } = req;

    let sortQuery = { createdAt: -1 };
    if (sort === "title") {
      sortQuery = { title: 1 };
    } else if (sort === "highPrice") {
      sortQuery = { price: -1 };
    } else if (sort === "lowPrice") {
      sortQuery = { price: 1 };
    } else if (sort === "highRate") {
      sortQuery = { rate: -1 };
    } else if (sort === "choice") {
      sortQuery = { choiceUserID: -1 };
    }

    let rates;
    let users;
    if (req.user) {
      rates = await Rate.find({ userID: req.user._id }).populate("userID").populate("merchandiseID");
      users = await User.findById(req.user._id).populate([{ path: "rateID", model: "Rate", populate: [{ path: "merchandiseID", model: "Merchandise" }] }]);
    }
    const comments = await Comment.find().populate("userID");
    const choices = await Choice.find().populate([{ path: "merchandiseID", model: "Merchandise" }]);
    // pagenation 데이터
    const [merchandiseItem, totalCount] = await Promise.all([
      Merchandise.find({})
        .sort(sortQuery)
        .populate([
          {
            path: "rateID",
            model: "Rate",
          },
          {
            path: "rateUserID",
            model: "User",
          },
        ])
        .limit(8)
        .exec(),
      Merchandise.countDocuments({}),
    ]);
    // const pageCount = Math.ceil(totalCount / limit);
    // const pages = paginate.getArrayPages(req)(10, pageCount, page);

    const admin = await User.find({ role: "master" });

    res.render("home", { comments, choices, rates, users, merchandiseItem, totalCount, admin });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const getMerchadiseDetail = async (req, res) => {
  try {
    let user;
    let rates;
    const {
      params: { merchandiseID },
    } = req;
    const merchandise = await Merchandise.findById(merchandiseID).populate([
      {
        path: "rateID",
        model: "Rate",
      },
      { path: "rateUserID", model: "User" },
    ]);
    const comments = await Comment.find().populate("userID");
    if (req.user) {
      const userID = req.user._id;
      rates = await Rate.findOne({ merchandiseID, userID });
      user = await User.findById(userID).populate("rateID");
    }
    res.render("merchandise", { merchandise, comments, user, rates });
  } catch (err) {
    console.log(err);
    res.send(`<script>alert("오류가 발생했습니다:\\r\\n${err}");\
location.href="${routes.home}"</script>`);
  }
};

export const getSearch = async (req, res) => {
  try {
    const {
      query: { keyword, minPrice, maxPrice, rate },
    } = req;
    const findQuery = { title: { $regex: keyword, $options: "i" } };
    if (minPrice && maxPrice) {
      // 가격 sorting query 있을 시
      findQuery.price = { $lte: maxPrice, $gte: minPrice };
    } else if (rate) {
      // 별점 sorting query 있을 시
      findQuery.avgRate = { $gte: rate };
    }
    const merchandiseItems = await Merchandise.find(findQuery);

    res.render("search", { merchandiseItems, keyword });
  } catch (err) {
    console.log(err);
    res.send(`<script>alert("오류가 발생했습니다:\\r\\n${err}");\
location.href="${routes.home}"</script>`);
  }
};

export const getMap = async (req, res) => {
  try {
    res.render("map");
  } catch (err) {
    console.log(err);
    res.send(`<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`);
  }
};
export const anotherController = () => {};
