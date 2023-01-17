import { decodeBase64 } from "../utils/decoder";
import { v4 as uuidv4 } from "uuid";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";

export class FileService {
  static async uploadFileSign(sign: string, extension: string) {
    const signBuffer = decodeBase64(sign);
    const title = uuidv4() + "." + extension;
    const path = `${constants.SIGN_FILE_PATH}`;

    return writeToFile(path, title, signBuffer);
  }
}
