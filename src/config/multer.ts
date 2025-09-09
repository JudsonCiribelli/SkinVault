import crypto from "crypto";
import multer from "multer";
import { resolve, extname } from "path";

export default {
  upload(folder: string /* pasta em que deseja salvar*/) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename(req, file, callback) {
          const fileHash = crypto.randomBytes(15).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          return callback(
            /* Primeiro error (nao vamos tratar)*/ null,
            fileName
          );
        },
      }),
    };
  },
};
