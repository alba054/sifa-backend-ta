import multer from "multer";

export class MulterHelper {
  private storage: multer.StorageEngine;
  public upload: multer.Multer;

  constructor(fileSize: number) {
    this.storage = multer.memoryStorage();
    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize,
      },
    });
  }
}

export const multerHelper = new MulterHelper(5e6);

// * i use this to handler photo answer
// * eachfile 1mb max
export const multerBatchHelper = new MulterHelper(1e6);
