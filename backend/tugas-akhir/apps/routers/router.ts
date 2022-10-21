import express from "express";
import groupRouter from "./group.route";
import groupUnitRouter from "./groupUnit.route";
import userRouter from "./user.route";

const router = express.Router();

router.use("/api/v0/users/", userRouter);
router.use("/api/v0/group-units/", groupUnitRouter);
router.use("/api/v0/groups/", groupRouter);

export default router;
