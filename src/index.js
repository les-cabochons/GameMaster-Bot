import { registerClient } from "./discord/client.js";
import fetch from "node-fetch";

import { updateCommands } from "./server.js";

import { InteractionResponseType, InteractionType } from "discord-interactions";
import { InteractionError } from "./utils/interactionError.js";
import { getWinner } from "./commands/getWinner.js";

import { verifyDiscordRequest } from "./discord/verification.js";

const { TOKEN, APPLICATION_ID } = process.env;

const client = registerClient();

await updateCommands(TOKEN, APPLICATION_ID);

await client.login(TOKEN);

export const handler = async (event) => {
  const { isValid, interaction } = verifyDiscordRequest(event);

  if (!isValid || !interaction) {
    throw JSON.stringify("[UNAUTHORIZED] Bad request signature.");
  }

  if (interaction.type === InteractionType.PING) {
    console.log("this is a ping");
    return {
      type: InteractionResponseType.PONG,
    };
  } else if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    console.log("this is a command");
    console.log(interaction);
    try {
      if (interaction.data.name === "get-winner") {
        console.log("this is the command get-winnger");
        const winner = await getWinner(client, interaction.channel_id);
        console.log(`winner found${winner}`);
        // await interaction.reply(
        //   `THE WINNER IS: ${winner.user} (score: ${winner.score})`
        // );
        return JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `THE WINNER IS: ${winner.user} (score: ${winner.score})`,
          },
        });
      }
    } catch (error) {
      console.error(error);

      if (error instanceof InteractionError) {
        const body = {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Test",
          },
        };

        const url =
          `https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`;

        await fetch(url, {
          method: "post",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });
      }
    }
  } else {
    throw JSON.stringify(
      `[NOT FOUND] Interaction type (${interaction.type}) not found.`
    );
  }
};
