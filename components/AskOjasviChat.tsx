'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Terminal,
  Loader2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  'What did Ojasvi choose NOT to build?',
  'Why does FinAssist add 200ms latency?',
  'How many people are on the StageConnect waitlist?',
  'What was your role in KGH Platform?'
];

export default function AskOjasviChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: "Hi, I'm Ojasvi's portfolio AI assistant. I answer questions strictly from verified portfolio content under 80 words. What would you like to know?",
      source: 'ask-ojasvi.md',
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'That is not in my portfolio.',
        source: data.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `e-${Date.now()}`,
        sender: 'assistant',
        text: 'Error contacting assistant server. Please try again or check /evals.',
        timestamp: 'Now'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs shadow-2xl border border-white/20 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-blue-200 animate-pulse group-hover:rotate-12 transition-transform" />
          <span className="font-semibold tracking-wide">Ask Ojasvi AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
        </button>
      </div>

      {/* Slide-over Drawer Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md h-full bg-[#18191b] border-l border-[#3c4043] shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#2d2f31] bg-[#1e1f20] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Ask Ojasvi</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
                      GROUNDED
                    </span>
                  </h3>
                  <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Answers strictly from /content</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/evals"
                  onClick={() => setIsOpen(false)}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 flex items-center gap-1 transition-colors"
                >
                  <Terminal className="w-3 h-3 text-blue-400" />
                  <span>Evals</span>
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender === 'assistant' && (
                    <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-xl p-3 space-y-1 ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-[#222427] border border-[#3c4043] text-zinc-200 rounded-tl-xs'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                    {m.source && (
                      <div className="pt-1 text-[9px] font-mono text-zinc-400 flex items-center gap-1 border-t border-zinc-700/50 mt-1">
                        <span>Source:</span>
                        <span className="text-blue-300">{m.source}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 items-center text-zinc-400 text-xs">
                  <div className="w-6 h-6 rounded-md bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span className="font-mono text-[11px]">Verifying with portfolio ground truth...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-2 border-t border-[#2d2f31] bg-[#141517]">
              <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1.5">
                Suggested Questions
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {STARTER_PROMPTS.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSend(prompt)}
                    disabled={isLoading}
                    className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[#2d2f31] bg-[#1e1f20] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about projects, trade-offs, metrics..."
                className="flex-1 bg-[#131314] border border-[#3c4043] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-400"
              />

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
