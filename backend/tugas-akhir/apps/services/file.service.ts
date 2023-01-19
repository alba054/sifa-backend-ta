import { decodeBase64 } from "../utils/decoder";
import { v4 as uuidv4 } from "uuid";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";

export class FileService {
  static async uploadFileSeminarDoc(doc: any, username: any) {
    const docBuffer = decodeBase64(doc);
    const title = `${uuidv4()}_${username}`;
    const path = `${constants.SEMINAR_FILE_PATH}`;

    return writeToFile(path, title, docBuffer);
  }

  static async uploadFileSign(sign: string, username: string) {
    const signBuffer = decodeBase64(sign);
    const title = username;
    const path = `${constants.SIGN_FILE_PATH}`;

    return writeToFile(path, title, signBuffer);
  }
}
