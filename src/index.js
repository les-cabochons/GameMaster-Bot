import {
  InteractionResponseType,
  InteractionType,
} from "discord-interactions";

import { verifyDiscordRequest } from "./discord/verification.js";

export const handler = async (event) => {
  const { isValid, interaction } = verifyDiscordRequest(event);

  if (!isValid || !interaction) {
    throw JSON.stringify("[UNAUTHORIZED] Bad request signature.");
  }

  if (interaction.type === InteractionType.PING) {
    return  {
        type: InteractionResponseType.PONG
    }
  }
  
    throw JSON.stringify("[NOT FOUND] Did not work!");
};
