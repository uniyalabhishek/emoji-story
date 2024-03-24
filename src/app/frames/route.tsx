/* eslint-disable react/jsx-key */
import { createFrames, Button } from 'frames.js/next';
import { PinataFDK } from 'pinata-fdk';

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT!,
  pinata_gateway: process.env.PINATA_GATEWAY!,
});

const frames = createFrames();
const handleRequest = frames(async (ctx) => {
  const story = (ctx.message?.state as { story: string } | undefined)?.story ?? '';
  const newEmoji = (ctx.message?.untrustedData as { inputText: string } | undefined)?.inputText ?? '';
  const isValidInput = newEmoji.trim().length > 0 && newEmoji.includes(' ');
  await fdk.sendAnalytics('emoji-story', {
    untrustedData: {
      fid: ctx.message?.untrustedData?.fid,
      url: ctx.message?.untrustedData?.url,
      messageHash: ctx.message?.untrustedData?.messageHash,
      timestamp: ctx.message?.untrustedData?.timestamp,
      network: ctx.message?.untrustedData?.network,
      buttonIndex: ctx.message?.untrustedData?.buttonIndex,
      inputText: ctx.message?.untrustedData?.inputText,
      castId: ctx.message?.untrustedData?.castId,
    },
    trustedData: {
      messageBytes: ctx.message?.trustedData?.messageBytes,
    },
  });

  return {
    image: (
      <div tw="w-full h-full bg-yellow-200 text-black p-4 overflow-y-auto">
        <h1 tw="text-xl font-bold mb-4">Emoji Story</h1>
        <p tw="mb-4">{story}</p>
        <p tw="text-lg font-bold">Add to the story:</p>
      </div>
    ),
    intents: [
      { type: 'input', label: newEmoji ? `${newEmoji} ` : 'Enter an emoji and a short phrase...' },
      <Button action="post">➕ Add to Story</Button>,
    ],
    state: {
        story: newEmoji ? `${story}${newEmoji} ` : story,
        lastContributor: ctx.message?.untrustedData?.fid ?? '',
    },
  };
});

export const POST = handleRequest;
export const GET = handleRequest;