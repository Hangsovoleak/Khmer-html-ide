/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { Sparkles, HelpCircle, FileCode, Check, HelpCircle as HelpIcon, X, Terminal, Code2 } from "lucide-react";

import { EditorSettings, ConsoleLog, WorkspaceFile } from "./types";
import { 
  translateKhmerToStandard, 
  TAG_DOCS, 
  STARTER_TEMPLATES, 
  EXERCISES, 
  StarterTemplate, 
  Exercise,
  ATTRIBUTE_MAP
} from "./khmerHtml";

import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import RightPanel from "./components/RightPanel";
import BottomConsole from "./components/BottomConsole";
import AiAssistant from "./components/AiAssistant";

const DEFAULT_CODE = `<ទំព័រ>
  <ក្បាល>
    <ចំណងជើងទំព័រ>គេហទំព័រខ្មែរដំបូងបង្អស់</ចំណងជើងទំព័រ>
  </ក្បាល>
  <តួសេចក្តី>
    <ប្លុក ថ្នាក់="max-w-xl mx-auto my-12 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 text-center">
      <ប្លុក ថ្នាក់="h-16 w-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <កំប៉ិកកំប៉ុក ថ្នាក់="text-3xl">🇰🇭</កំប៉ិកកំប៉ុក>
      </ប្លុក>
      <ចំណងជើងធំ ថ្នាក់="text-3xl font-extrabold text-slate-800 tracking-tight">សួស្តី ពិភពលោក!</ចំណងជើងធំ>
      <ល្បះ ថ្នាក់="text-slate-500 font-medium text-sm mt-1">នេះគឺជាគេហទំព័រដំបូងដែលត្រូវបានសរសេរឡើងជាភាសាខ្មែរ។</ល្បះ>
      
      <បន្ទាត់កាត់ ថ្នាក់="my-6 border-slate-100" />
      
      <ល្បះ ថ្នាក់="text-slate-600 text-xs leading-relaxed mb-6">
        សរសេរកូដ HTML ខ្មែរនៅខាងឆ្វេង ហើយមើលលទ្ធផលគេហទំព័រភ្លាមៗនៅខាងស្តាំ។ ប្រើប្រាស់គំរូ និងលំហាត់ដើម្បីរៀនសូត្របន្ថែម!
      </ល្បះ>
      
      <តំណភ្ជាប់ អាសយដ្ឋាន="https://google.com" ថ្នាក់="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-6 rounded-full transition shadow-md text-xs">
        ស្វែងយល់បន្ថែម
      </តំណភ្ជាប់>
    </ប្លុក>
  </តួសេចក្តី>
</ទំព័រ>`;

