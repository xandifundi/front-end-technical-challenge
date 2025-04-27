import { sampleQuiz } from "@/data/sampleQuiz";

// Handle fetching a mock quiz.
export async function GET() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Response(JSON.stringify(sampleQuiz), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// Handle submitting a completed quiz.
export async function POST() {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = { ok: true };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
