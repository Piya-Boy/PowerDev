"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Smile } from 'lucide-react';
import EmojiPicker, { Theme } from 'emoji-picker-react';

const DarkChatWidget = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "สวัสดีครับ! ยินดีต้อนรับสู่ระบบแชทของเรา", sender: "agent", time: "14:30", avatar: "/images/logo.png" },
    { id: 2, text: "มีอะไรให้ช่วยเหลือไหมครับ?", sender: "agent", time: "14:30", avatar: "/images/logo.png" },
    { id: 3, text: "สวัสดีค่ะ ขอสอบถามเรื่องสินค้าหน่อยค่ะ", sender: "user", time: "14:31" },
    { id: 4, text: "ได้เลยครับ! คุณสนใจสินค้าประเภทไหนครับ?", sender: "agent", time: "14:32", avatar: "/images/logo.png" },
    { id: 5, text: "อยากทราบข้อมูลเพิ่มเติมเกี่ยวกับคอมพิวเตอร์ค่ะ", sender: "user", time: "14:33" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  useEffect(() => {
    if (!showEmojiPicker) return;
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);


  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: "user",
        time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          text: "ขอบคุณสำหรับคำถามครับ ทีมงานจะตอบกลับในไม่ช้า",
          sender: "agent",
          time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
          avatar: "/images/logo.png"
        }]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 relative"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* กล่องแชท */}
      <div className="w-90 h-120 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 backdrop-blur-sm flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Live Support</h3>
              <p className="text-gray-400 text-xs">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsMinimized(true)}
              className="cursor-pointer text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 h-60 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {msg.sender === 'agent' && (
                <div className="flex items-end space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg overflow-hidden">
                    <img src={msg.avatar} alt="Agent Logo" className="w-7 h-7 object-contain" />
                  </div>
                  <div className="max-w-xs">
                    <div className="px-4 py-3 rounded-2xl shadow-lg bg-gray-800 text-gray-100 border border-gray-700 mr-2">
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className="text-xs mt-2 text-gray-400">{msg.time}</p>
                    </div>
                  </div>
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="flex items-end space-x-2 flex-row-reverse">
                  <div className="w-8 h-8" /> {/* empty avatar space for alignment */}
                  <div className="max-w-xs">
                    <div className="px-4 py-3 rounded-2xl shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-2">
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className="text-xs mt-2 text-purple-200">{msg.time}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                🤖
              </div>
              <div className="bg-gray-800 text-gray-100 border border-gray-700 px-4 py-3 rounded-2xl shadow-lg ml-2 mr-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center space-x-2 bg-gray-700 rounded-full p-2 border border-gray-600 focus-within:border-purple-500 transition-colors">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-2 py-1 text-sm focus:outline-none"
            />
            <button
              type="button"
              className="cursor-pointer text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-600 relative"
              onClick={() => setShowEmojiPicker((v) => !v)}
              tabIndex={-1}
            >
              <Smile className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Emoji Picker แยกออกมา */}
      {showEmojiPicker && (
        <div
          ref={pickerRef}
          className="fixed bottom-32 right-4 z-[60] min-w-[350px] min-h-[40px] animate-emoji-fade-in"
        >
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={(emojiData) => {
              setInputText(inputText + emojiData.emoji);
            }}
            width="100%"
          />
        </div>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes emoji-fade-in {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-emoji-fade-in {
          animation: emoji-fade-in 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 4px;
        }
        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background-color: #1f2937;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  );
};

export default DarkChatWidget;