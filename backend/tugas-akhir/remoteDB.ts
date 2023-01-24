import mysql from "mysql";
import dotenv from "dotenv";
import { User } from "./apps/models/user.model";
import { constants } from "./apps/utils/utils";
import { UserAsStudent } from "./apps/services/user/UserAsStudent.facade";
import { UserAsLecturer } from "./apps/services/user/UserAsLecturer.facade";
import { UserAsVocationAdmin } from "./apps/services/user/UserAsVocationAdmin.facade";
import { UserFacade } from "./apps/services/user/User.facade";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.REMOTE_DB_HOST,
  user: process.env.REMOTE_DB_USERNAME,
  password: process.env.REMOTE_DB_PASSWORD,
  database: process.env.REMOTE_DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error(err);
  }
  return;
});

const roleMap = new Map();
roleMap.set(1, 1);
roleMap.set(2, 4);
roleMap.set(3, 2);
roleMap.set(4, 6);
roleMap.set(5, 7);
roleMap.set(6, 3);
roleMap.set(7, 10);
roleMap.set(8, 11);
roleMap.set(9, 9);
roleMap.set(10, 12);
roleMap.set(11, 8);
roleMap.set(12, 5);

export function fetchNewUserData() {
  connection.query("select * from user", (err, res, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    res.forEach(
      async (u: {
        username: string;
        password: string;
        department: number;
        email: string;
        name: string;
        user_role_id: number;
        major: number;
      }) => {
        const username = u.username;
        const password = u.password.replace("{bcrypt}", "");
        const department = Number(u.department);
        const email = u.email;
        const name = u.name;
        const role = roleMap.get(Number(u.user_role_id));
        console.log(role);

        const major = Number(u.major);

        const user = await User.getUserByUsername(username);

        try {
          if (user === null) {
            if (Number(role) === constants.STUDENT_GROUP_ACCESS) {
              // todo: insert into mahasiswa table
              // const insertedNewStudent = await StudentService.insertUserIntoStudent({
              //   nim: newUser.username,
              //   name: newUser.name || "",
              //   email: newUser.email,
              // });
              await UserAsStudent.insertUserAsStudent({
                groupAccess: role,
                username,
                email,
                name,
                password,
              });
            } else if (Number(role) === constants.LECTURER_GROUP_ACCESS) {
              // todo: lecturer departmentID is undefined so create a default value
              await UserAsLecturer.insertUserAsLecturer({
                groupAccess: role,
                username,
                email,
                name,
                password,
              });
              // } else if (
              //   Number(role) === constants.LAB_ADMIN_GROUP_ACCESS
              // ) {
              //   insertedUser = await UserAsLabAdmin.insertUserAsLabAdmin(newUser);
            } else if (Number(role) === constants.VOCATION_ADMIN_GROUP_ACCESS) {
              await UserAsVocationAdmin.insertUserAsVocationAdmin({
                groupAccess: role,
                username,
                password,
                email,
                name,
                vocationID: major ?? 1,
                departmentID: department ?? 1,
              });
            } else {
              await UserFacade.insertUser({
                username,
                groupAccess: role,
                password,
                email,
                name,
              });
            }
          } else {
            await User.resetPassword(username, password);
          }
        } catch (error) {
          console.error(error);
        }
      }
    );
  });
}
