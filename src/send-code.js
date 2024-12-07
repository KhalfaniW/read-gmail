const net = require("net");

function sendCode(code, socketPath = "/tmp/gmail-debug.sock") {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect({ path: socketPath }, () => {
      client.write(code);
    });

    client.on("data", (data) => {
      const response = JSON.parse(data.toString());
      client.destroy();
      if (response.success) {
        resolve(response.result);
      } else {
        reject(new Error(response.error));
      }
    });

    client.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = { sendCode };
