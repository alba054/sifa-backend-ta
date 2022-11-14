import express from "express";
import groupRouter from "./group.route";
import groupUnitRouter from "./groupUnit.route";
import studentRouter from "./student.route";
import lecturerRouter from "./lecturer.route";
import userRouter from "./user.route";
import departmentRouter from "./departement.route";
import vocationRouter from "./vocation.route";

const router = express.Router();

router.use("/users", userRouter);
router.use("/students", studentRouter);
router.use("/group-units", groupUnitRouter);
router.use("/groups", groupRouter);
router.use("/lecturers", lecturerRouter);
router.use("/departments", departmentRouter);
router.use("/vocations", vocationRouter);

export default router;
