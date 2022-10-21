import { User } from "../apps/models/user.model";
import { UserBuilder } from "../apps/utils/builder/user.builder";

export async function insertSuperUserAccount() {
  const userSignUp = {
    username: "superuser",
    password: "superuser",
    email: "superuser@mail.com",
  };

  try {
    const user = await User.insertIntoUser(
      UserBuilder.build(
        userSignUp.username,
        userSignUp.password,
        userSignUp.email
      )
        .setGroupAccess(1)
        .setName("superuser")
        .setStatus(1)
    );

    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
