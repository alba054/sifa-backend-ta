import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { NotFoundError } from "../utils/error/notFoundError";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { constants } from "../utils/utils";
import { WebNotifService } from "./webNotif.service";

export class HeadDepartmentService {
  static async updateLab(
    thesisID: number,
    isAccepted: boolean,
    lab1?: number,
    lab2?: number
  ) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (thesis === null) {
      throw new NotFoundError("thesis's not found");
    }
    const inserted = await Thesis.updateLab(thesisID, isAccepted, lab1, lab2);

    let userLab1;
    let userLab2;

    if (typeof lab1 === "undefined") {
      if (thesis.taLabId) {
        userLab1 = await User.getUserByBadge(constants.LAB_ADMIN_GROUP_ACCESS, {
          lab: thesis.taLabId,
        });
      }
    } else {
      userLab1 = await User.getUserByBadge(constants.LAB_ADMIN_GROUP_ACCESS, {
        lab: lab1,
      });
    }

    if (typeof lab2 === "undefined") {
      if (thesis.taLabId2) {
        userLab2 = await User.getUserByBadge(constants.LAB_ADMIN_GROUP_ACCESS, {
          lab: thesis.taLabId2,
        });
      }
    } else {
      userLab2 = await User.getUserByBadge(constants.LAB_ADMIN_GROUP_ACCESS, {
        lab: lab2,
      });
    }

    if (userLab1) {
      const data = {
        userID: userLab1.id,
        role: constants.LAB_ADMIN_GROUP_ACCESS,
        title: "Tugas Akhir Pada Lab",
        description: `mahasiswa dengan judul tugas akhir ${thesis.taJudul}`,
        link: "/kepala-lab/tugas-akhir",
      } as IWebNotif;
      await WebNotifService.createNotification(data);
    }

    if (userLab2) {
      const data = {
        userID: userLab2.id,
        role: constants.LAB_ADMIN_GROUP_ACCESS,
        title: "Tugas Akhir Pada Lab",
        description: `mahasiswa dengan judul tugas akhir ${thesis.taJudul}`,
        link: "/kepala-lab/tugas-akhir",
      } as IWebNotif;
      await WebNotifService.createNotification(data);
    }

    return inserted;
  }

  static async getProposedThesis(username: string) {
    let proposedThesis = await Thesis.getAllThesis("Diterima");
    // console.log(proposedThesis);

    proposedThesis = proposedThesis.filter(
      (t) => t.kepalaDepartemen?.dsnNip === username
    );

    return proposedThesis;
  }
}
