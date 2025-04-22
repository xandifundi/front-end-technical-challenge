import { sampleQuiz } from "@/data/sampleQuiz";

export async function GET() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Response(JSON.stringify(sampleQuiz), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
