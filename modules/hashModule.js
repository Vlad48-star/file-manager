import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import { createHmac } from "node:crypto";

const { EOL, homedir } = os;
let __dirname = homedir();

export const hash = (firstFile) => {
  let initialPath = firstFile.startsWith("/") ? "/" : __dirname;

  let pathToReadFileHash = path.join(initialPath, firstFile);

  if (fs.existsSync(pathToReadFileHash)) {
    const readStreamHash = fs.createReadStream(pathToReadFileHash);
    streamString(readStreamHash).then((result) =>
      console.log(createHmac("sha256", result).digest("hex"))
    );
  } else {
    invalidInput();
  }
};

function invalidInput() {
  console.error(`${EOL}Invalid input`);
}

function streamString(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
