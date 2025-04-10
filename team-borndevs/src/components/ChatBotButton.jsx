'use client';
import CyberChatBot from "@/components/CyberChatBot";
import { MessageCircle, X } from 'lucide-react';
import { useState } from "react";

function ChatBotButton() {

    const [showChatBot, setShowChatBot] = useState(false);

  return (
    <>
        {/* Chat Toggle Button */}
        <button
        onClick={() => setShowChatBot(!showChatBot)}
        className="fixed bottom-3 right-3 md:bottom-8 md:right-8 w-14 h-14 flex items-center justify-center
                   bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg
                   transition-all duration-200 hover:scale-110 z-50"
        aria-label="Toggle chat"
          >
        {showChatBot ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
          </button>
        
          {/* Chat Window */}
          <div
        className={`fixed z-10 bottom-28 right-8 bg-white dark:bg-gray-800
                    shadow-lg rounded-lg overflow-hidden transition-all duration-300
                    transform ${showChatBot ? 'translate-y-0 opacity-100' :
                    'translate-y-10 opacity-0 pointer-events-none'}`}
          >
        <CyberChatBot />
          </div>
    </>
  )
}

export default ChatBotButton