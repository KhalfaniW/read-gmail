#!/usr/bin/env node

const { program } = require("commander");
const { getAuth } = require("../src/auth/gmail-auth");
const { readEmails } = require("../src/email/email-reader");

program
  .name("read-email")
  .description("CLI to read Gmail emails")
  .version("1.0.0");

program
  .command("list")
  .description("List latest emails")
  .action(async () => {
    try {
      const auth = await getAuth();

      const emails = await readEmails(auth);

      emails.slice(0, 3).forEach((email) => {
        console.log(email);
        console.log("\n-------------------");
        console.log(`From: ${email.from}`);
        console.log(`Subject: ${email.subject}`);
        console.log(`Date: ${email.date}`);
      });
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });

program
  .command("auth")
  .description("Authenticate with Gmail")
  .action(async () => {
    try {
      console.log(await getAuth());
      console.log("Authentication successful!");
    } catch (error) {
      console.error("Authentication failed:", error.message);
      process.exit(1);
    }
  });

program.parse();
