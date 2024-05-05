import { registerClient, registerListeners } from "./discord/client.js";

import { verifyDiscordRequest } from "./discord/verification.js";

const { TOKEN } = process.env;

const client = registerClient();

registerListeners(client);

client.login(TOKEN);

export const handler = async (event) => {
  const { isValid, interaction } = verifyDiscordRequest(event);

  if (!isValid || !interaction) {
    throw JSON.stringify("[UNAUTHORIZED] Bad request signature.");
  }
};
