"use client";

import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "@/actions/chat";
import { Bot, X, Send, Loader2, MessageCircle, Sparkles } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "How can I improve my resume?",
  "Tips for my next interview?",
  "What skills should I learn?",
  "How to negotiate salary?",
];

export default function CareerCoachChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI Career Coach 👋 I'm here to give you personalized career advice based on your profile. What would you like help with today? first sign in! Pathpilot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async (text) => {
    const userMessage = text || input.trim();
    if (!userMessage || isLoading) return;

    setInput("");
    setShowSuggestions(false);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    // Only send last 10 messages for context
    const history = [...messages, { role: "user", content: userMessage }].slice(-10);

    const { message } = await sendChatMessage(
      history.map(({ role, content }) => ({ role, content }))
    );

    setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-all duration-200"
        aria-label="Open Career Coach"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] rounded-2xl border bg-background shadow-2xl flex flex-col overflow-hidden"
          style={{ height: "520px" }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b bg-primary text-primary-foreground">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-foreground/20">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-semibold text-sm">
                AI Career Coach
                <Sparkles className="h-3 w-3 opacity-80" />
              </div>
              <div className="text-xs opacity-70">Personalized for you</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-end gap-2 max-w-[85%]">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center mb-1">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="max-w-[85%] bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {showSuggestions && messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-muted-foreground px-1">Suggested questions:</p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs px-3 py-2 rounded-xl border hover:bg-muted transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-background">
            <div className="flex items-end gap-2 bg-muted rounded-xl px-3 py-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your career..."
                rows={1}
                className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground max-h-24 leading-relaxed"
                style={{ minHeight: "24px" }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2 opacity-60">
              Powered by PathPilot AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}