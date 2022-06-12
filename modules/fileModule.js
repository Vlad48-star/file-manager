import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { EOL, homedir } = os;

let __dirname = homedir();

export const cdFile = (secondPath) => {
  let initialPath = secondPath.startsWith("/") ? "/" : __dirname;
  let newPath = path.join(initialPath, secondPath);
  if (fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory()) {
    __dirname = newPath;
  } else {
    operationFailed();
  }
  return __dirname;
};

export const lsFile = () => {
  fs.readdir(__dirname, (err, files) => {
    if (err) console.log(err);
    else {
      console.log(`${EOL}Current directory:`);
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
};

export const upFile = () => {
  __dirname = path.dirname(__dirname);
  return __dirname
};

function operationFailed() {
  console.log(`${EOL}Operation failed`);
}
