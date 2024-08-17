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

  const systemMessage = `You are an AI assistant that generates fully functional and visually appealing HTML components using DaisyUI and Tailwind CSS classes.
    The user will provide instructions, and you should respond with appropriate HTML components.
    Use DaisyUI for styling and Tailwind CSS for layout and utility classes.
    Ensure proper sizing, colors, and responsive design in your components.
    Return your response in JSON format with a 'components' array containing a single HTML string.
    The HTML string should be a complete, self-contained component with proper structure and semantics.
    Example response format:
    {
      "components": [
        "<div class='card w-96 bg-primary text-primary-content shadow-xl'><div class='card-body'><h2 class='card-title text-2xl mb-2'>Card title</h2><p class='text-lg'>This is a fully functional and visually appealing card component.</p><div class='card-actions justify-end mt-4'><button class='btn btn-secondary'>Action</button></div></div></div>"
      ]
    }`;

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