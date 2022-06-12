import os from "node:os";
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";

const { EOL, homedir } = os;
let __dirname = homedir();

export const compress = (firstFile, secondFile) => {
  const pathToFileCompress = path.join(__dirname, firstFile);
  const newDirectoryPathCompress = path.join(__dirname, secondFile);

  const brotli = zlib.createBrotliCompress();
  const readStreamCompress = fs.createReadStream(pathToFileCompress);
  const writeStreamCompress = fs.createWriteStream(
    path.join(newDirectoryPathCompress),
    {
      flags: "a",
    }
  );

  readStreamCompress
    .on("error", invalidInput)
    .pipe(brotli.on("error", operationFailed))
    .pipe(writeStreamCompress.on("error", invalidInput));
};

export const deCompress = (firstFile, secondFile) => {
  const pathToFileDecompress = path.join(__dirname, firstFile);
  const newDirectoryPathDecompress = path.join(__dirname, secondFile);

  const decompress = zlib.createBrotliDecompress();
  const readStreamDecompress = fs.createReadStream(pathToFileDecompress);
  const writeStreamDecompress = fs.createWriteStream(
    path.join(newDirectoryPathDecompress),
    {
      flags: "a",
    }
  );

  readStreamDecompress
    .on("error", invalidInput)
    .pipe(decompress.on("error", operationFailed))
    .pipe(writeStreamDecompress.on("error", invalidInput));
};

function invalidInput() {
  console.error(`${EOL}Invalid input`);
}

function operationFailed() {
  console.log(`${EOL}Operation failed`);
}
