// dprtId            Int                 @id @default(autoincrement())
//   dprtNama          String              @db.VarChar(50)
//   dprtKepalaNama    String?             @db.VarChar(60)
//   dprtKepalaNip     String?             @db.VarChar(25)

interface IDepartment {
  name: string;
  headDepartmentName?: string;
  headDepartmentNIP?: string;
}
