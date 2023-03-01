import { Lecturer } from "../models/lecturer.model";
import {
  ISupervisorApprenticeStatistic,
  ISupervisorPositionStatistic,
} from "../utils/interfaces/statistic.interface";

export class StatisticService {
  static async getExaminerStatisticsByStatus(status?: any) {
    const lecturers = await Lecturer.getExaminersCountByStatus(status);

    const results = lecturers.map((m) => {
      return {
        lecturerName: m.dsnNama,
        apprenticeCount: m.penguji.length,
      } as ISupervisorApprenticeStatistic;
    });

    return results;
  }

  static async getSupervisorStatisticsByStatus(status?: any) {
    const lecturers = await Lecturer.getSupervisorsCountByStatus(status);

    const results = lecturers.map((m) => {
      return {
        lecturerName: m.dsnNama,
        apprenticeCount: m.pembimbing.length,
      } as ISupervisorApprenticeStatistic;
    });

    return results;
  }

  static async getSupervisorStatisticsByPosition() {
    const lecturers = await Lecturer.getSupervisorsCountByPosition();

    const results = lecturers.map((m) => {
      return {
        lecturerName: m.dsnNama,
        mainMentorCount: m.pembimbing.filter((s) => s.ref_posisipmb === "Utama")
          .length,
        sideMentorCount: m.pembimbing.filter(
          (s) => s.ref_posisipmb === "Pendamping"
        ).length,
      } as ISupervisorPositionStatistic;
    });

    return results;
  }
}
