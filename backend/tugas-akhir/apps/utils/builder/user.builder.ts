import { User } from "../../models/user.model";

export class UserBuilder {
  static build(username: string, password: string, email: string) {
    return new User(username, password, email);
  }
}
