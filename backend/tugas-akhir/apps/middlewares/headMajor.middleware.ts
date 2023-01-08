import { Request, Response, NextFunction } from "express";
import { HeadLabService } from "../services/headLab.service";
import { HeadMajorService } from "../services/headMajor.service";
import { BadRequestError } from "../utils/error/badrequestError";

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class HeadMajorMiddleware {
  // static async checkEligibilityToEdit(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   const { supervisorID } = req.params;
  //   const body = req.body as IAssignedExaminer;

  //   const supervisor = await HeadLabService.getSupervisorDetail(
  //     Number(supervisorID)
  //   );

  //   if (supervisor === null) {
  //     return next(new NotFoundError("supevisor's not found"));
  //   }

  //   if (supervisor.statusTerima !== "Belum_Diproses") {
  //     return next(
  //       new BadRequestError("cannot edit accepted/rejected supervisor")
  //     );
  //   }

  //   return next();
  // }

  static async checkEligibilityToAssignExaminer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;
    const body = req.body as IAssignedExaminer;

    let supervisors = await HeadLabService.getSupervisorOfThesis(
      Number(thesisID)
    );

    supervisors = supervisors.filter((s) => s.statusTerima === "Diterima");
    console.log(supervisors);

    if (supervisors.length < 2) {
      return next(new BadRequestError("supervisors hasn't been set"));
    }

    let examiners = await HeadMajorService.getExaminersOfThesis(
      Number(thesisID)
    );

    examiners = examiners.filter((s) => s.ujiUrutan === body.position);
    examiners = examiners.filter(
      (s) =>
        s.statusTerima === "Belum_Diproses" || s.statusTerima === "Diterima"
    );

    if (examiners.length > 0) {
      return next(
        new BadRequestError(
          "cannot assign new lecturer as examiner " + body.position
        )
      );
    }

    return next();
  }
}
