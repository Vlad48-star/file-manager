import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import os from "node:os";
import {
  cpuCommand,
  homedirCommand,
  usernameCommand,
  archCommand,
  eolCommand,
} from "./modules/osModule.js";
import { cdFile, lsFile, upFile } from "./modules/fileModule.js";
import {
  catManage,
  addManage,
  renameManage,
  cpManage,
  mvManage,
  removeManage,
} from "./modules/manageModule.js";
import { compress, deCompress } from "./modules/zipModule.js";
import { hash } from "./modules/hashModule.js";

const { EOL, homedir } = os;

const args = process.argv;
let userName = "";
args.forEach((arg) => {
  if (arg.includes("--username")) {
    userName = arg.split("=")[1];
    console.log(userName);
  }
});

const rl = readline.createInterface({
  input,
  output,
});

let __dirname = homedir();

console.log(`${EOL}Welcome to the File Manager, ${userName}!`);

writeCurrentDirectory();

rl.on("line", (answer) => {
  if (answer.toLowerCase().trim() === ".exit") {
    exitFunc();
  }
  const answerArr = answer.split(" ");
  switch (answerArr[0]) {
    case "up":
      if (answerArr.length !== 1) {
        invalidInput();
        break;
      }
      __dirname = upFile();
      break;
    case "cd":
      __dirname = cdFile(answerArr[1]);
      break;
    case "ls":
      if (answerArr.length !== 1) {
        invalidInput();
        break;
      }
      lsFile();
      writeCurrentDirectory();
      break;
    case "os":
      if (answerArr.length > 3) {
        invalidInput();
        break;
      }
      switch (answerArr[1]) {
        case "--EOL":
          eolCommand();
          break;
        case "--cpus":
          cpuCommand();
          break;
        case "--homedir":
          homedirCommand();
          break;
        case "--username":
          usernameCommand();
          break;
        case "--architecture":
          archCommand();
          break;
        default:
          invalidInput();
      }
      break;
    case "cat":
      if (answerArr.length > 3) {
        console.log(answerArr);
        invalidInput();
        break;
      }
      catManage(answerArr[1]);
      break;
    case "add":
      if (answerArr.length > 3) {
        invalidInput();
        break;
      }
      addManage(answerArr[1]);
      break;
    case "rn":
      if (answerArr.length > 4) {
        invalidInput();
        break;
      }
      renameManage(answerArr[1], answerArr[2]);
      break;
    case "cp":
      if (answerArr.length > 4) {
        invalidInput();
        break;
      }
      cpManage(answerArr[1], answerArr[2]);
      break;
    case "mv":
      if (answerArr.length > 4) {
        invalidInput();
        break;
      }
      mvManage(answerArr[1], answerArr[2]);
      break;
    case "rm":
      if (answerArr.length > 3) {
        invalidInput();
        break;
      }
      removeManage(answerArr[1]);
      break;
    case "hash":
      if (answerArr.length > 3) {
        invalidInput();
        break;
      }
      hash(answerArr[1]);
      break;
    case "compress":
      if (answerArr.length > 4) {
        invalidInput();
        break;
      }
      compress(answerArr[1], answerArr[2]);
      break;
    case "decompress":
      if (answerArr.length > 4) {
        invalidInput();
        break;
      }
      deCompress(answerArr[1], answerArr[2]);
      break;
    default:
      invalidInput();
  }
  setTimeout(writeCurrentDirectory, 10);
});

process.on("SIGINT", () => {
  exitFunc();
});

const exitFunc = () => {
  console.log(`${EOL}Thank you for using File Manager, ${userName}!`);
  process.exit();
};

function writeCurrentDirectory(dir = __dirname) {
  console.log(`${EOL}You are currently in, ${dir}`);
  rl.prompt();
}

function invalidInput() {
  console.error(`${EOL}Invalid input`);
}
