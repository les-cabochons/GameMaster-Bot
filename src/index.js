import { registerClient, registerListeners } from "./discord/client.js";

import { verifyDiscordRequest } from "./discord/verification.js";

const { TOKEN, APPLICATION_ID } = process.env;

const client = registerClient();

registerListeners(client);

await updateCommands(TOKEN, APPLICATION_ID);

await client.login(TOKEN);

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
  else if (interaction.type === InteractionType.APPLICATION_COMMAND) {
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


};
