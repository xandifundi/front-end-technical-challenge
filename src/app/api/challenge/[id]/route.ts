import { challenge } from "@/data/challenge";

export async function GET() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Response(JSON.stringify(challenge), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
