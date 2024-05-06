import { verifyKey } from 'discord-interactions';

const { PUBLIC_KEY } = process.env;

export const verifySignature = (event) => {
  const rawBody = event.rawBody;
  const signature = event["params"]["header"].get("x-signature-ed25519");
  const timeStamp = event["params"]["header"].get("x-signature-timestamp");
  const isValidRequest = verifyKey(
    rawBody,
    signature,
    timeStamp,
    PUBLIC_KEY
  );
}
