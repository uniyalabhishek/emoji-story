import { fetchMetadata } from 'frames.js/next';

export async function generateMetadata() {
  return {
    title: 'Emoji Story',
    other: await fetchMetadata(`http://localhost:3000/frames`),
  };
}

export default function Page() {
  return (
    <div tw="flex flex-col items-center justify-center min-h-screen">
      <h1 tw="text-4xl font-bold mb-8">Welcome to Emoji Story!</h1>
      <p tw="text-xl">Contribute to the collaborative story using emojis in the Frame below.</p>
    </div>
  );
}