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
import subsectionAdminRouter from "./subsectionAdmin.route";
import headAdminRouter from "./headAdmin.route";
import deanRouter from "./dean.route";
import seminarCoordinatorRouter from "./seminarCoordinator.route";
import viceDeanRouter from "./viceDean.route";

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
router.use("/subsection-admins", subsectionAdminRouter);
router.use("/head-admins", headAdminRouter); // * ktu
router.use("/deans", deanRouter);
router.use("/seminar-coordinators", seminarCoordinatorRouter);
router.use("/vice-deans", viceDeanRouter);
// * chat service
router.use("/chat", chatRouter);
router.use("/files", fileRouter);

export default router;
