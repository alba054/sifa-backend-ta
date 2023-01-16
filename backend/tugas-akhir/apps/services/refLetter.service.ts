import { RefLetter } from "../models/refLetter.model";
import { IRefLetterPost } from "../utils/interfaces/refLetter.interface";

export class RefLetterService {
  static async createNewReferenceLetter(body: IRefLetterPost) {
    return await RefLetter.createNewReferenceLetter(body);
  }

  static async getRefLetter() {
    return await RefLetter.getAllRefLetter();
  }
}
