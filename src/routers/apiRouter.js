import express from "express";
import { postChoice } from "../controllers/apiController";

const apiRouter = express.Router();
// choice true / fase
apiRouter.post("/check-heart", postChoice);
// // rating
// apiRouter.post("/", )

export default apiRouter;
