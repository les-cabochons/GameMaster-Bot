import { InteractionError } from '../utils/interactionError.js';
import { fetchChannel } from '../discord/channels.js';
import { getAllMessagesForGivenDay } from '../discord/messages.js';
import { getScores, getWinner } from '../guessTheGame/score.js';


export async function GetWinner(client, channelId) {
  const channel = await fetchChannel(client, channelId);
  if (!channel.isTextBased() || channel.isDMBased()) {
    throw new InteractionError(
      "This command can only be used in text channels on a server."
    );
  }

  const messages = await getAllMessagesForGivenDay(channel);
  if (!messages) {
    throw new InteractionError("No messages found.");
  }

  const scores = getScores(messages);
  if (!scores) {
    throw new InteractionError("No scores found.");
  }

  const winner = getWinner(scores);
  if (!winner) {
    throw new InteractionError("No winners found.");
  }

  return winner;
}
