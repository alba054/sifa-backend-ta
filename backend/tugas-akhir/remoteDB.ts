import mysql from "mysql";
import dotenv from "dotenv";
import { User } from "./apps/models/user.model";
import { constants } from "./apps/utils/utils";
import { UserAsStudent } from "./apps/services/user/UserAsStudent.facade";
import { UserAsLecturer } from "./apps/services/user/UserAsLecturer.facade";
import { UserAsVocationAdmin } from "./apps/services/user/UserAsVocationAdmin.facade";
import { UserFacade } from "./apps/services/user/User.facade";
import prismaDB from "./apps/utils/database";

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

export function fetchNewRoles() {
  connection.query("select * from user_role", (err, res, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    res.forEach(async (r: { id: number; name: string }) => {
      try {
        await prismaDB.adm_group_unit.create({
          data: { aksesId: r.id, aksesNama: r.name },
        });
      } catch (error) {}
    });
  });
}

export function fetchNewBadges() {
  connection.query("select * from badge", (err, res, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    res.forEach(async (b: { id: number; name: string }) => {
      try {
        await prismaDB.badge.create({
          data: { name: b.name, id: b.id },
        });
      } catch (error) {}
    });
  });
}

export function fetchNewLabs() {
  connection.query("select * from lab", (err, res, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    res.forEach(async (l: { id: number; name: string }) => {
      try {
        await prismaDB.ref_laboratorium.create({
          data: {
            labId: l.id,
            labNama: l.name,
          },
        });
      } catch (error) {}
    });
  });
}

export function fetchNewDepartment() {
  connection.query("select * from department", (err, res, fields) => {
    if (err) {
      console.error(err);
      return;
    }

    res.forEach(async (d: { id: number; name: string }) => {
      try {
        const department = await prismaDB.ref_departemen.create({
          data: {
            dprtNama: d.name,
            dprtId: d.id,
          },
        });
      } catch (error) {}
    });
  });
}

export function fetchNewMajor() {
  connection.query(`select * from major`, (err, res, fields) => {
    if (err) {
      console.error(err);
      return;
    }
    res.forEach(async (m: { id: number; code: string; name: string }) => {
      // const oldMajor = await prismaDB.ref_prodi.findFirst({
      //   where: { prdKode: m.code },
      // });

      // if (oldMajor !== null) {
      //   await prismaDB.ref_prodi.updateMany({
      //     where: { prdKode: oldMajor.prdKode },
      //     data: { prdNama: m.name },
      //   });
      // } else {
      //   // await prismaDB.ref_prodi.create({
      //   //   data: { prdNama: m.name, prdKode: m.code },
      //   // });
      // }
      try {
        await prismaDB.ref_prodi.create({
          data: { prdId: m.id, prdNama: m.name, prdKode: m.code },
        });
      } catch (error) {}
    });
  });
}

export function fetchNewUserData(time?: Date | string) {
  let count = 0;
  connection.query(
    `select * from user where updated_at >= ${time || "2001-01-01"}`,
    (err, res, fields) => {
      if (err) {
        console.error(err);
        return;
      }

      res.forEach(
        async (u: {
          id: number;
          username: string;
          password: string;
          department: number;
          email: string;
          name: string;
          user_role_id: number;
          major: number;
          is_enable: number;
          lab_id: number;
          signature_path: number;
        }) => {
          // count++;
          // console.log(count);

          const id = u.id;
          const username = u.username;
          const password = u.password.replace("{bcrypt}", "");
          const department = Number(u.department);
          const email = u.email;
          const name = u.name;
          const major = Number(u.major);
          const role = Number(u.user_role_id);
          const status = Number(u.is_enable);
          const lab = u.lab_id;

          const user = await User.getUserByUsername(username);
          connection.query(
            `select * from user_role where id = '${role}'`,
            async (err, res, fields) => {
              try {
                if (user === null) {
                  if (res[0].name === constants.STUDENT_GROUP_ACCESS) {
                    // todo: insert into mahasiswa table
                    // const insertedNewStudent = await StudentService.insertUserIntoStudent({
                    //   nim: newUser.username,
                    //   name: newUser.name || "",
                    //   email: newUser.email,
                    // });
                    await UserAsStudent.insertUserAsStudent({
                      id,
                      groupAccess: role,
                      username,
                      email,
                      name,
                      password,
                      vocationID: major,
                      departmentID: department,
                      status,
                    });
                  } else if (res[0].name === constants.LECTURER_GROUP_ACCESS) {
                    // todo: lecturer departmentID is undefined so create a default value
                    await UserAsLecturer.insertUserAsLecturer({
                      id,
                      groupAccess: role,
                      username,
                      email,
                      name,
                      password,
                      departmentID: department,
                      vocationID: major,
                      labID: lab ?? null,
                      status,
                    });
                    // } else if (
                    //   Number(role) === constants.LAB_ADMIN_GROUP_ACCESS
                    // ) {
                    //   insertedUser = await UserAsLabAdmin.insertUserAsLabAdmin(
                    //     newUser
                    //   );
                    // } else if (
                    //   res[0].name === constants.VOCATION_ADMIN_GROUP_ACCESS
                    // ) {
                    //   await UserAsVocationAdmin.insertUserAsVocationAdmin({
                    //     groupAccess: role,
                    //     username,
                    //     password,
                    //     email,
                    //     name,
                    //     vocationID: major ?? 1,
                    //     departmentID: department ?? 1,
                    //   });
                  } else {
                    await UserFacade.insertUser({
                      id,
                      username,
                      groupAccess: role,
                      password,
                      email,
                      name,
                      vocationID: major,
                      departmentID: department,
                      status,
                      labID: lab ?? null,
                    });
                  }
                } else {
                  const updatedUser = await User.resetPassword(
                    username,
                    password,
                    role,
                    department,
                    major,
                    email,
                    name,
                    lab
                  );
                }
              } catch (error) {
                console.error(error);
              }
            }
          );
        }
      );
    }
  );

  connection.query("select * from user_badges", (err, res, fields) => {
    if (err) {
      return console.error(err);
    }

    res.forEach(async (b: { user_id: number; badges_id: number }) => {
      try {
        await prismaDB.user_badge.create({
          data: {
            badgeId: b.badges_id,
            userId: b.user_id,
          },
        });
      } catch (error) {}
    });
  });
}
