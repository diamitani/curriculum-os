import { NextRequest, NextResponse } from "next/server";

// Proxy chat completions to a compatible API backend (DeepSeek-compatible)
// This is used by the chat UI for the conversational questionnaire flow
const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const API_BASE = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com/v1";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    // If no API key, return a helpful error
    if (!API_KEY) {
      return NextResponse.json(
        {
          error: "DEEPSEEK_API_KEY not configured",
          message:
            "Set DEEPSEEK_API_KEY in your environment or .env.local to enable the AI chat backend.",
        },
        { status: 503 }
      );
    }

    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Upstream API error: ${response.status}`, detail: err },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
