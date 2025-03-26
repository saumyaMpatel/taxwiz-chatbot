import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content
      })),
      system: "You are a helpful tax assistant. Provide clear, concise information about tax-related questions.",
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('API Route Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}