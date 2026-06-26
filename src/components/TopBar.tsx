/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Code2, 
  FileCode, 
  Download, 
  Copy, 
  Play, 
  Sparkles, 
  Settings as SettingsIcon, 
  HelpCircle, 
  FilePlus2, 
  FolderOpen, 
  Save, 
  AlignLeft,
  Check,
  Sun,
  Moon
} from "lucide-react";
import { EditorSettings } from "../types";

interface TopBarProps {
  onNewFile: () => void;
  onOpenFile: () => void;
  onSaveFile: () => void;
  onDownloadKhmer: () => void;
  onDownloadStandard: () => void;
  onCopyKhmer: () => void;
  onFormatCode: () => void;
  onRunCode: () => void;
  settings: EditorSettings;
  setSettings: (s: EditorSettings) => void;
  onOpenHelp: () => void;
}

export default function TopBar({
  onNewFile,
  onOpenFile,
  onSaveFile,
  onDownloadKhmer,
  onDownloadStandard,
  onCopyKhmer,
  onFormatCode,
  onRunCode,
  settings,
  setSettings,
  onOpenHelp
}: TopBarProps) {
  const [copied, setCopied] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const handleCopy = () => {
    onCopyKhmer();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleTheme = () => {
    setSettings({
      ...settings,
      theme: settings.theme === "vs-dark" ? "vs-light" : "vs-dark"
    });
  };

  return (
    <header className={`flex h-16 items-center justify-between border-b px-4 transition-colors duration-200 ${
      settings.theme === "vs-dark" 
        ? "bg-[#1E1E2E] border-gray-800 text-slate-100" 
        : "bg-white border-slate-200 text-slate-800"
    } select-none`}>
      {/* Brand Logo & Name */}
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md">
          <Code2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-lg leading-none tracking-tight">KhmerHTML IDE</h1>
          <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">v1.0.0 (រៀនសរសេរកូដ)</span>
        </div>
      </div>

      {/* Main File & Edit Controls */}
      <div className="hidden lg:flex items-center space-x-1">
        <button 
          onClick={onNewFile}
          title="ឯកសារថ្មី (Ctrl+N)"
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <FilePlus2 className="h-4 w-4 text-blue-500" />
          <span>ឯកសារថ្មី</span>
        </button>

        <button 
          onClick={onOpenFile}
          title="បើកគំរូកូដ"
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <FolderOpen className="h-4 w-4 text-blue-500" />
          <span>បើកគំរូ</span>
        </button>

        <button 
          onClick={onSaveFile}
          title="រក្សាទុក (Ctrl+S)"
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <Save className="h-4 w-4 text-blue-500" />
          <span>រក្សាទុក</span>
        </button>

        <div className={`h-6 w-[1px] mx-2 ${settings.theme === "vs-dark" ? "bg-slate-800" : "bg-slate-200"}`} />

        {/* Export Dropdown Triggers */}
        <button 
          onClick={onDownloadKhmer}
          title="ទាញយក Khmer HTML"
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <Download className="h-4 w-4 text-indigo-500" />
          <span>ទាញយក KhmerHTML</span>
        </button>

        <button 
          onClick={onDownloadStandard}
          title="ទាញយក Standard HTML"
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <FileCode className="h-4 w-4 text-blue-500" />
          <span>ទាញយក HTML ធម្មតា</span>
        </button>
      </div>

      {/* Action Commands */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleCopy}
          title="ចម្លងកូដខ្មែរ"
          className={`p-2 rounded-lg transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </button>

        <button
          onClick={onFormatCode}
          title="រៀបចំកូដឱ្យមានរបៀប (Format Code)"
          className={`p-2 rounded-lg transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <AlignLeft className="h-4 w-4 text-purple-500" />
        </button>

        <button
          onClick={toggleTheme}
          title={settings.theme === "vs-dark" ? "ប្តូរទៅ Light Mode" : "ប្តូរទៅ Dark Mode"}
          className={`p-2 rounded-lg transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-yellow-500" : "hover:bg-slate-100 text-blue-600"
          }`}
        >
          {settings.theme === "vs-dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <button
          onClick={onRunCode}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition-all transform hover:scale-[1.02]"
        >
          <Play className="h-3.5 w-3.5 fill-white" />
          <span>ដំណើរការ</span>
        </button>

        <div className={`h-6 w-[1px] ${settings.theme === "vs-dark" ? "bg-slate-800" : "bg-slate-200"}`} />

        {/* Settings button */}
        <div className="relative">
          <button
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            className={`p-2 rounded-lg transition duration-150 ${
              settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <SettingsIcon className={`h-4 w-4 ${showSettingsDropdown ? "rotate-45" : ""} transition-transform duration-200`} />
          </button>

          {showSettingsDropdown && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowSettingsDropdown(false)} />
              <div className={`absolute right-0 mt-2 w-56 rounded-xl border p-4 shadow-xl z-20 ${
                settings.theme === "vs-dark" ? "bg-[#0F1117] border-gray-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
              }`}>
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">ការកំណត់ Editor</h3>
                
                {/* Font Size */}
                <div className="mb-3">
                  <label className="block text-[11px] mb-1">ទំហំអក្សរ ({settings.fontSize}px)</label>
                  <input 
                    type="range" 
                    min="12" 
                    max="24" 
                    value={settings.fontSize} 
                    onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Font Family Selection */}
                <div className="mb-3">
                  <label className="block text-[11px] mb-1">ប្រភេទអក្សរ (Font Family)</label>
                  <select 
                    value={settings.fontFamily}
                    onChange={(e) => setSettings({ ...settings, fontFamily: e.target.value as any })}
                    className={`w-full text-xs p-1.5 rounded-lg border focus:outline-blue-500 ${
                      settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                    }`}
                  >
                    <option value="Noto Sans Khmer">Noto Sans Khmer</option>
                    <option value="JetBrains Mono">JetBrains Mono</option>
                  </select>
                </div>

                {/* Word Wrap */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px]">ចុះបន្ទាត់ស្វ័យប្រវត្ត</span>
                  <input 
                    type="checkbox" 
                    checked={settings.wordWrap === "on"}
                    onChange={(e) => setSettings({ ...settings, wordWrap: e.target.checked ? "on" : "off" })}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Minimap toggle */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px]">បង្ហាញ Minimap</span>
                  <input 
                    type="checkbox" 
                    checked={settings.minimap}
                    onChange={(e) => setSettings({ ...settings, minimap: e.target.checked })}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Auto Run */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px]">ដំណើរការកូដស្វ័យប្រវត្តិ</span>
                  <input 
                    type="checkbox" 
                    checked={settings.autoRun}
                    onChange={(e) => setSettings({ ...settings, autoRun: e.target.checked })}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Help button */}
        <button
          onClick={onOpenHelp}
          title="ជំនួយ និងមេរៀន"
          className={`p-2 rounded-lg transition duration-150 ${
            settings.theme === "vs-dark" ? "hover:bg-slate-800 text-slate-300" : "hover:bg-slate-100 text-slate-600"
          }`}
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
