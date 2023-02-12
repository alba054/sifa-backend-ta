import jwt, {
  GetPublicKeyOrSecret,
  JwtPayload,
  Secret,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";
import dotenv from "dotenv";
import { constants } from "../../utils/utils";
import { TokenPayload } from "../../utils/interfaces/tokenPayload";

dotenv.config();

class TokenGenerator {
  options: any;
  constructor(options: { issuer: string | undefined }) {
    this.options = options;
  }

  sign(
    payload: Buffer | string | object,
    secretKey: Secret,
    options: SignOptions
  ): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      Object.assign(this.options, options);
      jwt.sign(
        payload,
        secretKey,
        this.options,
        (err: any, encoded: string | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(encoded);
          }
        }
      );
    });
  }

  verify(
    token: string,
    secretKey: Secret | GetPublicKeyOrSecret,
    options: VerifyOptions
  ): Promise<TokenPayload | undefined> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, options, (err: any, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
  decode(token: string): TokenPayload | string | JwtPayload | null {
    return jwt.decode(token);
  }
}

export const tokenGenerator = new TokenGenerator(constants.INITIAL_CLAIM);
