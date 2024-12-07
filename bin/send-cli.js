#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs").promises;
const { sendCode } = require("../src/send-code");

program
  .name("send")
  .description("Send custom code to gmail read server")
  .version("1.0.0");

program
  .argument("<input>", "Code string or file path")
  .option("-s, --socket <path>", "socket path", "/tmp/gmail-debug.sock")
  .action(async (input, options) => {
    try {
      let code;
      if (input.endsWith(".js")) {
        code = await fs.readFile(input, "utf-8");
      } else {
        code = input;
      }

      const result = await sendCode(code, options.socket);
      console.log(result);
    } catch (error) {
      console.error("Error Sending:", error.message);
    }
  });

program.parse();
