/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import { 
  Sparkles, 
  Send, 
  Trash2, 
  HelpCircle, 
  Code2, 
  MessageSquare, 
  X,
  AlertCircle,
  Wand2,
  Minimize2,
  Maximize2
} from "lucide-react";
import { EditorSettings } from "../types";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AiAssistantProps {
  settings: EditorSettings;
  khmerCode: string;
  setKhmerCode: (code: string) => void;
  standardHtml: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AiAssistant({
  settings,
  khmerCode,
  setKhmerCode,
  standardHtml,
  isOpen,
  onClose
}: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `សួស្តី! ខ្ញុំជា **គ្រូបង្រៀន AI** សម្រាប់វគ្គសិក្សា **KhmerHTML**។ 🌸\n\nតើអ្នកចង់ឱ្យខ្ញុំជួយអ្វីខ្លះនៅថ្ងៃនេះ? អ្នកអាចសួរខ្ញុំបានអំពី៖\n- ពន្យល់អំពីស្លាក HTML ខ្មែរ\n- ស្វែងរកកំហុសឆ្គង ឬកែកូដឱ្យល្អប្រសើរឡើង\n- បកប្រែកូដខ្មែរទៅ Standard HTML ឬផ្ទុយមកវិញ\n- បង្កើតទំព័រគំរូថ្មីៗតាមការចង់បាន`
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const prompt = textToSend || input;
    if (!prompt.trim()) return;

    if (!textToSend) {
      setInput("");
    }
    setError(null);
    setLoading(true);

    const newUserMessage: Message = { role: "user", content: prompt };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    try {
      // Build a robust system prompt educating Gemini about KhmerHTML dialect
      const systemInstruction = `
You are KhmerHTML AI Assistant, an expert friendly web programming tutor.
Your goal is to teach HTML coding using "KhmerHTML", a browser IDE which translates Khmer language tags to standard HTML.

Here is the exact KhmerHTML Tag specification:
- <html> -> <ទំព័រ>
- <head> -> <ក្បាល>
- <title> -> <ចំណងជើងទំព័រ>
- <body> -> <តួសេចក្តី>
- <h1> -> <ចំណងជើងធំ>
- <h2> -> <ចំណងជើងរង>
- <p> -> <ល្បះ>
- <br> -> <ចុះបន្ទាត់>
- <hr> -> <បន្ទាត់កាត់>
- <strong> -> <អក្សរដិត>
- <em> -> <អក្សរទ្រេត>
- <a> -> <តំណភ្ជាប់>
- <img> -> <រូបភាព>
- <video> -> <វីដេអូ>
- <audio> -> <សំឡេង>
- <ul> -> <បញ្ជីគ្មានលំដាប់>
- <ol> -> <បញ្ជីមានលំដាប់>
- <li> -> <ធាតុបញ្ជី>
- <table> -> <តារាង>
- <tr> -> <ជួរដេក>
- <th> -> <ក្បាលតារាង>
- <td> -> <ទិន្នន័យតារាង>
- <form> -> <ទម្រង់>
- <input> -> <ប្រអប់បញ្ចូល>
- <button> -> <ប៊ូតុង>
- <textarea> -> <ប្រអប់អត្ថបទ>
- <div> -> <ប្លុក>
- <span> -> <កំប៉ិកកំប៉ុក>

Khmer Attributes:
- href -> អាសយដ្ឋាន
- src -> ប្រភព
- alt -> ជំនួស
- width -> ទទឹង
- height -> កម្ពស់
- class -> ថ្នាក់
- id -> លេខសម្គាល់
- type -> ប្រភេទ
- value -> តម្លៃ
- name -> ឈ្មោះ
- color -> ពណ៌

Context:
The user is currently writing this KhmerHTML code in their editor:
\`\`\`html
${khmerCode}
\`\`\`

The translated standard HTML is:
\`\`\`html
${standardHtml}
\`\`\`

Always communicate warmly in Khmer language, explain clearly, and encourage beginners. When requested to generate code, write it inside KhmerHTML format so they can copy and paste it directly.
      `;

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          systemInstruction,
          // Exclude first greeting message for cleaner context
          history: updatedMessages.slice(1, -1)
        }),
      });

      if (!response.ok) {
        throw new Error("ការភ្ជាប់ទៅកាន់ AI ជំនួយការបានបរាជ័យ។ សូមប្រាកដថា API Key ត្រូវបានកំណត់។");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (actionType: "explain" | "fix" | "convert_standard" | "convert_khmer") => {
    let promptText = "";
    if (actionType === "explain") {
      promptText = "សូមពន្យល់លម្អិតអំពីកូដ KhmerHTML របស់ខ្ញុំ និងប្រាប់ពីរបៀបដែលវាបម្លែងទៅ Standard HTML។";
    } else if (actionType === "fix") {
      promptText = "តើកូដ KhmerHTML របស់ខ្ញុំមានកំហុសឆ្គង ឬបញ្ហាអ្វីខ្លះទេ? សូមជួយស្វែងរក និងណែនាំវិធីកែតម្រូវ។";
    } else if (actionType === "convert_standard") {
      promptText = "សូមជួយបកប្រែកូដរបស់ខ្ញុំទៅជា Standard HTML ធម្មតា ហើយពន្យល់ពីភាពខុសគ្នានៃស្លាកនីមួយៗ។";
    } else if (actionType === "convert_khmer") {
      promptText = "សូមណែនាំពីរបៀបប្តូរកូដ standard HTML ទៅជា KhmerHTML វិញ។";
    }
    handleSend(promptText);
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: `ប្រព័ន្ធបានសំអាតប្រវត្តិជជែក។ តើខ្ញុំអាចជួយអ្វីខ្លះបន្ថែមទៀតអំពី **KhmerHTML**?`
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-4 bottom-4 top-20 w-96 rounded-2xl border shadow-2xl z-40 flex flex-col overflow-hidden transition-colors duration-200 ${
      settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
    }`}>
      {/* AI Header */}
      <div className="flex h-12 items-center justify-between border-b px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white select-none">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <h2 className="text-xs font-bold font-sans">KhmerHTML AI គ្រូបង្រៀន</h2>
        </div>
        <div className="flex items-center space-x-1.5">
          <button 
            onClick={handleClearChat}
            title="លុបការសន្ទនា"
            className="p-1 rounded hover:bg-white/10 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Quick suggestions panel */}
      <div className={`p-2 border-b flex gap-1.5 overflow-x-auto select-none ${
        settings.theme === "vs-dark" ? "bg-[#0F1117]/50 border-gray-800" : "bg-slate-50 border-slate-150"
      }`}>
        <button
          onClick={() => handleQuickAction("explain")}
          className="text-[10px] whitespace-nowrap bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/15 font-bold transition flex items-center space-x-1"
        >
          <Code2 className="h-3 w-3" />
          <span>ពន្យល់កូដខ្ញុំ</span>
        </button>
        <button
          onClick={() => handleQuickAction("fix")}
          className="text-[10px] whitespace-nowrap bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2 py-1 rounded-lg border border-red-500/15 font-bold transition flex items-center space-x-1"
        >
          <AlertCircle className="h-3 w-3" />
          <span>ស្វែងរកកំហុស</span>
        </button>
        <button
          onClick={() => handleQuickAction("convert_standard")}
          className="text-[10px] whitespace-nowrap bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/15 font-bold transition flex items-center space-x-1"
        >
          <Wand2 className="h-3 w-3" />
          <span>បកប្រែជា standard</span>
        </button>
      </div>

      {/* Messages interface */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
        settings.theme === "vs-dark" ? "bg-[#0F1117]" : "bg-slate-50"
      }`}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-tr-none"
                : settings.theme === "vs-dark" ? "bg-[#1E1E2E] text-slate-100 rounded-tl-none border border-gray-800" : "bg-white text-slate-800 rounded-tl-none border border-slate-150"
            }`}>
              <div className="markdown-body text-xs leading-relaxed break-words space-y-2 prose dark:prose-invert max-w-none">
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className={`rounded-2xl p-3 flex items-center space-x-2 ${
              settings.theme === "vs-dark" ? "bg-[#1E1E2E] border border-gray-800 text-slate-400" : "bg-white border text-slate-500"
            }`}>
              <Sparkles className="h-4 w-4 animate-spin text-blue-500" />
              <span className="text-[11px] font-sans">គ្រូកំពុងគិត និងរៀបចំចម្លើយ...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold block">ការភ្ជាប់មានបញ្ហា៖</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className={`p-3 border-t flex space-x-2 ${
          settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800" : "bg-white border-slate-150"
        }`}
      >
        <input
          type="text"
          placeholder="សួរនាំអំពីមេរៀនសរសេរកូដខ្មែរ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className={`flex-1 text-xs p-3 rounded-xl border focus:outline-blue-500 focus:ring-blue-500 ${
            settings.theme === "vs-dark" ? "bg-[#0F1117] border-gray-800 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
          }`}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl transition shadow flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
