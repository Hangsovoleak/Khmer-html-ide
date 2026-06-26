/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { 
  Play, 
  RefreshCw, 
  Code, 
  Network, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown 
} from "lucide-react";
import { EditorSettings, ConsoleLog } from "../types";
import { parseDOMTree, DOMNode } from "../khmerHtml";

interface RightPanelProps {
  settings: EditorSettings;
  khmerCode: string;
  standardHtml: string;
  logs: ConsoleLog[];
  setLogs: React.Dispatch<React.SetStateAction<ConsoleLog[]>>;
}

export default function RightPanel({
  settings,
  khmerCode,
  standardHtml,
  logs,
  setLogs
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "html" | "dom">("preview");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Synchronize Live Preview IFrame
  useEffect(() => {
    if (activeTab !== "preview" && !settings.autoRun) return;

    const timeoutId = setTimeout(() => {
      updateIframe();
    }, 400); // Debounce iframe rendering slightly to keep UI fluid

    return () => clearTimeout(timeoutId);
  }, [standardHtml, activeTab]);

  const updateIframe = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) return;

      // Extract title and body contents or compile entire translated HTML
      // We will inject Tailwind CSS CDN to enable styling and beautiful components
      const hasHtmlWrapper = standardHtml.includes("<html") || standardHtml.includes("html>");
      
      let iframeContent = "";
      if (hasHtmlWrapper) {
        // Inject Tailwind CSS CDN inside the translated code's head
        if (standardHtml.includes("<head>")) {
          iframeContent = standardHtml.replace(
            "<head>",
            `<head>
              <meta charset="UTF-8">
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { font-family: 'Noto Sans Khmer', system-ui, sans-serif; background-color: #f8fafc; }
              </style>`
          );
        } else {
          iframeContent = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  body { font-family: 'Noto Sans Khmer', system-ui, sans-serif; background-color: #f8fafc; }
                </style>
              </head>
              <body>
                ${standardHtml}
              </body>
            </html>
          `;
        }
      } else {
        iframeContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                body { font-family: 'Noto Sans Khmer', system-ui, sans-serif; background-color: #f8fafc; padding: 1.5rem; }
              </style>
            </head>
            <body class="bg-slate-50 min-h-screen">
              ${standardHtml}
            </body>
          </html>
        `;
      }

      doc.open();
      doc.write(iframeContent);
      doc.close();

      // Log success to bottom console
      const newLog: ConsoleLog = {
        timestamp: new Date().toLocaleTimeString(),
        type: "success",
        message: "Live Preview បានអាប់ដេតដោយជោគជ័យ។"
      };
      // Only append if last log message is different to avoid crowding
      setLogs((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].message === newLog.message) {
          return prev;
        }
        return [...prev, newLog];
      });

    } catch (err: any) {
      console.error("IFrame Render Error:", err);
      setLogs((prev) => [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          type: "error",
          message: `Live Preview Error: ${err.message}`
        }
      ]);
    }
  };

  const handleCopyStandardHtml = () => {
    navigator.clipboard.writeText(standardHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  // Render DOM Tree recursively
  const domTreeNodes = parseDOMTree(khmerCode);

  const toggleNodeCollapse = (path: string) => {
    setCollapsedNodes((prev) => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const renderDOMNode = (node: DOMNode, path: string = "root", depth: number = 0) => {
    const nodePath = `${path}-${node.name}-${depth}`;
    const isCollapsed = collapsedNodes[nodePath];
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={nodePath} className="pl-4 select-none">
        <div className="flex items-center py-1 group">
          {hasChildren ? (
            <button 
              onClick={() => toggleNodeCollapse(nodePath)}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
            >
              {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          ) : (
            <div className="w-5" />
          )}

          <div className="flex items-center space-x-2">
            <span className={`font-mono text-xs font-bold ${
              node.isKhmer ? "text-blue-400" : "text-indigo-400"
            }`}>
              {node.name}
            </span>
            {node.isKhmer && (
              <span className="text-[9px] bg-blue-500/10 text-blue-400 px-1.5 py-0.2 rounded font-sans uppercase font-bold">
                Khmer Tag
              </span>
            )}
          </div>
        </div>

        {hasChildren && !isCollapsed && (
          <div className="border-l border-slate-800 ml-3.5 pl-1">
            {node.children.map((child, idx) => renderDOMNode(child, `${nodePath}-${idx}`, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Device size mapping for responsive frames
  const deviceWidths = {
    desktop: "w-full",
    tablet: "w-[768px] border-x shadow-2xl",
    mobile: "w-[375px] border-x shadow-2xl"
  };

  return (
    <div className={`flex flex-col h-full transition-colors duration-200 ${
      settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800" : "bg-white border-slate-200"
    }`}>
      {/* 1. Header tabs */}
      <div className={`flex items-center justify-between border-b px-4 h-12 ${
        settings.theme === "vs-dark" ? "bg-[#0F1117] border-gray-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex space-x-1">
          {/* Tab buttons */}
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
              activeTab === "preview"
                ? "bg-blue-600 text-white font-bold"
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Live Preview</span>
          </button>

          <button
            onClick={() => setActiveTab("html")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
              activeTab === "html"
                ? "bg-blue-600 text-white font-bold"
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Standard HTML</span>
          </button>

          <button
            onClick={() => setActiveTab("dom")}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
              activeTab === "dom"
                ? "bg-blue-600 text-white font-bold"
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            <span>DOM Tree</span>
          </button>
        </div>

        {/* Live Controls based on active tab */}
        {activeTab === "preview" && (
          <div className="flex items-center space-x-2.5">
            {/* Device simulators */}
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg p-0.5 space-x-0.5">
              <button
                onClick={() => setPreviewDevice("desktop")}
                title="កុំព្យូទ័រ (Desktop View)"
                className={`p-1 rounded transition ${previewDevice === "desktop" ? "bg-blue-600 text-white font-bold shadow-sm" : "text-slate-400 hover:text-slate-100"}`}
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice("tablet")}
                title="Tablet"
                className={`p-1 rounded transition ${previewDevice === "tablet" ? "bg-blue-600 text-white font-bold shadow-sm" : "text-slate-400 hover:text-slate-100"}`}
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice("mobile")}
                title="ទូរស័ព្ទ (Mobile View)"
                className={`p-1 rounded transition ${previewDevice === "mobile" ? "bg-blue-600 text-white font-bold shadow-sm" : "text-slate-400 hover:text-slate-100"}`}
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Manual refresh */}
            <button
              onClick={updateIframe}
              title="អាប់ដេតឡើងវិញ (Refresh Preview)"
              className={`p-1.5 rounded-lg border transition ${
                settings.theme === "vs-dark" ? "border-gray-800 hover:bg-slate-800 text-slate-300" : "border-slate-300 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {activeTab === "html" && (
          <button
            onClick={handleCopyStandardHtml}
            className="flex items-center space-x-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-lg text-xs transition font-medium"
          >
            {copiedHtml ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>បានចម្លង!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>ចម្លង HTML</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* 2. Main Tab Body */}
      <div className="flex-1 overflow-hidden relative flex justify-center bg-slate-100 dark:bg-[#0F1117]">
        
        {/* VIEW 1: LIVE PREVIEW */}
        {activeTab === "preview" && (
          <div className="w-full h-full flex justify-center items-center overflow-auto p-4">
            <iframe
              ref={iframeRef}
              title="Live KhmerHTML Preview"
              className={`h-full bg-white transition-all duration-300 rounded-xl border border-slate-200 dark:border-gray-800 shadow-xl ${
                deviceWidths[previewDevice]
              }`}
            />
          </div>
        )}

        {/* VIEW 2: STANDARD HTML CODES */}
        {activeTab === "html" && (
          <div className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex-1">
              <MonacoEditor
                height="100%"
                language="html"
                theme={settings.theme}
                value={standardHtml}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: settings.fontSize,
                  fontFamily: settings.fontFamily,
                  wordWrap: settings.wordWrap,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
            {/* Real-time sync banner */}
            <div className={`p-2 px-4 border-t text-[10px] font-mono flex items-center justify-between ${
              settings.theme === "vs-dark" ? "bg-[#0F1117] border-gray-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"
            }`}>
              <span>អាប់ដេតស្វ័យប្រវត្តក្នុង real-time</span>
              <span className="text-green-500 font-bold">● ACTIVE</span>
            </div>
          </div>
        )}

        {/* VIEW 3: DOM TREE */}
        {activeTab === "dom" && (
          <div className="w-full h-full p-6 overflow-y-auto">
            <div className={`max-w-md mx-auto p-5 rounded-2xl border ${
              settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800 text-slate-100" : "bg-white border-slate-200 text-slate-800"
            }`}>
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center space-x-1.5">
                <Network className="h-4 w-4" />
                <span>រចនាសម្ព័ន្ធឯកសារ (DOM Tree Hierachy)</span>
              </h3>
              
              <div className="space-y-1">
                {domTreeNodes.length > 0 ? (
                  domTreeNodes.map((node, idx) => renderDOMNode(node, `dom-${idx}`))
                ) : (
                  <div className="text-center py-10 text-xs text-slate-400">
                    មិនទាន់មានស្លាកកូដត្រូវបង្ហាញនៅឡើយទេ។ ចូរសរសេរកូដដើម្បីមើលរចនាសម្ព័ន្ធ។
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
