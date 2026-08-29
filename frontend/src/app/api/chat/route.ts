import { compilePalManifest } from '@/lib/rostr-os/runtime/pal';
import { RostrRouter } from '@/lib/rostr-os/harness/router';
import { getProviderModel } from '@/lib/rostr-os/gateway';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastUserMessage = messages[messages.length - 1];
  
  if (lastUserMessage && lastUserMessage.role === 'user') {
    // 1. PAL Compilation Phase
    const manifest = await compilePalManifest(lastUserMessage.content);
    
    // 2. Delegate to ROSTR NPAO Router
    const result = await RostrRouter(messages, manifest);

    return result.toTextStreamResponse();
  }
  
  // Fallback for non-user initiated streams
  const result = await streamText({
    model: getProviderModel(),
    messages,
  });

  return result.toTextStreamResponse();
}
