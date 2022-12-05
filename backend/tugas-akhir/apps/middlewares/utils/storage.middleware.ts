import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { BadRequestError } from "../../utils/error/badrequestError";
import { writeToFile } from "../../utils/storage";
import { constants } from "../../utils/utils";

export class StorageMiddleware {
  static async uploadKRSAndKHS(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let title1 = uuidv4();
    let title2 = uuidv4();

    const { nim } = req.params;
    try {
      const path = `${constants.KRS_AND_KHS_PATH}/${nim}`;
      if (typeof req.files === "undefined") {
        throw new BadRequestError("provide files");
      }

      if (Array.isArray(req.files)) {
        if (req.files.length !== 2) {
          throw new BadRequestError("provide 2 files");
        }

        title1 += "." + req.files[0].originalname.split(".")[1];
        title2 += "." + req.files[1].originalname.split(".")[1];

        writeToFile(path, title1, req.files[0].buffer);
        writeToFile(path, title2, req.files[1].buffer);
      }

      res.locals.KRSPath = `${constants.KRS_AND_KHS_PATH}/${nim}/${title1}`;
      res.locals.KHSPath = `${constants.KRS_AND_KHS_PATH}/${nim}/${title2}`;
      next();

      // return res
      //   .status(201)
      //   .json(
      //     createResponse(
      //       constants.SUCCESS_MESSAGE,
      //       "successfully uploaded krs and khs"
      //     )
      //   );
    } catch (error) {
      return next(error);
    }
  }
}
