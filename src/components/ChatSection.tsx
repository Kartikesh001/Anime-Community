import React, { useState, useEffect } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Message } from '../db/database';

interface ChatSectionProps {
  animeName: string;
  onBack: () => void;
}

export default function ChatSection({ animeName, onBack }: ChatSectionProps) {
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages for the current anime using live query
  const messages = useLiveQuery(
    async () => {
      const msgs = await db.messages
        .where('animeName')
        .equals(animeName)
        .reverse()
        .sortBy('timestamp');
      return msgs;
    },
    [animeName],
    [] // default value while loading
  );

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    try {
      await db.messages.add({
        animeName,
        user: "You",
        content: newMessage.trim(),
        timestamp: new Date()
      });
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  // Add some initial messages if none exist
  useEffect(() => {
    const initializeChat = async () => {
      const count = await db.messages.where('animeName').equals(animeName).count();
      
      if (count === 0) {
        const initialMessages = [
          {
            animeName,
            user: "AnimeKing",
            content: "Just finished the latest episode! The animation was incredible!",
            timestamp: new Date(Date.now() - 1000 * 60 * 5)
          },
          {
            animeName,
            user: "MangaLover",
            content: "The manga goes even further. You'll love what's coming next!",
            timestamp: new Date(Date.now() - 1000 * 60 * 2)
          }
        ];
        
        await db.messages.bulkAdd(initialMessages);
      }
    };

    initializeChat();
  }, [animeName]);

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="bg-indigo-600 p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="rounded-full p-2 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">{animeName} Community</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.user === "You" ? "items-end" : "items-start"
            }`}
          >
            <div className={`max-w-[80%] rounded-2xl p-3 ${
              message.user === "You"
                ? "bg-indigo-600 text-white"
                : "bg-white shadow-md"
            }`}>
              <div className="font-semibold">{message.user}</div>
              <div>{message.content}</div>
              <div className="mt-1 text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t bg-white p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="rounded-full bg-indigo-600 p-3 text-white hover:bg-indigo-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}