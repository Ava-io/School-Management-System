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
