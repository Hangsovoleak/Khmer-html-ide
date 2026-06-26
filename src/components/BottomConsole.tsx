/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Terminal, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Trash2, 
  ChevronUp, 
  ChevronDown 
} from "lucide-react";
import { ConsoleLog, EditorSettings } from "../types";

interface BottomConsoleProps {
  settings: EditorSettings;
  logs: ConsoleLog[];
  onClearLogs: () => void;
  validationErrors: any[];
}

export default function BottomConsole({
  settings,
  logs,
  onClearLogs,
  validationErrors
}: BottomConsoleProps) {
  const [activeTab, setActiveTab] = useState<"problems" | "logs">("problems");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`flex flex-col border-t transition-all duration-200 ${
      isCollapsed ? "h-10" : "h-56"
    } ${
      settings.theme === "vs-dark" ? "bg-[#0F1117] border-gray-800 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
    }`}>
      {/* 1. Console Tabs Header */}
      <div className={`flex items-center justify-between px-4 h-10 border-b select-none ${
        settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800" : "bg-white border-slate-150"
      }`}>
        <div className="flex space-x-1">
          {/* Problems tab button */}
          <button
            onClick={() => {
              setActiveTab("problems");
              setIsCollapsed(false);
            }}
            className={`flex items-center space-x-2 px-3 py-1 text-xs font-bold transition rounded ${
              activeTab === "problems" && !isCollapsed
                ? settings.theme === "vs-dark" ? "bg-[#2D2D44] text-blue-400" : "bg-slate-200 text-blue-600"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <AlertCircle className="h-3.5 w-3.5" />
            <span>បញ្ហាប្រព័ន្ធ (Problems)</span>
            {validationErrors.length > 0 && (
              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                {validationErrors.length}
              </span>
            )}
          </button>

          {/* Logs tab button */}
          <button
            onClick={() => {
              setActiveTab("logs");
              setIsCollapsed(false);
            }}
            className={`flex items-center space-x-2 px-3 py-1 text-xs font-bold transition rounded ${
              activeTab === "logs" && !isCollapsed
                ? settings.theme === "vs-dark" ? "bg-[#2D2D44] text-blue-400" : "bg-slate-200 text-blue-600"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>កំណត់ត្រា (Logs)</span>
          </button>
        </div>

        {/* Console Action Controls */}
        <div className="flex items-center space-x-2">
          {activeTab === "logs" && (
            <button
              onClick={onClearLogs}
              title="លុបកំណត់ត្រាចេញ"
              className={`p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            {isCollapsed ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. Console Content View */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-3 font-mono text-[11px] leading-relaxed">
          
          {/* PROBLEMS VIEW */}
          {activeTab === "problems" && (
            <div className="space-y-1.5">
              {validationErrors.length > 0 ? (
                validationErrors.map((err, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-xl flex items-start space-x-3 border ${
                      err.severity === "error" 
                        ? "bg-red-500/10 border-red-500/20 text-red-500" 
                        : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {err.severity === "error" ? (
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-bold flex items-center space-x-2">
                        <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded text-[9px] uppercase">
                          បន្ទាត់ {err.line}
                        </span>
                        <span>{err.message}</span>
                      </div>
                      {err.suggestion && (
                        <div className="text-slate-400 text-[10px] mt-1">
                          👉 **សំណើជួសជុល៖** {err.suggestion}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 flex flex-col items-center justify-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <span className="font-bold text-xs text-green-500">គ្មានបញ្ហាកូដទេ!</span>
                  <span className="text-[10px]">កូដ KhmerHTML របស់អ្នកគ្មានកំហុស និងអាចដំណើរការបានយ៉ាងរលូន។</span>
                </div>
              )}
            </div>
          )}

          {/* EVENTS LOGS VIEW */}
          {activeTab === "logs" && (
            <div className="space-y-1">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <span className="text-slate-500">[{log.timestamp}]</span>
                  <span className={`font-bold uppercase text-[9px] px-1 py-0.2 rounded-md ${
                    log.type === "success" ? "bg-green-500/10 text-green-500" :
                    log.type === "error" ? "bg-red-500/10 text-red-500" :
                    log.type === "warning" ? "bg-yellow-500/10 text-yellow-500" : "bg-slate-800 text-slate-400"
                  }`}>
                    {log.type}
                  </span>
                  <span className={`${
                    log.type === "error" ? "text-red-400" :
                    log.type === "warning" ? "text-yellow-400" :
                    log.type === "success" ? "text-green-400" : "text-slate-300"
                  }`}>
                    {log.message}
                  </span>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-center py-10 text-slate-400">
                  គ្មានកំណត់ត្រាព្រឹត្តិការណ៍នៅឡើយទេ។
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
