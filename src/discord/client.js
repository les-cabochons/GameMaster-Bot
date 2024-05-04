import { Client, GatewayIntentBits } from "discord.js";
import { InteractionError } from "../utils/interactionError.js";


export const registerClient = () => {
  return new Client({ intents: [GatewayIntentBits.Guilds] });
};

export const registerListeners = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

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
  });
};
