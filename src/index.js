import { InteractionType } from "discord-interactions";

import { registerClient } from "./discord/client.js";
import { deferredMessage, followUpMessage } from "./discord/interactions.js";
import { updateCommands } from "./discord/commands.js";
import { verifyDiscordRequest } from "./discord/verification.js";
import { InteractionError } from "./utils/interactionError.js";
import { getWinner } from "./commands/getWinner.js";

const { TOKEN, APPLICATION_ID } = process.env;

const client = registerClient();

await updateCommands(TOKEN, APPLICATION_ID);

await client.login(TOKEN);

export const handler = async (event) => {
  const { isValid, interaction } = verifyDiscordRequest(event);

  if (!isValid || !interaction) {
    throw JSON.stringify("[UNAUTHORIZED] Bad request signature.");
  }

  await deferredMessage(interaction.id, interaction.token);

  if (interaction.type === InteractionType.PING) {
    await followUpMessage(
      interaction.application_id,
      interaction.token,
      "PONG"
    );
  } else if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    try {
      if (interaction.data.name === "get-winner") {
        const winner = await getWinner(client, interaction.channel_id);

        await followUpMessage(
          interaction.application_id,
          interaction.token,
          `THE WINNER IS: ${winner.user} (score: ${winner.score})`
        );
      }
    } catch (error) {
      console.error(error);

      if (error instanceof InteractionError) {
        await followUpMessage(
          interaction.application_id,
          interaction.token,
          error.message
        );
      }
    }
  } else {
    await followUpMessage(
      interaction.application_id,
      interaction.token,
      "Something went wrong. Please try again."
    );
  }
};
