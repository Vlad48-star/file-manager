import os from "node:os";

export const cpuCommand = () => {
  console.log(os.cpus().map(cpu => ({
    model: cpu.model,
    speed: `${cpu.speed / 1000}GHz`,
  })));
}
export const eolCommand = () => {
  console.log(JSON.stringify(os.EOL));
}

export const homedirCommand = () => {
  console.log(os.homedir());
}

export const usernameCommand = () => {
  console.log(os.userInfo().username);
}

export const archCommand = () => {
  console.log(os.arch());
}