export default function App() {
  // Settings with persistent local storage load
  const [settings, setSettings] = useState<EditorSettings>(() => {
    const saved = localStorage.getItem("khmerhtml-settings");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      theme: "vs-dark",
      fontSize: 14,
      wordWrap: "on",
      tabSize: 2,
      autoSave: true,
      autoRun: true,
      minimap: false,
      fontFamily: "Noto Sans Khmer"
    };
  });

  // Code state with persistence
  const [khmerCode, setKhmerCode] = useState(() => {
    const saved = localStorage.getItem("khmerhtml-code");
    return saved || DEFAULT_CODE;
  });

  const [currentFile, setCurrentFile] = useState("index.khhtml");
  const [standardHtml, setStandardHtml] = useState("");
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [logs, setLogs] = useState<ConsoleLog[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      type: "info",
      message: "KhmerHTML IDE ត្រូវបានចាប់ផ្តើមដោយជោគជ័យ។"
    }
  ]);

  // Exercise states
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [exerciseStatus, setExerciseStatus] = useState<"idle" | "success" | "error">("idle");
  const [exerciseFeedback, setExerciseFeedback] = useState("");

  // AI Panel
  const [isAiOpen, setIsAiOpen] = useState(false);
  // Help Modal
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Save Settings when changed
  useEffect(() => {
    localStorage.setItem("khmerhtml-settings", JSON.stringify(settings));
  }, [settings]);

  // Parse and translate KhmerHTML code on change
  useEffect(() => {
    localStorage.setItem("khmerhtml-code", khmerCode);
    
    const { html, errors } = translateKhmerToStandard(khmerCode);
    setStandardHtml(html);
    setValidationErrors(errors);

    // If an error is detected, output to logs
    if (errors.length > 0) {
      const errorCount = errors.filter(e => e.severity === "error").length;
      const warningCount = errors.filter(e => e.severity === "warning").length;
      
      const newLog: ConsoleLog = {
        timestamp: new Date().toLocaleTimeString(),
        type: errorCount > 0 ? "error" : "warning",
        message: `ការបកប្រែកូដ៖ រកឃើញកំហុសចំនួន ${errorCount} និងចំណុចគួរកែសម្រួលចំនួន ${warningCount}។`
      };

      setLogs(prev => {
        // Prevent duplicate consecutive logs
        if (prev.length > 0 && prev[prev.length - 1].message === newLog.message) {
          return prev;
        }
        return [...prev, newLog];
      });
    }
  }, [khmerCode]);

  // Setup Monaco Custom Language
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    // 1. Register KhmerHTML Language
    monaco.languages.register({ id: "khmerhtml" });

    // 2. Syntax Highlighting Monarch Rules
    monaco.languages.setMonarchTokensProvider("khmerhtml", {
      tokenizer: {
        root: [
          // Comments
          [/<!--[\s\S]*?-->/, "comment"],
          // Khmer Tags
          [/<[^\s>]+/, "tag"],
          [/<\/[^\s>]+/, "tag"],
          [/>/, "tag"],
          [/\/>/, "tag"],
          // Attributes
          [/[\u1780-\u17FFa-zA-Z0-9_-]+(?=\s*=)/, "attribute.name"],
          // Strings
          [/"[^"]*"/, "string"],
          [/'[^']*'/, "string"],
        ]
      }
    });

    // 3. Khmer Tooltip Hover Provider
    monaco.languages.registerHoverProvider("khmerhtml", {
      provideHover: (model, position) => {
        const word = model.getWordAtPosition(position);
        if (!word) return null;
        
        const doc = TAG_DOCS[word.word];
        if (doc) {
          return {
            contents: [
              { value: `**&lt;${doc.khmer}&gt;** (Standard: \`<${doc.standard}>\`)` },
              { value: `**គោលបំណង៖** ${doc.purpose}` },
              { value: `**ទម្រង់សរសេរ៖**\n\`\`\`html\n${doc.syntax}\n\`\`\`` },
              { value: `**ឧទាហរណ៍កូដ៖**\n\`\`\`html\n${doc.example}\n\`\`\`` },
              { value: `**កំហុសឆ្គងទូទៅ៖** *${doc.mistakes}*` },
              { value: `**ការអនុវត្តល្អបំផុត៖** ${doc.practices}` }
            ]
          };
        }
        return null;
      }
    });

    // 4. Autocomplete IntelliSense suggestions
    monaco.languages.registerCompletionItemProvider("khmerhtml", {
      triggerCharacters: ["<"],
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const suggestions = Object.entries(TAG_DOCS).map(([tagName, info]) => ({
          label: tagName,
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: {
            value: `ស្លាក Standard: <${info.standard}>\nគោលបំណង: ${info.purpose}\n\nឧទាហរណ៍៖\n${info.example}`
          },
          insertText: `${tagName}>$0</${tagName}>`,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        }));

        // Self closing tags
        suggestions.push({
          label: "ចុះបន្ទាត់",
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: { value: "ចុះបន្ទាត់ថ្មី (<br>)" },
          insertText: "ចុះបន្ទាត់ />",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
        suggestions.push({
          label: "បន្ទាត់កាត់",
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: { value: "គូសបន្ទាត់ផ្តេក (<hr>)" },
          insertText: "បន្ទាត់កាត់ />",
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
        suggestions.push({
          label: "រូបភាព",
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: { value: "បង្ហាញរូបភាព (<img>)" },
          insertText: 'រូបភាព ប្រភព="$1" ជំនួស="$2" />',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });
        suggestions.push({
          label: "តំណភ្ជាប់",
          kind: monaco.languages.CompletionItemKind.Keyword,
          documentation: { value: "តំណភ្ជាប់ទៅគេហទំព័រ (<a>)" },
          insertText: 'តំណភ្ជាប់ អាសយដ្ឋាន="$1">$2</តំណភ្ជាប់>',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          range
        });

        return { suggestions };
      }
    });
  };

  // 1. Top Bar Actions
  const handleNewFile = () => {
    if (window.confirm("តើអ្នកចង់បង្កើតទំព័រថ្មីពិតមែនទេ? កូដបច្ចុប្បន្ននឹងត្រូវបានលុប។")) {
      setKhmerCode(`<ទំព័រ>\n  <ក្បាល>\n    <ចំណងជើងទំព័រ>ឯកសារថ្មី</ចំណងជើងទំព័រ>\n  </ក្បាល>\n  <តួសេចក្តី>\n    \n  </តួសេចក្តី>\n</ទំព័រ>`);
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        type: "info",
        message: "បានបង្កើតឯកសារថ្មី។"
      }]);
    }
  };

  const handleOpenFile = () => {
    const firstTpl = STARTER_TEMPLATES[0];
    handleSelectTemplate(firstTpl);
  };

  const handleSaveFile = () => {
    localStorage.setItem("khmerhtml-code", khmerCode);
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type: "success",
      message: "បានរក្សាទុកកូដរបស់អ្នកដោយជោគជ័យ។"
    }]);
    alert("បានរក្សាទុកកូដដោយជោគជ័យក្នុងកម្មវិធីរុករក!");
  };

  const handleDownloadKhmer = () => {
    const blob = new Blob([khmerCode], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.khhtml";
    link.click();
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type: "success",
      message: "បានទាញយកឯកសារ Khmer HTML (index.khhtml)"
    }]);
  };

  const handleDownloadStandard = () => {
    const blob = new Blob([standardHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "index.html";
    link.click();
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type: "success",
      message: "បានទាញយកឯកសារ Standard HTML (index.html)"
    }]);
  };

  const handleCopyKhmer = () => {
    navigator.clipboard.writeText(khmerCode);
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type: "success",
      message: "បានចម្លងកូដ KhmerHTML ទៅកាន់ក្តារតម្បៀត (Clipboard)។"
    }]);
  };

  // Fast aesthetic KhmerHTML code formatter
  const handleFormatCode = () => {
    try {
      let formatted = khmerCode;
      // Simple indent strategy using tags
      let indentLevel = 0;
      const spaceUnit = "  ";
      const lines = khmerCode
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const formattedLines = lines.map(line => {
        // If line is closing tag, decrease indent first
        if (line.startsWith("</")) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const indentedLine = spaceUnit.repeat(indentLevel) + line;

        // If line is opening tag and not self closing, increase indent for next lines
        const isSelfClosing = line.endsWith("/>") || line.includes("<ចុះបន្ទាត់") || line.includes("<បន្ទាត់កាត់") || line.includes("<រូបភាព") || line.includes("<ប្រអប់បញ្ចូល");
        if (line.startsWith("<") && !line.startsWith("</") && !isSelfClosing) {
          indentLevel++;
        }

        return indentedLine;
      });

      setKhmerCode(formattedLines.join("\n"));
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        type: "success",
        message: "បានរៀបចំកូដឱ្យមានរបៀបរៀបរយរួចរាល់។"
      }]);
    } catch (err) {
      console.error("Format error:", err);
    }
  };

  const handleRunCode = () => {
    const { html, errors } = translateKhmerToStandard(khmerCode);
    setStandardHtml(html);
    setLogs(prev => [...prev, {
      timestamp: new Date().toLocaleTimeString(),
      type: "success",
      message: "កំពុងដំណើរការកូដរបស់អ្នកឡើងវិញ..."
    }]);
  };

  // 2. Sidebar load templates and exercises
  const handleSelectTemplate = (template: StarterTemplate) => {
    if (window.confirm(`តើអ្នកចង់បើកគំរូ "${template.title}" ដែរឬទេ? កូដបច្ចុប្បន្ននឹងត្រូវជំនួស។`)) {
      setKhmerCode(template.code);
      setActiveExercise(null);
      setExerciseStatus("idle");
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        type: "info",
        message: `បានបើកទំព័រគំរូ៖ ${template.title}`
      }]);
    }
  };

  const handleSelectExercise = (exercise: Exercise) => {
    if (window.confirm(`តើអ្នកចង់បើក "${exercise.title}" ដែរឬទេ?`)) {
      setKhmerCode(exercise.starterCode);
      setActiveExercise(exercise);
      setExerciseStatus("idle");
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        type: "info",
        message: `បានចាប់ផ្តើមលំហាត់៖ ${exercise.title}`
      }]);
    }
  };

  const handleValidateExercise = () => {
    if (!activeExercise) return;
    const result = activeExercise.validate(khmerCode);
    if (result.success) {
      setExerciseStatus("success");
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        type: "success",
        message: `លំហាត់ជោគជ័យ៖ អបអរសាទរ! អ្នកបានបំពេញលំហាត់ "${activeExercise.title}" បានយ៉ាងល្អ!`
      }]);
    } else {
      setExerciseStatus("error");
      setExerciseFeedback(result.hint || "លទ្ធផលមិនទាន់ត្រឹមត្រូវតាមការណែនាំនៅឡើយទេ។");
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        type: "warning",
        message: `លំហាត់មិនទាន់ត្រឹមត្រូវ៖ ${result.hint}`
      }]);
    }
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${
      settings.theme === "vs-dark" ? "bg-slate-950 text-slate-100" : "bg-white text-slate-800"
    }`}>
      
      {/* 1. Header Toolbar */}
      <TopBar 
        onNewFile={handleNewFile}
        onOpenFile={handleOpenFile}
        onSaveFile={handleSaveFile}
        onDownloadKhmer={handleDownloadKhmer}
        onDownloadStandard={handleDownloadStandard}
        onCopyKhmer={handleCopyKhmer}
        onFormatCode={handleFormatCode}
        onRunCode={handleRunCode}
        settings={settings}
        setSettings={setSettings}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left pane: Explorer & Lessons */}
        <div className="flex-shrink-0 h-full">
          <Sidebar 
            settings={settings}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            onSelectTemplate={handleSelectTemplate}
            onSelectExercise={handleSelectExercise}
            code={khmerCode}
            validationErrors={validationErrors}
            onValidateExercise={handleValidateExercise}
            exerciseStatus={exerciseStatus}
            exerciseFeedback={exerciseFeedback}
          />
        </div>

        {/* Center pane: Code Editor & Diagnostics Console */}
        <div className="flex flex-col flex-1 h-full min-w-0 border-r border-slate-200 dark:border-gray-800">
          {/* Active File Name Tab */}
          <div className={`flex items-center px-4 h-9 border-b ${
            settings.theme === "vs-dark" ? "bg-[#0F1117] border-gray-800" : "bg-slate-50 border-slate-200"
          } select-none text-xs font-mono`}>
            <div className={`flex items-center space-x-2 py-1 px-3 border-r h-full ${
              settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800 text-blue-400 font-bold" : "bg-white border-slate-200 text-blue-600 font-bold"
            }`}>
              <FileCode className="h-3.5 w-3.5" />
              <span>index.khhtml</span>
            </div>
          </div>

          {/* Editor block */}
          <div className="flex-1 overflow-hidden">
            <MonacoEditor
              height="100%"
              language="khmerhtml"
              theme={settings.theme}
              value={khmerCode}
              onChange={(val) => setKhmerCode(val || "")}
              onMount={handleEditorDidMount}
              options={{
                fontSize: settings.fontSize,
                fontFamily: settings.fontFamily,
                wordWrap: settings.wordWrap,
                tabSize: settings.tabSize,
                minimap: { enabled: settings.minimap },
                autoClosingBrackets: "always",
                autoIndent: "advanced",
                matchBrackets: "always",
                folding: true,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Diagnostics and logs terminal at bottom */}
          <BottomConsole 
            settings={settings}
            logs={logs}
            onClearLogs={() => setLogs([])}
            validationErrors={validationErrors}
          />
        </div>

        {/* Right pane: Web previews, generated code, and dom hierarchy */}
        <div className="flex-1 h-full min-w-0">
          <RightPanel 
            settings={settings}
            khmerCode={khmerCode}
            standardHtml={standardHtml}
            logs={logs}
            setLogs={setLogs}
          />
        </div>
      </div>

      {/* 3. Floating Smart AI Assistant Panel */}
      <AiAssistant 
        settings={settings}
        khmerCode={khmerCode}
        setKhmerCode={setKhmerCode}
        standardHtml={standardHtml}
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      {/* Floating AI Trigger icon on right-hand margin */}
      <button
        onClick={() => setIsAiOpen(!isAiOpen)}
        title="គ្រូជំនួយការ AI (AI Tutor)"
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-2xl transition hover:scale-110 active:scale-95 cursor-pointer group"
      >
        <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 text-[8px] font-bold text-white items-center justify-center">AI</span>
        </span>
      </button>

      {/* Help Modal Overlay */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`max-w-2xl w-full rounded-2xl border shadow-2xl p-6 ${
            settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-sans font-bold text-base text-blue-400 flex items-center space-x-2">
                <HelpIcon className="h-5 w-5" />
                <span>របៀបប្រើប្រាស់ KhmerHTML IDE</span>
              </h3>
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed max-h-[400px] overflow-y-auto pr-1">
              <div>
                <span className="font-bold text-blue-400 block text-sm mb-1">១. តើអ្វីជា KhmerHTML?</span>
                <p>
                  KhmerHTML គឺជាប្រព័ន្ធកូដសិក្សាដែលអនុញ្ញាតឱ្យសិស្សានុសិស្សវាយស្លាក HTML ដោយប្រើប្រាស់ពាក្យខ្មែរជំនួសឱ្យពាក្យអង់គ្លេស។ ឧទហរណ៍ <code>&lt;ទំព័រ&gt;</code> ជំនួសឱ្យ <code>&lt;html&gt;</code> និង <code>&lt;តួសេចក្តី&gt;</code> ជំនួសឱ្យ <code>&lt;body&gt;</code>។
                </p>
              </div>

              <div>
                <span className="font-bold text-blue-400 block text-sm mb-1">២. របៀបដំណើរការ</span>
                <p>
                  រាល់ពេលដែលអ្នកវាយកូដខ្មែរ ប្រព័ន្ធនឹងបម្លែងវាទៅជាកូដ HTML ស្តង់ដារភ្លាមៗ (នៅក្នុងផ្ទាំង **Standard HTML** ខាងស្តាំ) និងបង្ហាញលទ្ធផលវេបសាយពិតប្រាកដក្នុងផ្ទាំង **Live Preview**។
                </p>
              </div>

              <div>
                <span className="font-bold text-blue-400 block text-sm mb-1">៣. ជំនួយការ AI (AI Tutor)</span>
                <p>
                  ចុចលើប៊ូតុង **AI** ពណ៌ខៀវនៅជ្រុងខាងស្តាំក្រោម ដើម្បីបើកផ្ទាំងជជែក។ AI អាចជួយពន្យល់កូដរបស់អ្នក ស្វែងរកកំហុសឆ្គង ឬបង្កើតទំព័រគំរូថ្មីៗយ៉ាងឆាប់រហ័ស។
                </p>
              </div>

              <div>
                <span className="font-bold text-blue-400 block text-sm mb-1">៤. បញ្ជីស្លាកកូដសំខាន់ៗ</span>
                <div className="grid grid-cols-2 gap-2 bg-slate-950/40 dark:bg-[#0F1117]/50 p-3 rounded-xl border border-slate-800 dark:border-gray-800">
                  <div>
                    <span className="font-bold text-blue-400">រចនាសម្ព័ន្ធ៖</span>
                    <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[10px]">
                      <li><code>&lt;ទំព័រ&gt;</code> (html)</li>
                      <li><code>&lt;ក្បាល&gt;</code> (head)</li>
                      <li><code>&lt;ចំណងជើងទំព័រ&gt;</code> (title)</li>
                      <li><code>&lt;តួសេចក្តី&gt;</code> (body)</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-blue-400">អត្ថបទ៖</span>
                    <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[10px]">
                      <li><code>&lt;ចំណងជើងធំ&gt;</code> (h1)</li>
                      <li><code>&lt;ចំណងជើងរង&gt;</code> (h2)</li>
                      <li><code>&lt;ល្បះ&gt;</code> (p)</li>
                      <li><code>&lt;ចុះបន្ទាត់&gt;</code> (br)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t flex justify-end">
              <button 
                onClick={() => setIsHelpOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl text-xs transition"
              >
                យល់ព្រម
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
