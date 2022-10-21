import { populateGroupAdmin } from "./groupAdmin.seed";
import { insertSuperUserRole } from "./groupAdminUnit.seed";
import { insertSuperUserAccount } from "./user.seed";

async function main() {
  try {
    await populateGroupAdmin();
    await insertSuperUserRole();
    await insertSuperUserAccount();
  } catch (error) {
    console.error(error);
  }
}

main().then().catch();
