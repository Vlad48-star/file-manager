import os from "node:os";
import fs from "node:fs";
import path from "node:path";

const { EOL, homedir } = os;
let __dirname = homedir();

export const catManage = (firstFile) => {
  let initialPath = firstFile.startsWith("/") ? "/" : __dirname;

  let pathToReadFile = path.join(initialPath, firstFile);
  console.log(pathToReadFile)
  if (fs.existsSync(pathToReadFile)) {
    const readStream = fs.createReadStream(pathToReadFile);
    streamString(readStream).then(console.log);
  } else {
    invalidInput();
  }
};

export const addManage = (firstFile) => {
  let pathToCreateFile = path.join(__dirname, firstFile);
  const writeStream = fs.createWriteStream(pathToCreateFile, {
    flags: "a",
  });
};

export const removeManage = (firstFile) => {
  const pathToFileRemove = path.join(__dirname, firstFile);

  fs.unlink(pathToFileRemove, (err) => {
    if (err) invalidInput();
  });
};

export const renameManage = (firstFile, secondFile) => {
  const pathToFile = path.join(__dirname, firstFile);
  const newFilePath = path.join(__dirname, secondFile);
  fs.readdir(path.join(__dirname), (err, files) => {
    try {
      if (files.includes(firstFile)) {
        fs.rename(pathToFile, newFilePath, (err) => {
          if (err) throw new Error();
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      operationFailed();
    }
  });
};

export const cpManage = (firstFile, secondFile) => {
  const pathToFileCopy = path.join(__dirname, firstFile);
  const newDirectoryPath = path.join(__dirname, secondFile);

  const readStream = fs.createReadStream(pathToFileCopy);
  const writeStream = fs.createWriteStream(
    path.join(newDirectoryPath, firstFile),
    {
      flags: "a",
    }
  );
  try {
    readStream
      .on("error", invalidInput)
      .pipe(writeStream.on("error", invalidInput));
  } catch (error) {
    operationFailed();
  }
};

export const mvManage = (firstFile, secondFile) => {
  const pathToFileMove = path.join(__dirname, firstFile);
  const newDirectoryPathMove = path.join(__dirname, secondFile);

  const readStreamMove = fs.createReadStream(pathToFileMove);
  const writeStreamMove = fs.createWriteStream(
    path.join(newDirectoryPathMove, firstFile),
    {
      flags: "a",
    }
  );

  readStreamMove
    .on("error", invalidInput)
    .pipe(writeStreamMove)
    .on("close", (err) => {
      fs.readdir(newDirectoryPathMove, (err, files) => {
        try {
          if (firstFile) {
            fs.unlink(pathToFileMove, (err) => {
              if (err) invalidInput();
            });
          } else {
            throw new Error("FS operation failed");
          }
        } catch (err) {
          operationFailed();
        }
      });
    })
    .close();
};

function streamString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

function invalidInput() {
  console.error(`${EOL}Invalid input`);
}

function operationFailed() {
  console.log(`${EOL}Operation failed`);
}
