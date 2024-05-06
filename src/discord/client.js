import { Client, Events, GatewayIntentBits } from "discord.js";
import { InteractionResponseType, InteractionType } from "discord-interactions";

import { InteractionError } from "../utils/interactionError.js";
import { getWinner } from "../commands/getWinner.js";

export const registerClient = () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
  });

  return client;
};

export const registerListeners = (client) => {
  client.on("interactionCreate", async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.type === InteractionType.PING) {
      return {
        type: InteractionResponseType.PONG,
      };
    } else if (interaction.type === InteractionType.APPLICATION_COMMAND) {
      try {
        if (interaction.commandName === "get-winner") {
          const winner = await getWinner(client, interaction.channelId);

          await interaction.reply(
            `THE WINNER IS: ${winner.user} (score: ${winner.score})`
          );
        }
      } catch (error) {
        console.error(error);

        if (error instanceof InteractionError) {
          await interaction.reply(error.message);
        }
      }
    } else {
      throw JSON.stringify(
        `[NOT FOUND] Interaction type (${interaction.type}) not found.`
      );
    }
  });
};
