export async function getAllMessagesForGivenDay(channel, date = new Date(Date.now())) {
  if (!channel.isTextBased) return;

  const messagesOfTheDay = [];
  let unknownMessages = [];
  const fetchOptions = { limit: 10 };

  do {
    unknownMessages = await channel.messages.fetch(fetchOptions);
    messagesOfTheDay.push(
      ...unknownMessages.filter(
        (message) =>
          message.createdAt.getDay() === date.getDay() &&
          message.content !== ''
      ).values()
    );
    fetchOptions.before = unknownMessages.at(-1).id;
  } while (
    unknownMessages.at(-1).createdAt >= date
  );

  return messagesOfTheDay;
}
