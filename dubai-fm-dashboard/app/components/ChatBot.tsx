'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! 👋 I'm your FM AI Assistant. How can I help you today?", sender: 'bot', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const generateResponse = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes('book') || lower.includes('service') || lower.includes('job')) return "You can book a new service in the 'Portal' tab if you are a customer, or click '+ Create Job' if you are an admin.";
        if (lower.includes('status') || lower.includes('track')) return "You can track job status in real-time on the Dashboard or Customer Portal.";
        if (lower.includes('invoice') || lower.includes('pay') || lower.includes('bill')) return "Invoices are generated automatically after job completion. You can pay them in the 'My Bills' section.";
        if (lower.includes('ac') || lower.includes('leak') || lower.includes('broken')) return "That sounds like a maintenance issue. Please book a 'Reactive' job and mark it as High Priority if it's urgent.";
        if (lower.includes('hello') || lower.includes('hi')) return "Hi there! Ready to assist with your facility management needs.";
        return "I'm an AI assistant trained on FM operations. I can help with booking, tracking, and billing questions.";
    };

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), text: input, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI delay
        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now() + 1,
                text: generateResponse(userMsg.text),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 mb-4 flex flex-col border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="font-bold text-sm">FM AI Assistant</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">✕</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-gray-100 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-200"
            >
                {isOpen ? '✕' : '🤖'}
            </button>
        </div>
    );
}
