import { v4 as uuidv4 } from "uuid";
import bcryptjs from "bcryptjs";
import db from "../database";

const main = async () => {
  await db.user.create({
    data: {
      id: uuidv4(),
      username: "admin",
      password: await bcryptjs.hash("randompassword", 10),
      fullname: "ADMIN",
      role: "ADMIN",
    },
  });
};

main();
