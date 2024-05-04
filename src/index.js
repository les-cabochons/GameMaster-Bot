import { InteractionResponseType, InteractionType } from "discord-interactions";

import { registerClient, registerListeners } from "./discord/client.js";

import { verifyDiscordRequest } from "./discord/verification.js";

const { TOKEN } = process.env;

export const handler = async (event) => {
  const { isValid, interaction } = verifyDiscordRequest(event);

  if (!isValid || !interaction) {
    throw JSON.stringify("[UNAUTHORIZED] Bad request signature.");
  }

  if (interaction.type === InteractionType.PING) {
    return {
      type: InteractionResponseType.PONG,
    };
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const client = registerClient();
    registerListeners(client);
    client.login(TOKEN);
  }

  throw JSON.stringify("[NOT FOUND] Interaction type not found.");
};
