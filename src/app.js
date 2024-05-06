import { updateCommands } from "./server.js";
import { registerClient, registerListeners } from "./discord/client.js";

const { TOKEN, APPLICATION_ID, ENVIRONMENT } = process.env;

const client = registerClient();

if (ENVIRONMENT === "development") {
  await updateCommands(TOKEN, APPLICATION_ID);

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
}

registerListeners(client);

client.login(TOKEN);
