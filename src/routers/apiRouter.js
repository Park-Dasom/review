import express from "express";
import { postChoice, postRating } from "../controllers/apiController";

const apiRouter = express.Router();
// choice true / fase
apiRouter.post("/check-heart", postChoice);
// rating
//apiRouter.post("/rating", postRating);

export default apiRouter;
