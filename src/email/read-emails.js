const { google } = require("googleapis");

async function readEmails(auth, { maxCount = 10 } = {}) {
  const gmail = google.gmail({ version: "v1", auth });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: maxCount,
    });

    const emails = await Promise.all(
      response.data.messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });

        const headers = email.data.payload.headers;
        const parts = email.data.payload.parts;
        let body = "";

        if (parts && parts.length) {
          body = parts.map((part) => part.body.data).join("");
        } else {
          body = email.data.payload.body.data;
        }

        return {
          headers,
          body: Buffer.from(body, "base64").toString("utf-8"),
        };
      }),
    );

    return emails;
  } catch (error) {
    console.error("Error reading emails:", error);
  }
}

module.exports = { readEmails };
