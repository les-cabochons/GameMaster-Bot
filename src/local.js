import { updateCommands } from "./discord/commands.js";
import { registerClient, registerListeners } from "./discord/client.js";

const { TOKEN, APPLICATION_ID } = process.env;

const client = registerClient();

await updateCommands(TOKEN, APPLICATION_ID);

registerListeners(client);

client.login(TOKEN);
