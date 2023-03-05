import { SeminarReferences } from "../models/seminarRef.model";

export class SeminarReferencesService {
  static async getRefsBySeminarType(seminarType: any) {
    return await SeminarReferences.getSeminarReferencesBySeminarType(
      seminarType
    );
  }
}
