import { InteractionResponseType, InteractionType } from "discord-interactions";
import { ChatInputCommandInteraction } from "discord.js";

import { registerClient } from "./discord/client.js";
import { InteractionError } from "./utils/interactionError.js";

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
    const chatInteraction = new ChatInputCommandInteraction(
      client,
      interaction.data
    );
    console.log(chatInteraction);
    try {
      if (chatInteraction.commandName === "get-winner") {
        const winner = await getWinner(client, interaction.channelId);

        await chatInteraction.reply(
          `THE WINNER IS: ${winner.user} (score: ${winner.score})`
        );
      }
    } catch (error) {
      console.error(error);

      if (error instanceof InteractionError) {
        await chatInteraction.reply(error.message);
      }
    }
    await client.login(TOKEN);

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    };
  }

  throw JSON.stringify(
    `[NOT FOUND] Interaction type (${interaction.type}) not found.`
  );
};
