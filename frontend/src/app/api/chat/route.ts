import { parseIntent } from '@/lib/rostr-os/runtime/pal';
import { routeTask } from '@/lib/rostr-os/harness/router';
import { defaultModel } from '@/lib/rostr-os/gateway';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const byok = req.headers.get('x-byok-key') || undefined;

  const lastUserMessage = messages[messages.length - 1];
  
  if (lastUserMessage && lastUserMessage.role === 'user') {
    // 1. PAL Compilation Phase
    const manifest = await parseIntent(lastUserMessage.content);
    
    // 2. Delegate to ROSTR NPAO Router
    const routed = routeTask(manifest);

    const systemPrompt = `You are the ROSTR OS ${routed.route} Agent.
Your current Priority is: ${routed.priority}.
Instructions: ${routed.instructions}
`;

    // 3. Execute
    const result = await streamText({
      model: defaultModel,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  }
  
  // Fallback for non-user initiated streams
  const result = await streamText({
    model: defaultModel,
    messages,
  });

  return result.toTextStreamResponse();
}
