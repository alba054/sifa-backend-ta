import fs from "fs";
import multer from "multer";
import { constants } from "./utils";

export const upload = multer({
  // dest: pathToSave,
  limits: {
    fileSize: constants.MAXIMUM_UPLOADED_FILE_SIZE,
  },
});

export function writeToFile(path: string, filename: string, file: Buffer) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  fs.createWriteStream(`${path}/${filename}`).write(file);

  return `${filename}`;
}

export function deleteFile(path: string) {
  if (!fs.existsSync(path)) {
    return false;
  }

  fs.unlink(path, (err) => {
    if (typeof err !== null) {
      console.log(err);
    }
    console.log("successfully removing file");
  });

  return true;
}
