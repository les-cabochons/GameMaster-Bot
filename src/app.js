import { startServer } from "./server.js";
import { registerClient, registerListeners } from "./discord/client.js";

const { TOKEN, ENVIRONMENT } = process.env;

const client = registerClient();

if (ENVIRONMENT === "development") {
  await startServer();

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
}

registerListeners(client);

client.login(TOKEN);
