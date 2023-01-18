import { Chat } from "../models/chat.model";
import { decodeBase64 } from "../utils/decoder";
import { NotFoundError } from "../utils/error/notFoundError";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";
import { ThesisService } from "./thesis.service";
import { v4 as uuidv4 } from "uuid";

export class ChatService {
  static async createNewTextMessage(
    thesisID: number,
    message: any,
    username: string
  ) {
    const thesis = await ThesisService.getApprovedThesisDetail(thesisID);

    if (typeof thesis === "undefined") {
      throw new NotFoundError("thesis's not found");
    }

    if (
      thesis.pembimbing.length < 2 ||
      (thesis.pembimbing[0].statusTerima === "Ditolak" &&
        thesis.pembimbing[1].statusTerima === "Ditolak")
    ) {
      throw new NotFoundError("thesis has no supervisors");
    }

    if (
      thesis.pembimbing[0].dosen.dsnNip !== username &&
      thesis.pembimbing[1].dosen.dsnNip !== username &&
      thesis.mahasiswa.mhsNim !== username
    ) {
      throw new NotFoundError("you are not eligible to view chats");
    }
    return await Chat.createNewMessage(thesisID, message, 0);
  }

  static async createNewImageMessage(
    thesisID: number,
    message: any,
    type: number,
    extension: string,
    username: string
  ) {
    const thesis = await ThesisService.getApprovedThesisDetail(thesisID);

    if (typeof thesis === "undefined") {
      throw new NotFoundError("thesis's not found");
    }

    if (
      thesis.pembimbing.length < 2 ||
      (thesis.pembimbing[0].statusTerima === "Ditolak" &&
        thesis.pembimbing[1].statusTerima === "Ditolak")
    ) {
      throw new NotFoundError("thesis has no supervisors");
    }

    if (
      thesis.pembimbing[0].dosen.dsnNip !== username &&
      thesis.pembimbing[1].dosen.dsnNip !== username &&
      thesis.mahasiswa.mhsNim !== username
    ) {
      throw new NotFoundError("you are not eligible to view chats");
    }
    const file = decodeBase64(message);

    const path = writeToFile(
      constants.CHAT_FILE_PATH,
      uuidv4() + `.${extension}`,
      file
    );

    return await Chat.createNewMessage(thesisID, path, type);
  }

  static async getAllChatOfThesis(
    thesisID: number,
    type: any | undefined,
    username: string | undefined
  ) {
    const thesis = await ThesisService.getApprovedThesisDetail(thesisID);

    if (typeof thesis === "undefined") {
      throw new NotFoundError("thesis is not found");
    }

    if (
      thesis.pembimbing[0].dosen.dsnNip !== username &&
      thesis.pembimbing[1].dosen.dsnNip !== username &&
      thesis.mahasiswa.mhsNim !== username
    ) {
      throw new NotFoundError("you are not eligible to view chats");
    }
    return await Chat.getAllChatsByThesisID(thesisID, type);
  }
}
