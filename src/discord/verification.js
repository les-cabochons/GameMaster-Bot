import { verifyKey } from "discord-interactions";

const { PUBLIC_KEY } = process.env;

export function verifyDiscordRequest(event) {
  const signature = event.params.header["x-signature-ed25519"];
  const timestamp = event.params.header["x-signature-timestamp"];
  const body = event.rawBody;
  const isValidRequest =
    signature &&
    timestamp &&
    verifyKey(body, signature, timestamp, PUBLIC_KEY);
  if (!isValidRequest) {
    return { isValid: false };
  }

  return { interaction: JSON.parse(body), isValid: true };
}
