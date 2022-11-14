import { User } from "../apps/models/user.model";
import { UserService } from "../apps/services/user.service";
import { UserBuilder } from "../apps/utils/builder/user.builder";
import prismaDB from "../apps/utils/database";
import { constants } from "../apps/utils/utils";

export async function insertInitialUser() {
  const userSignUp = [
    UserBuilder.build("superuser", "superuser")
      .setGroupAccess(constants.SUPERUSER_GROUP_ACCESS)
      .setName("superuser")
      .setStatus(constants.USER_ACTIVE_STATUS)
      .setEmail("superuser@mail.com")
      .transformToIUser(),
    UserBuilder.build("145259834693385264", "145259834693385264")
      .setGroupAccess(constants.LECTURER_GROUP_ACCESS)
      .setName("Nurhasni Hasan, S.Si., M.Pharm.Sc., Ph.D., apt")
      .setStatus(constants.USER_ACTIVE_STATUS)
      .transformToIUser(),
    UserBuilder.build("124095270341248856", "124095270341248856")
      .setGroupAccess(constants.LECTURER_GROUP_ACCESS)
      .setName("Abdul Rahim, S.Si., M.Si., PhD., apt")
      .setStatus(constants.USER_ACTIVE_STATUS)
      .transformToIUser(),
    UserBuilder.build("124857429457257294", "124857429457257294")
      .setGroupAccess(constants.LECTURER_GROUP_ACCESS)
      .setName("Muhammad Aswad, S.Si., M.Si., Ph.D., apt")
      .setStatus(constants.USER_ACTIVE_STATUS)
      .transformToIUser(),
    UserBuilder.build("199574363245783257", "199574363245783257")
      .setGroupAccess(constants.LECTURER_GROUP_ACCESS)
      .setName("Yusnita Rifai, Ph.D., apt")
      .setStatus(constants.USER_ACTIVE_STATUS)
      .transformToIUser(),
    UserBuilder.build("128852340252734652", "128852340252734652")
      .setGroupAccess(constants.LECTURER_GROUP_ACCESS)
      .setName("Muh. Ikhsan, S.Si")
      .setStatus(constants.USER_ACTIVE_STATUS)
      .transformToIUser(),
  ];

  const lecturers = [
    {
      dsnNama: "Nurhasni Hasan, S.Si., M.Pharm.Sc., Ph.D., apt",
      dsnNip: "145259834693385264",
      dsnDprtId: 1,
    },
    {
      dsnNama: "Abdul Rahim, S.Si., M.Si., PhD., apt",
      dsnNip: "124095270341248856",
      dsnDprtId: 1,
    },
    {
      dsnNama: "Muhammad Aswad, S.Si., M.Si., Ph.D., apt",
      dsnNip: "124857429457257294",
      dsnDprtId: 1,
    },
    {
      dsnNama: "Yusnita Rifai, Ph.D., apt",
      dsnNip: "199574363245783257",
      dsnDprtId: 1,
    },
  ];

  try {
    userSignUp.forEach(async (user) => {
      await UserService.insertNewUserBySuperUser(user);
    });
    await prismaDB.dosen.createMany({
      data: lecturers,
    });

    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
