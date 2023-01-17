import express from "express";
import groupRouter from "./group.route";
import groupUnitRouter from "./groupUnit.route";
import studentRouter from "./student.route";
import lecturerRouter from "./lecturer.route";
import userRouter from "./user.route";
import departmentRouter from "./departement.route";
import vocationRouter from "./vocation.route";
import laboratoryRouter from "./laboratory.route";
import headMajorRouter from "./headMajor.route";
import headLabRouter from "./headLab.route";
import headFacultyRouter from "./headFaculty.route";
import chatRouter from "./chat.route";
import refLetterRouter from "./refLetter.route";
import fileRouter from "./file.route";

const router = express.Router();

router.use("/users", userRouter);
router.use("/students", studentRouter);
router.use("/group-units", groupUnitRouter);
router.use("/groups", groupRouter);
router.use("/lecturers", lecturerRouter);
router.use("/departments", departmentRouter);
router.use("/vocations", vocationRouter);
router.use("/laboratories", laboratoryRouter);
router.use("/head-majors", headMajorRouter);
router.use("/head-labs", headLabRouter);
router.use("/head-faculties", headFacultyRouter);
router.use("/ref-letters", refLetterRouter);
// * chat service
router.use("/chat", chatRouter);
router.use("/files", fileRouter);

export default router;
