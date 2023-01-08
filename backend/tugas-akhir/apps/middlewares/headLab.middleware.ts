import { Request, Response, NextFunction } from "express";
import { HeadLabService } from "../services/headLab.service";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class HeadLabMiddleware {
  // static async checkDuplicatePosition(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   let supervisors = await HeadLabService.getSupervisorOfThesis(
  //     Number(thesisID)
  //   );

  //   supervisors = supervisors.filter((s) => s.ref_posisipmb === body.position);
  // }

  static async checkEligibilityToEdit(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { supervisorID } = req.params;
    const body = req.body as ISupervisorBodyPost;

    const supervisor = await HeadLabService.getSupervisorDetail(
      Number(supervisorID)
    );

    if (supervisor === null) {
      return next(new NotFoundError("supevisor's not found"));
    }

    if (supervisor.statusTerima !== "Belum_Diproses") {
      return next(
        new BadRequestError("cannot edit accepted/rejected supervisor")
      );
    }

    return next();
  }

  static async checkEligibilityToCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { thesisID } = req.params;
    const body = req.body as ISupervisorBodyPost;

    let supervisors = await HeadLabService.getSupervisorOfThesis(
      Number(thesisID)
    );

    supervisors = supervisors.filter((s) => s.ref_posisipmb === body.position);
    supervisors = supervisors.filter(
      (s) =>
        s.statusTerima === "Belum_Diproses" || s.statusTerima === "Diterima"
    );

    if (supervisors.length > 0) {
      return next(
        new BadRequestError(
          "cannot assign new supervisor as supervisor " + body.position
        )
      );
    }

    return next();
  }
}
