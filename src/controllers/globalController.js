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
      query: { sort, limit },
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
      sortQuery = { choiceID: -1 };
    }

    // pagenation 데이터
    const [merchandiseItem, totalCount] = await Promise.all([
      Merchandise.find({})
        .sort(sortQuery)
        .populate([
          { path: "choiceID", model: "Choice" },
          { path: "rateID", model: "Rate" },
        ])
        .limit(limit)
        .skip(req.skip)
        .exec(),
      Merchandise.countDocuments({}),
    ]);
    const pageCount = Math.ceil(totalCount / limit);
    const pages = paginate.getArrayPages(req)(10, pageCount, req.query.page);
    const comments = await Comment.find().populate("userID");

    const users = await User.find().populate([
      { path: "choiceID", model: "Choice" },
      { path: "rateID", model: "Rate" },
      { path: "commentID", model: "Comment" },
    ]);
    res.render("home", { comments, users, merchandiseItem, totalCount, pageCount, pages, limit });
  } catch (err) {
    console.log(err);
    res.send(
      `<script>alert("오류가 발생했습니다:\\r\\n${err}");\
      location.href="${routes.home}"</script>`
    );
  }
};

export const anotherController = () => {};
