import routes from "../routes";
import Choice from "../models/Choice";
import Comment from "../models/Comment";
import Merchandise from "../models/Merchandise";
import Rate from "../models/Rate";
import User from "../models/User";
import paginate from "express-paginate";

// 홈 Home
export const home = async (req, res) => {
  try {
    // 쿼리 조건에 따라 홈 화면 정렬
    const {
      query: { sort, page, limit },
    } = req;

    let sortQuery = { createdAt: -1 };
    if (sort === "title") {
      sortQuery = { title: 1 };
    } else if (sort === "highPrice") {
      sortQuery = { price: -1 };
    } else if (sort === "lowPrice") {
      sortQuery = { price: 1 };
    } else if (sort === "highRate") {
      sortQuery = { rateID: -1 };
    } else if (sort === "choice") {
      sortQuery = { choiceUserID: -1 };
    }

    // pagenation 데이터
    const [merchandiseItem, totalCount] = await Promise.all([
      Merchandise.find({})
        .sort(sortQuery)
        .populate([
          { path: "choiceID", model: "Choice" },
          // {
          //   path: "choiceUserID",
          //   model: "User",
          //   populate: {
          //     path: "userID",
          //     model: "User",
          //   },
          // },
          {
            path: "rateID",
            model: "Rate",
            // populate: {
            //   path: "userID",
            //   model: "User",
            // },
          },
        ])
        .limit(limit)
        .skip(req.skip)
        .exec(),
      Merchandise.countDocuments({}),
    ]);
    const pageCount = Math.ceil(totalCount / limit);
    const pages = paginate.getArrayPages(req)(10, pageCount, page);
    const comments = await Comment.find().populate("userID");
    let users;
    if (req.user) {
      users = await User.findById(req.user._id).populate([
        { path: "choiceID", model: "Choice", populate: [{ path: "merchandiseID", model: "Merchandise" }] },
        { path: "rateID", model: "Rate" },
        { path: "commentID", model: "Comment" },
      ]);
    }

    // merchandiseItem.forEach((x) => {
    //   if (req.user && x.choiceUserID === req.user._id) {
    //   }
    // });

    // merchandiseItem.forEach((x) => {
    //   x.rateID.forEach((y) => {
    //     if (req.user && y.userID[0]._id === req.user.id) {
    //       x.myRate = y.rate;
    //     } else {
    //       x.myRate = 0;
    //     }
    //   });
    // });

    const choices = await Choice.find().populate([{ path: "merchandiseID", model: "Merchandise" }]);
    res.render("home", { comments, users, choices, merchandiseItem, totalCount, pageCount, pages, page, limit });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

// 장바구니 cartList
export const getMerchandise = async (req, res) => {
  try {
    const {
      params: { merchandiseID },
    } = req;
    const merchandise = await Merchandise.findById(merchandiseID);
    return res.render("merchandise", { merchandise });
  } catch (err) {
    console.log(err);
  }
};

export const anotherController = () => {};
