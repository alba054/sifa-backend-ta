import { clearDatabase } from "./clear";
import { insertDepartments } from "./department.seed";
import { populateGroupAdmin } from "./groupAdmin.seed";
import { insertSuperUserRole } from "./groupAdminUnit.seed";
import { insertInitialUser } from "./user.seed";
import { insertVocations } from "./vocation.seed";

async function main() {
  try {
    await clearDatabase();
    await insertDepartments();
    await populateGroupAdmin();
    await insertSuperUserRole();
    await insertInitialUser();
    await insertVocations();
  } catch (error) {
    console.error(error);
  }
}

main().then().catch();
