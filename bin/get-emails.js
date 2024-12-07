#!/usr/bin/env node

const { program } = require("commander");
const { sendCode } = require("../src/send-code");

program
  .name("get-emails")
  .description("Get latest emails from Gmail")
  .option("-c, --count <number>", "number of emails to fetch", "3")
  .option("-p, --preview", "show preview of email body instead of full content")
  .option("-s, --socket <path>", "socket path", "/tmp/gmail-debug.sock")
  .action(async (options) => {
    try {
      const code = `
(async ()=>{
        const { readEmails,auth } = globalThis.context
        const emails = await readEmails(auth, { maxCount: ${options.count} });
        return emails;
})()
      `;

      const emails = await sendCode(code, options.socket);

      const truncateText = (text, length = 150) => {
        if (text.length <= length) return text;
        return text.trim().substring(0, length) + "...";
      };

      emails.forEach((email) => {
        console.log("\n-------------------");
        console.log(
          `From: ${email.headers.find((header) => header.name == "From").value}`
        );
        if (options.preview) {
          console.log(`Body: ${truncateText(email.body)}`);
        } else {
          console.log(`Body: ${email.body}`);
        }
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program.parse();
