import { Request } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../4-models/errors-model";
import Role from "../4-models/role-model";
import UserModel from "../4-models/user-model";
import crypto from "crypto";

// Create a password that is embedded within the token to prevent content hackers from hacking into the system.
const secret = process.env.JWT_SECRET_KEY;

const salt = process.env.HASH_SALT;
const hashAlgorithm = process.env.HASH_ALGORITHM;

// Encrypt the password using hash technique
function hash(plainText: string): string | null {
  if (!plainText) return null;

  // Remove all spaces using replace with a regular expression
  let textWithoutSpaces: string = plainText.replace(/\s/g, "");

  // HMAC: Hash based Message Authentication Code
  const hashText = crypto
    .createHmac(hashAlgorithm, salt)
    .update(textWithoutSpaces)
    .digest("hex"); // sha512 = Which algorithm to use, salt = A string to insert inside the  | plainText = createHash | hex = turn into a string

  return hashText;
}

function getNewToken(user: UserModel): string {
  // Object to stash inside the token:
  const payload = { user };

  // Generate new token:
  const token = jwt.sign(payload, secret, { expiresIn: "3h" });

  // Return token
  return token;
}

function verifyToken(request: Request): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    // Extract token header (autorization: Bearer token):
    const header = request.headers.authorization;

    // If no such header sent:
    if (!header) {
      reject(new UnauthorizedError("No token sent"));
    }

    //Extract the token:
    // Bearer the-token
    //        ^
    // 01234567
    const token = header.substring(7);

    // If no token sent:
    if (!token) {
      reject(new UnauthorizedError("No token sent"));
      return;
    }

    // Here we have some token
    jwt.verify(token, secret, (err, payload) => {
      // If token invalid or expired:
      if (err) {
        reject(new UnauthorizedError("Invalid or expired"));
        return;
      }

      resolve(true);
    });
  });
}

function getTokenRole(request: Request): Role {
  // Extract token header (autorization: Bearer token):
  const header = request.headers.authorization;

  //Extract the token:
  const token = header.substring(7);

  // Extract payload:
  const payload = jwt.decode(token);

  // Extract user:
  const user = (payload as any).user;

  //return role:
  return user.role;
}
export default {
  getNewToken,
  hash,
  verifyToken,
  getTokenRole,
};
