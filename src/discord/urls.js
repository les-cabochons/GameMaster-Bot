const API_URL = "https://discord.com/api/v10/";

export const interactionUrl = (interactionId, token) => `${API_URL}/interactions/${interactionId}/${token}/callback`;
export const followUpUrl = (applicationId, token) => `${API_URL}/webhooks/${applicationId}/${token}/messages/@original`;