import { Student } from "../../models/student.model";

export class StudentBuilder {
  static build(nim: string, name: string) {
    return new Student(nim, name);
  }
}
