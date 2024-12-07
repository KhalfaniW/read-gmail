const { google } = require("googleapis");

async function readEmails(auth,{maxResults=10}) {
  const gmail = google.gmail({ version: "v1", auth });

  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults,
    });

    const emails = await Promise.all(
      response.data.messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
        });

        const headers = email.data.payload.headers;
        return {
          id: email.data.id,
          subject:
            headers.find((h) => h.name === "Subject")?.value || "No Subject",
          from:
            headers.find((h) => h.name === "From")?.value || "Unknown Sender",
          date: headers.find((h) => h.name === "Date")?.value,
        };
      })
    );

    return emails;
  } catch (error) {
    console.error("Error reading emails:", error);
    throw error;
  }
}

module.exports = { readEmails };
