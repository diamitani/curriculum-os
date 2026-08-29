import { createOpenAI } from '@ai-sdk/openai';

export function getProviderModel(modelName: string = 'gpt-4o') {
  const gatewayUrl = process.env.VERCEL_AI_GATEWAY_URL;
  
  // If a Vercel AI Gateway URL is provided, we route through it.
  // Otherwise, we fallback to the standard OpenAI API using OPENAI_API_KEY.
  const openai = createOpenAI({
    baseURL: gatewayUrl || 'https://api.openai.com/v1',
    apiKey: process.env.OPENAI_API_KEY,
  });

  return openai(modelName);
}
