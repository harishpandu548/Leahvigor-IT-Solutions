"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Message = { role: "user" | "model"; content: string };

const QUICK_ACTIONS = [
  "Find Talent",
  "Grow Digitally",
  "IT Solutions",
  "Build a Website"
];

function TypewriterMessage({ content }: { content: string }) {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, content]);

  return (
    <>
      {displayedContent.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{color: '#fff'}}>{part}</strong> : part)}
      {currentIndex < content.length && <span style={{ display: "inline-block", width: "8px", height: "14px", marginLeft: "4px", backgroundColor: "rgba(255,255,255,0.5)", verticalAlign: "middle" }} className="animate-pulse" />}
    </>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "How can Leahvigor accelerate your growth?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  // (Removed scroll lock to allow background scrolling while chat is open)
  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const newMessages = [...messages, { role: "user" as const, content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessages([...newMessages, { role: "model", content: data.text }]);
      } else {
        setMessages([...newMessages, { role: "model", content: "I'm sorry, I encountered an error. Please contact us directly." }]);
      }
    } catch (e) {
      setMessages([...newMessages, { role: "model", content: "Network error. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              position: "fixed",
              bottom: "80px",
              right: "24px",
              width: "100%",
              maxWidth: "380px",
              height: "600px",
              maxHeight: "calc(100vh - 100px)",
              backgroundColor: "rgba(10, 15, 25, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden"
            }}
          >
            {/* Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "linear-gradient(to right, rgba(255,255,255,0.03), transparent)"
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#fff" }}>
                  Leahvigor Assistant
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent", border: "none", color: "rgba(255,255,255,0.5)",
                  cursor: "pointer", padding: "4px"
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              style={{
                flex: 1,
                padding: "24px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row"
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    backgroundColor: msg.role === "user" ? "rgba(255,255,255,0.1)" : "#3AA6B9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    {msg.role === "user" ? <User size={14} color="#fff" /> : <Bot size={14} color="#fff" />}
                  </div>
                  
                  <div style={{
                    backgroundColor: msg.role === "user" ? "rgba(255,255,255,0.05)" : "rgba(58, 166, 185, 0.1)",
                    border: msg.role === "user" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(58, 166, 185, 0.2)",
                    padding: "12px 16px",
                    borderRadius: "16px",
                    borderTopRightRadius: msg.role === "user" ? "4px" : "16px",
                    borderTopLeftRadius: msg.role === "model" ? "4px" : "16px",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "14px",
                    lineHeight: "1.5",
                    maxWidth: "85%"
                  }}>
                    {msg.role === "model" && idx !== 0 ? (
                      <TypewriterMessage content={msg.content} />
                    ) : (
                      msg.content.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{color: '#fff'}}>{part}</strong> : part)
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#3AA6B9",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <Bot size={14} color="#fff" />
                  </div>
                  <div style={{ 
                    padding: "12px 16px", 
                    backgroundColor: "rgba(58, 166, 185, 0.1)",
                    border: "1px solid rgba(58, 166, 185, 0.2)",
                    borderRadius: "16px",
                    borderTopLeftRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "44px"
                  }}>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", fontStyle: "italic", fontFamily: "var(--font-inter, sans-serif)" }}>
                      Agent is typing
                    </span>
                    <div style={{ display: "flex", gap: "4px", alignItems: "center", marginTop: "4px" }}>
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 3, height: 3, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "50%" }} />
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 3, height: 3, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "50%" }} />
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 3, height: 3, backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "50%" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions (only show if few messages) */}
            {messages.length <= 2 && !isLoading && (
              <div style={{ padding: "0 24px 16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {QUICK_ACTIONS.map(action => (
                  <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                      padding: "8px 12px",
                      borderRadius: "100px",
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                    onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{
                display: "flex",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "24px",
                padding: "8px 16px",
                alignItems: "flex-end"
              }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask us anything..."
                  rows={1}
                  style={{
                    flex: 1, background: "transparent", border: "none", color: "#fff",
                    fontSize: "14px", resize: "none", outline: "none", padding: "4px 0",
                    maxHeight: "100px", minHeight: "24px"
                  }}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  style={{
                    background: input.trim() && !isLoading ? "#3AA6B9" : "rgba(255,255,255,0.1)",
                    border: "none", width: "32px", height: "32px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                    marginLeft: "12px", transition: "all 0.2s", flexShrink: 0
                  }}
                >
                  <Send size={14} color={input.trim() && !isLoading ? "#000" : "rgba(255,255,255,0.3)"} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9, rotate: -10 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          position: "fixed", bottom: "24px", right: "24px", zIndex: 9998,
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#3AA6B9", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 20px rgba(58, 166, 185, 0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} color="#000" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} color="#000" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Global Style for Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </>
  );
}
