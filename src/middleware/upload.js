import multer from "multer";
import path from "path";
import fs from "fs";

// a function created to check if folder exists
const createDirIfNotExists = (folderName) => {
  // this checks if folder exists
  // fs.existsSync returns true/false
  if (!fs.existsSync(folderName)) {
    //  create folder
    // recursive true enables nested folder creation
    // recursive false doesn't enable nested folder creation.
    fs.mkdirSync(folderName, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/"

    if (req.originalUrl.includes("/create")) {
      uploadPath += "assignments/";
    } else if (req.originalUrl.includes("/submission")) {
      uploadPath += "submissions/";
    }

    createDirIfNotExists(uploadPath);
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
