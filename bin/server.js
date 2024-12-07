#!/usr/bin/env node

const { program } = require("commander");
const { getAuth } = require("../src/auth/gmail-auth");
const { readEmails } = require("../src/email/read-emails.js");

const net = require("net");
const fs = require("fs");
const path = require("path");

program
  .name("gmail-server")
  .description("CLI server to handle commands to read Gmail emails")

  .option("-s, --socket <path>", "socket path", "/tmp/gmail-debug.sock")
  .action(async (options) => {
    try {
      const auth = await getAuth();

      globalThis.context = { auth, readEmails };
      console.log("Authentication successful, starting debug server...");

      // Cleanup existing socket if it exists
      if (fs.existsSync(options.socket)) {
        fs.unlinkSync(options.socket);
      }

      const server = net.createServer((socket) => {
        socket.on("data", async (data) => {
          try {
            const result = await eval(data.toString());
            socket.write(JSON.stringify({ success: true, result }));
          } catch (error) {
            console.error("handled error", error);
            socket.write(
              JSON.stringify({ success: false, error: error.message })
            );
          }
        });
      });

      server.listen(options.socket);
      console.log(`Server listening on ${options.socket}`);

      // Cleanup socket on exit
      process.on("SIGINT", () => {
        server.close();
        fs.unlinkSync(options.socket);
        process.exit(0);
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  });

program.parse();
