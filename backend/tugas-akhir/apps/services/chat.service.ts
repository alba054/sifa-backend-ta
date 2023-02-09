import { Chat } from "../models/chat.model";
import { decodeBase64 } from "../utils/decoder";
import { NotFoundError } from "../utils/error/notFoundError";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";
import { ThesisService } from "./thesis.service";
import { v4 as uuidv4 } from "uuid";

export class ChatService {
  static async createNewTextMessage(
    nim: string,
    message: any,
    username: string
  ) {
    const thesis = await ThesisService.getApprovedThesisByNIM(nim);

    if (typeof thesis[0] === "undefined") {
      throw new NotFoundError("thesis's not found");
    }

    if (
      thesis[0].pembimbing.length < 2 ||
      (thesis[0].pembimbing[0].statusTerima === "Ditolak" &&
        thesis[0].pembimbing[1].statusTerima === "Ditolak")
    ) {
      throw new NotFoundError("thesis has no supervisors");
    }

    if (
      thesis[0].pembimbing[0].dosen.dsnNip !== username &&
      thesis[0].pembimbing[1].dosen.dsnNip !== username &&
      thesis[0].mahasiswa.mhsNim !== username
    ) {
      throw new NotFoundError("you are not eligible to view chats");
    }
    return await Chat.createNewMessage(thesis[0].taId, message, 0, username);
  }

  static async createNewImageMessage(
    nim: string,
    message: any,
    type: number,
    extension: string,
    username: string
  ) {
    const thesis = await ThesisService.getApprovedThesisByNIM(nim);

    if (typeof thesis[0] === "undefined") {
      throw new NotFoundError("thesis's not found");
    }

    if (
      thesis[0].pembimbing.length < 2 ||
      (thesis[0].pembimbing[0].statusTerima === "Ditolak" &&
        thesis[0].pembimbing[1].statusTerima === "Ditolak")
    ) {
      throw new NotFoundError("thesis has no supervisors");
    }

    if (
      thesis[0].pembimbing[0].dosen.dsnNip !== username &&
      thesis[0].pembimbing[1].dosen.dsnNip !== username &&
      thesis[0].mahasiswa.mhsNim !== username
    ) {
      throw new NotFoundError("you are not eligible to view chats");
    }
    const file = decodeBase64(message);

    const path = writeToFile(
      constants.CHAT_FILE_PATH,
      uuidv4() + `.${extension}`,
      file
    );

    return await Chat.createNewMessage(thesis[0].taId, path, type, username);
  }

  static async getAllChatOfThesis(
    nim: any,
    type: any | undefined,
    username: string | undefined
  ) {
    const thesis = await ThesisService.getApprovedThesisByNIM(nim);

    if (typeof thesis[0] === "undefined") {
      throw new NotFoundError("thesis is not found");
    }

    if (
      thesis[0].pembimbing[0].dosen.dsnNip !== username &&
      thesis[0].pembimbing[1].dosen.dsnNip !== username &&
      thesis[0].mahasiswa.mhsNim !== username
    ) {
      throw new NotFoundError("you are not eligible to view chats");
    }
    return await Chat.getAllChatsByThesisID(thesis[0].taId, type);
  }
}
