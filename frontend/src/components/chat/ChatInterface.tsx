"use client";

import { useRef, useEffect, useState } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hi! I'm the ROSTR OS Agent. I can help you architect, orchestrate, research, or debug based on the 5D Lifecycle framework. What can I help you with today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      let aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: "" };
      setMessages(prev => [...prev, aiMsg]);

      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        
        // Vercel AI SDK text stream format parses out the '0:"..."' strings
        const chunk = decoder.decode(value);
        const lines = chunk.split('\\n');
        
        for (const line of lines) {
          if (line.startsWith('0:')) {
            const content = JSON.parse(line.substring(2));
            aiMsg.content += content;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { ...aiMsg };
              return updated;
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev, 
        { id: Date.now().toString(), role: 'system', content: 'An error occurred while generating the response.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-10 shadow-sm shadow-slate-100">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <span className="text-white text-sm font-bold tracking-tight">RO</span>
        </div>
        <div>
          <h1 className="font-semibold text-slate-800 tracking-tight">ROSTR OS Agent</h1>
          <p className="text-xs text-indigo-600 font-medium">Phase-Aware Architecture</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8 space-y-6 scroll-smooth">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 rounded-br-sm' 
                : msg.role === 'system'
                ? 'bg-red-50 text-red-700 border border-red-100 rounded-bl-sm'
                : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-bl-sm'
            }`}>
              <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="flex gap-1.5 bg-white border border-slate-200 px-3 py-2.5 rounded-full shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-slate-500 font-medium ml-2 tracking-tight">Compiling via PAL...</span>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/70 backdrop-blur-xl border-t border-slate-200/60 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.05)]">
        <form 
          onSubmit={handleSubmit}
          className="relative max-w-4xl mx-auto flex items-end gap-2 bg-white border border-slate-200 rounded-2xl p-2 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-300 transition-all shadow-sm"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your intent (e.g., 'Design an architecture for lead enrichment')"
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none resize-none focus:outline-none focus:ring-0 px-3 py-2 text-[15px] text-slate-800 placeholder:text-slate-400"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-11 w-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white flex items-center justify-center transition-colors shadow-lg shadow-indigo-600/20 flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
