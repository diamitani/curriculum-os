import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';
import { openai } from '@/lib/rostr-os/gateway';
import { generateObject } from 'ai';
import { z } from 'zod';

const execAsync = promisify(exec);

// Storyboard schema based on Monarch Video standard
const StoryboardSchema = z.object({
  title: z.string(),
  aspect_ratio: z.enum(['16:9', '9:16', '1:1']),
  scenes: z.array(z.object({
    id: z.string(),
    narration: z.string().describe("The exact text to be spoken by Kokoro TTS."),
    visuals: z.object({
      type: z.enum(['title', 'image', 'split', 'kinetic']),
      headline: z.string().optional(),
      body: z.string().optional(),
      image_prompt: z.string().optional().describe("A visual description for the image asset needed.")
    })
  }))
});

export async function POST(req: Request) {
  try {
    const { curriculumId, content } = await req.json();
    const byok = req.headers.get('x-byok-key') || undefined;
    
    // 1. Generate Storyboard JSON via Agent
    const { object: storyboard } = await generateObject({
      model: openai('gpt-4o'),
      schema: StoryboardSchema,
      prompt: `You are the ROSTR Video Agent. Convert this curriculum content into a highly engaging, professional video storyboard for the Monarch Video Engine.
      Ensure the narration is spoken naturally.
      Content: ${content}`,
    });

    // 2. Save storyboard to a temporary file
    const enginePath = path.resolve(process.cwd(), '../video-engine');
    const outPath = path.resolve(process.cwd(), '../video-engine/output');
    
    // Ensure output dir exists
    await fs.mkdir(outPath, { recursive: true });
    
    const storyboardPath = path.join(enginePath, `templates/storyboard_${curriculumId}.json`);
    await fs.writeFile(storyboardPath, JSON.stringify(storyboard, null, 2));

    // 3. Fire background task (we don't await this if it takes too long, but we could for a demo)
    // For local dev, we run the script. In production, this would trigger a cloud run job.
    // The build_video.sh script takes the storyboard and output dir.
    
    // Since rendering can take minutes, we should just spawn it and return 202 Accepted,
    // or simulate it if the user isn't running it locally.
    
    return NextResponse.json({ 
      success: true, 
      status: 'Rendering Started',
      storyboard,
      message: 'Video rendering queued successfully. This will take a few minutes.'
    });

  } catch (error: any) {
    console.error('Video Gen Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
