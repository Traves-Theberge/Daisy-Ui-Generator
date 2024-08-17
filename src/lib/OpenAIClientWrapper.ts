import OpenAI from 'openai';

export class OpenAIClientWrapper {
  private systemMessage: string = '';
  private history: Array<{ role: string; content: string }> = [];
  private model: string;
  private maxHistoryWords: number;
  private maxWordsPerMessage: number | null;
  private jsonMode: boolean;
  private stream: boolean;
  private openai: OpenAI;

  constructor(
    model?: string,
    maxHistoryWords: number = 10000,
    maxWordsPerMessage?: number,
    jsonMode: boolean = false,
    stream: boolean = true
  ) {
    this.model = this.getDefaultModel(model);
    this.maxHistoryWords = maxHistoryWords;
    this.maxWordsPerMessage = maxWordsPerMessage || null;
    this.jsonMode = jsonMode;
    this.stream = stream;
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  private getDefaultModel(model?: string): string {
    if (model) return model;
    return 'gpt-4o-2024-08-06';
  }

  setSystemMessage(message: string) {
    this.systemMessage = message;
    if (this.jsonMode && !message.toLowerCase().includes('json')) {
      this.systemMessage += " Please return your response in JSON unless user has specified a system message.";
    }
  }

  private addMessage(role: string, content: string) {
    if (role === 'user' && this.maxWordsPerMessage) {
      content += ` please use ${this.maxWordsPerMessage.toString()} words or less`;
    }
    this.history.push({ role, content });
  }

  private trimHistory() {
    let wordCount = this.history.reduce((count, message) => count + message.content.split(' ').length, 0);
    while (wordCount > this.maxHistoryWords && this.history.length > 1) {
      const removedMessage = this.history.shift();
      if (removedMessage) {
        wordCount -= removedMessage.content.split(' ').length;
      }
    }
  }

  clearHistory() {
    this.history = [];
  }

  async chat(userInput: string): Promise<string> {
    this.addMessage('user', userInput);
    const response = await this.getResponse();
    try {
      // Remove any potential markdown formatting
      const cleanedResponse = response.replace(/```json\n|\n```/g, '').trim();
      // Parse the response as JSON
      const parsedResponse = JSON.parse(cleanedResponse);
      // Ensure the response has the correct structure
      if (Array.isArray(parsedResponse.components) && parsedResponse.components.length > 0) {
        return JSON.stringify(parsedResponse);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('Invalid JSON response:', response);
      // If parsing fails, wrap the response in the correct structure
      return JSON.stringify({ components: [response] });
    }
  }

  private async getResponse(): Promise<string> {
    const messages = [
      { role: 'system', content: this.systemMessage },
      ...this.history
    ];

    const response = await this.callOpenAI(messages);

    this.addMessage('assistant', response);
    this.trimHistory();

    return response;
  }

  private async callOpenAI(messages: Array<{ role: string; content: string }>): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: messages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      stream: this.stream,
    });

    if (this.stream) {
      let fullResponse = '';
      for await (const chunk of response as AsyncIterable<OpenAI.Chat.Completions.ChatCompletionChunk>) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullResponse += content;
      }
      return fullResponse;
    } else {
      return (response as OpenAI.Chat.Completions.ChatCompletion).choices[0].message.content || '';
    }
  }
}