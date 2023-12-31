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
import docRouter from "./doc.route";
import notifRouter from "./notification.route";
import userIntegrationRouter from "./userIntegration.route";
import webNotifRouter from "./webNotif.route";
import headDepartmentRouter from "./headDepartment.route";
import statisticRouter from "./statistic.route";
import refSeminarRouter from "./refSeminar.route";

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
router.use("/head-departments", headDepartmentRouter);
router.use("/head-labs", headLabRouter);
router.use("/head-faculties", headFacultyRouter);
router.use("/ref-letters", refLetterRouter);
router.use("/ref-seminar", refSeminarRouter);
router.use("/subsection-admins", subsectionAdminRouter);
router.use("/head-admins", headAdminRouter); // * ktu
router.use("/deans", deanRouter);
router.use("/seminar-coordinators", seminarCoordinatorRouter);
router.use("/vice-deans", viceDeanRouter);
router.use("/statistics", statisticRouter);
// * chat service
router.use("/chat", chatRouter);
router.use("/files", fileRouter);
router.use("/docs", docRouter);
router.use("/notifications", notifRouter);
router.use("/web-notif", webNotifRouter);
router.use("/user-integration", userIntegrationRouter);

export default router;
