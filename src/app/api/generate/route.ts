import { NextResponse } from 'next/server';
import { OpenAIClientWrapper } from '@/lib/OpenAIClientWrapper';
import { z } from 'zod';

// Define a schema for the response
const HTMLComponentSchema = z.object({
  html: z.string()
});

const AIResponseSchema = z.object({
  components: z.array(z.string())
});

const openAIClient = new OpenAIClientWrapper("gpt-4o-2024-08-06", 10000, 100, true);

export async function POST(request: Request) {
  const { user_input } = await request.json();

  const systemMessage = `You are an AI assistant that generates HTML components using DaisyUI classes.
    The user will provide instructions, and you should respond with appropriate HTML components.
    Only use DaisyUI classes for styling.
    Return your response in json format with a 'components' array containing HTML strings.`;

  openAIClient.setSystemMessage(systemMessage);

  try {
    const result = await openAIClient.chat(user_input);
    console.log('Raw AI response:', result);

    let parsedResult;
    try {
      parsedResult = JSON.parse(result);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      parsedResult = { components: [result] };
    }

    console.log('Parsed result:', parsedResult);

    if (!parsedResult.components || !Array.isArray(parsedResult.components)) {
      throw new Error('Invalid response format: missing or invalid components array');
    }

    const validatedResult = AIResponseSchema.parse(parsedResult);
    return NextResponse.json(validatedResult);
  } catch (error) {
    console.error('Error generating components:', error);
    return NextResponse.json({ error: 'Failed to generate components. Please try again.' }, { status: 500 });
  }
}