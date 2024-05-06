import { InteractionResponseType } from "discord-interactions";

import { interactionUrl } from "./urls.js";
import { post } from "../utils/https.js";

export const deferredMessage = async (interactionId, token) => {
  const body = {
    type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
  };

  const url = interactionUrl(interactionId, token);

  await post(url, body);
};

export const followUpMessage = async (applicationId, token, message) => {
  const body = {
    content: message,
  };

  const url = followUpUrl(applicationId, token);

  await patch(url, body);
};
