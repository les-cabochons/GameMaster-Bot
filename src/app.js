import { Client, GatewayIntentBits } from "discord.js";
import { startServer } from "./server.js";
import { GetWinner } from "./commands/getWinner.js";
import { InteractionError } from "./utils/interactionError.js";

const { TOKEN, ENVIRONMENT } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

if (ENVIRONMENT === "development") {
  await startServer();

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    if (interaction.commandName === "get-winner") {
      const winner = await GetWinner(client, interaction.channelId);

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

client.login(TOKEN);
