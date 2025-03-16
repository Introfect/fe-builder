import OpenAI from "openai";

export async function GET() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const messages = await openai.beta.threads.messages.list(
      process.env.ASSISTANT_THREAD_ID!
    );

    return new Response(JSON.stringify({ ok: true, data: messages.data }));
  } catch (error) {
    return new Response(JSON.stringify({ ok: false, error: error }));
  }
}
