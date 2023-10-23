import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "./aws.config";
import config from "./environment.config";

export const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.getS3BucketName(),
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      let folder;

      if (file.fieldname === "annotation") {
        folder = "annotation";
      } else if (file.fieldname === "srt") {
        folder = "srt";
      } else if (file.fieldname === "rawScript") {
        folder = "rawScript";
      }

      const newFileName = Date.now() + "_annotation_user_" + file.originalname;
      const fullPath = `${folder}/` + newFileName;
      cb(null, fullPath);
    },
  }),
});
