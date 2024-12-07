const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");
const path = require("path");

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

async function getAuth() {
  const auth = await authenticate({
    keyfilePath: path.join(process.cwd(), "credentials.json"),
    scopes: SCOPES,
  });
  return auth;
}

module.exports = { getAuth };
