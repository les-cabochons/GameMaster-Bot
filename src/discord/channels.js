export async function fetchChannel(client, channelId) {
    return await client.channels.fetch(channelId);
}