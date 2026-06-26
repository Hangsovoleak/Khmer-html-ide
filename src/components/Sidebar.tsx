/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Folder, 
  BookOpen, 
  Award, 
  Layout, 
  Search, 
  ChevronRight, 
  Book, 
  File, 
  HelpCircle, 
  Sparkles, 
  ListChecks, 
  Play, 
  Info,
  ChevronDown,
  ExternalLink,
  ThumbsUp,
  XCircle,
  AlertCircle
} from "lucide-react";
import { 
  TAG_DOCS, 
  STARTER_TEMPLATES, 
  EXERCISES, 
  StarterTemplate, 
  Exercise, 
  TagInfo 
} from "../khmerHtml";
import { EditorSettings } from "../types";

interface SidebarProps {
  settings: EditorSettings;
  currentFile: string;
  setCurrentFile: (name: string) => void;
  onSelectTemplate: (template: StarterTemplate) => void;
  onSelectExercise: (exercise: Exercise) => void;
  code: string;
  validationErrors: any[];
  onValidateExercise: () => void;
  exerciseStatus: "idle" | "success" | "error";
  exerciseFeedback: string;
}

export default function Sidebar({
  settings,
  currentFile,
  setCurrentFile,
  onSelectTemplate,
  onSelectExercise,
  code,
  validationErrors,
  onValidateExercise,
  exerciseStatus,
  exerciseFeedback
}: SidebarProps) {
  // Activity bar state
  const [activeTab, setActiveTab] = useState<"explorer" | "learning" | "exercises" | "templates" | "search">("learning");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<TagInfo | null>(null);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  // Lesson states
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  const lessons = [
    {
      id: 1,
      title: "មេរៀនទី ១៖ គ្រោងឆ្អឹងគេហទំព័រដំបូង",
      description: "រៀនពីស្លាកគ្រឹះបង្គោលសម្រាប់បង្កើតគេហទំព័រ រួមមាន <ទំព័រ>, <ក្បាល> និង <តួសេចក្តី>។",
      tags: ["ទំព័រ", "ក្បាល", "ចំណងជើងទំព័រ", "តួសេចក្តី"],
      content: `ដើម្បីបង្កើតគេហទំព័រមួយឡើង អ្នកត្រូវការរៀបចំរចនាសម្ព័ន្ធរបស់វាជាមុនសិន។ នៅក្នុងភាសាខ្មែរ យើងប្រើស្លាកដូចខាងក្រោម៖\n\n1. **<ទំព័រ>** (<html>) : ស្លាកធំបំផុតសម្រាប់ព័ទ្ធកូដទាំងអស់។\n2. **<ក្បាល>** (<head>) : ផ្នែកក្បាលសម្រាប់ផ្ទុកទិន្នន័យបច្ចេកទេស និងចំណងជើង Tab។\n3. **<ចំណងជើងទំព័រ>** (<title>) : សម្រាប់កំណត់ឈ្មោះគេហទំព័រដែលលេចឡើងលើ Tab កម្មវិធីរុករក។\n4. **<តួសេចក្តី>** (<body>) : ផ្នែកតួខ្លួនសម្រាប់ដាក់រាល់មាតិកាបង្ហាញរូបរាង (រូបភាព អក្សរ វីដេអូ)។`
    },
    {
      id: 2,
      title: "មេរៀនទី ២៖ ការសរសេរអត្ថបទ និងល្បះ",
      description: "រៀនប្រើស្លាកចំណងជើងធំ ចំណងជើងរង និងល្បះអត្ថបទធម្មតា។",
      tags: ["ចំណងជើងធំ", "ចំណងជើងរង", "ល្បះ", "ចុះបន្ទាត់", "បន្ទាត់កាត់", "អក្សរដិត", "អក្សរទ្រេត"],
      content: `ការបង្ហាញអត្ថបទលើគេហទំព័រមានទម្រង់ផ្សេងៗគ្នា៖\n\n- **<ចំណងជើងធំ>** (<h1>) : ចំណងជើងសំខាន់បំផុត គួរមានតែមួយក្នុងមួយទំព័រ។\n- **<ចំណងជើងរង>** (<h2>) : ចំណងជើងផ្នែករងបន្ទាប់ពីចំណងជើងធំ។\n- **<ល្បះ>** (<p>) : កថាខណ្ឌអត្ថបទធម្មតា។\n- **<ចុះបន្ទាត់ />** (<br>) : បញ្ជាឱ្យចុះបន្ទាត់។\n- **<អក្សរដិត>** (<strong>) : ធ្វើឱ្យអក្សរដិត និងសំខាន់។\n- **<អក្សរទ្រេត>** (<em>) : ធ្វើឱ្យអក្សរទ្រេតបញ្ជាក់ការសង្កត់ធ្ងន់។`
    },
    {
      id: 3,
      title: "មេរៀនទី ៣៖ ការប្រើប្រាស់រូបភាព និងតំណភ្ជាប់",
      description: "ស្វែងយល់ពីរបៀបរៀបចំរូបភាព និងបង្កើតតំណភ្ជាប់ឆ្ពោះទៅគេហទំព័រដទៃ។",
      tags: ["តំណភ្ជាប់", "រូបភាព", "វីដេអូ", "សំឡេង"],
      content: `គេហទំព័រទំនើបតែងតែមានប្រព័ន្ធផ្សព្វផ្សាយ និងតំណភ្ជាប់៖\n\n- **<រូបភាព />** (<img>) : បង្ហាញរូបភាពដោយប្រើគុណលក្ខណៈ **ប្រភព** (src) និង **ជំនួស** (alt)។\n- **<តំណភ្ជាប់>** (<a>) : ភ្ជាប់ទៅគេហទំព័រផ្សេងដោយប្រើគុណលក្ខណៈ **អាសយដ្ឋាន** (href)។`
    },
    {
      id: 4,
      title: "មេរៀនទី ៤៖ តារាង និងបញ្ជីរាយនាម",
      description: "រៀបចំទិន្នន័យជាជួរដេក ជួរឈរ និងបញ្ជីចំនុចមូលយ៉ាងមានរបៀប។",
      tags: ["បញ្ជីគ្មានលំដាប់", "បញ្ជីមានលំដាប់", "ធាតុបញ្ជី", "តារាង", "ជួរដេក", "ក្បាលតារាង", "ទិន្នន័យតារាង"],
      content: `ការរៀបចំទិន្នន័យ៖\n\n- **<បញ្ជីគ្មានលំដាប់>** (<ul>) : បញ្ជីរាយនាមចំណុចមូល។\n- **<បញ្ជីមានលំដាប់>** (<ol>) : បញ្ជីរាយនាមរៀបតាមលេខ ១, ២, ៣។\n- **<ធាតុបញ្ជី>** (<li>) : ធាតុនីមួយៗក្នុងបញ្ជី។\n- **<តារាង>** (<table>) : បង្ហាញជាតារាង រួមមាន **<ជួរដេក>** (<tr>), **<ក្បាលតារាង>** (<th>) និង **<ទិន្នន័យតារាង>** (<td>)។`
    }
  ];

  // Filtering tags based on search query
  const filteredTags = Object.entries(TAG_DOCS).filter(([name, info]) => {
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      info.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      info.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSelectExercise = (ex: Exercise) => {
    setActiveExercise(ex);
    onSelectExercise(ex);
  };

  return (
    <div className={`flex h-full transition-colors duration-200 ${
      settings.theme === "vs-dark" ? "bg-[#0F1117] text-slate-100" : "bg-slate-50 text-slate-800"
    }`}>
      {/* 1. Far Left Activity Bar */}
      <div className={`flex w-16 flex-col items-center justify-between border-r py-4 ${
        settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800" : "bg-slate-100 border-slate-200"
      }`}>
        <div className="flex flex-col items-center space-y-4">
          {/* Explorer Tab */}
          <button
            onClick={() => setActiveTab("explorer")}
            title="Explorer (ឯកសារ)"
            className={`p-3 rounded-xl transition-all relative ${
              activeTab === "explorer" 
                ? "bg-blue-600 text-white shadow-md" 
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100 hover:bg-[#2D2D44]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Folder className="h-5 w-5" />
          </button>

          {/* Learning Tab */}
          <button
            onClick={() => setActiveTab("learning")}
            title="Learning Center (មេរៀន & ស្លាក)"
            className={`p-3 rounded-xl transition-all relative ${
              activeTab === "learning" 
                ? "bg-blue-600 text-white shadow-md" 
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100 hover:bg-[#2D2D44]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <BookOpen className="h-5 w-5" />
          </button>

          {/* Exercises Tab */}
          <button
            onClick={() => setActiveTab("exercises")}
            title="Exercises (លំហាត់កូដ)"
            className={`p-3 rounded-xl transition-all relative ${
              activeTab === "exercises" 
                ? "bg-blue-600 text-white shadow-md" 
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100 hover:bg-[#2D2D44]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Award className="h-5 w-5" />
            {exerciseStatus === "success" && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            )}
          </button>

          {/* Templates Tab */}
          <button
            onClick={() => setActiveTab("templates")}
            title="Templates (គំរូកូដ)"
            className={`p-3 rounded-xl transition-all relative ${
              activeTab === "templates" 
                ? "bg-blue-600 text-white shadow-md" 
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100 hover:bg-[#2D2D44]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Layout className="h-5 w-5" />
          </button>

          {/* Search Tab */}
          <button
            onClick={() => setActiveTab("search")}
            title="Search (ស្វែងរកស្លាក)"
            className={`p-3 rounded-xl transition-all relative ${
              activeTab === "search" 
                ? "bg-blue-600 text-white shadow-md" 
                : settings.theme === "vs-dark" ? "text-slate-400 hover:text-slate-100 hover:bg-[#2D2D44]" : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
            }`}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Info or system icon */}
        <div className="flex flex-col items-center">
          <HelpCircle className="h-5 w-5 text-slate-500" />
        </div>
      </div>

      {/* 2. Main Sidebar Content Pane */}
      <div className={`flex w-72 flex-col border-r h-full overflow-hidden ${
        settings.theme === "vs-dark" ? "border-gray-800 bg-[#0F1117]" : "border-slate-200 bg-white"
      }`}>
        
        {/* TAB 1: EXPLORER */}
        {activeTab === "explorer" && (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">Explorer</h2>
            </div>
            <div className="p-2 space-y-1 overflow-y-auto flex-1">
              {/* Files */}
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">ឯកសារការងារ</div>
              
              <button 
                onClick={() => setCurrentFile("index.khhtml")}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors duration-150 ${
                  currentFile === "index.khhtml" 
                    ? "bg-blue-500/10 text-blue-400" 
                    : settings.theme === "vs-dark" ? "hover:bg-[#1E1E2E] text-slate-300" : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <File className="h-4 w-4 text-blue-400" />
                <span>index.khhtml</span>
              </button>

              <button 
                onClick={() => setCurrentFile("style.css")}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors duration-150 opacity-50 cursor-not-allowed ${
                  currentFile === "style.css" 
                    ? "bg-blue-500/10 text-blue-400" 
                    : settings.theme === "vs-dark" ? "hover:bg-[#1E1E2E] text-slate-300" : "hover:bg-slate-100 text-slate-700"
                }`}
                disabled
              >
                <File className="h-4 w-4 text-blue-500" />
                <span className="flex-1">style.css</span>
                <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-1 py-0.5 rounded">ជាប់សោ</span>
              </button>

              <button 
                onClick={() => setCurrentFile("script.js")}
                className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors duration-150 opacity-50 cursor-not-allowed ${
                  currentFile === "script.js" 
                    ? "bg-blue-500/10 text-blue-400" 
                    : settings.theme === "vs-dark" ? "hover:bg-[#1E1E2E] text-slate-300" : "hover:bg-slate-100 text-slate-700"
                }`}
                disabled
              >
                <File className="h-4 w-4 text-purple-500" />
                <span className="flex-1">script.js</span>
                <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-500 px-1 py-0.5 rounded">ជាប់សោ</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: LEARNING CENTER */}
        {activeTab === "learning" && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span>Learning Center</span>
              </h2>
            </div>

            {/* Sub-Tabs: Lessons vs Tag Library */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedTag ? (
                // Selected tag "Learning Mode" card
                <div className="space-y-4">
                  <button 
                    onClick={() => setSelectedTag(null)}
                    className="text-xs font-bold text-blue-400 hover:underline flex items-center space-x-1"
                  >
                    <span>← ត្រឡប់ក្រោយ</span>
                  </button>
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <h3 className="text-lg font-bold text-blue-400 flex items-center justify-between">
                      <span>&lt;{selectedTag.khmer}&gt;</span>
                      <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-mono">{selectedTag.standard}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{selectedTag.category}</p>
                    
                    <div className="mt-3 space-y-2.5 text-xs">
                      <div>
                        <span className="font-bold text-blue-400 block">គោលបំណង៖</span>
                        <p className="text-slate-300 dark:text-slate-300 leading-relaxed">{selectedTag.purpose}</p>
                      </div>

                      <div>
                        <span className="font-bold text-blue-400 block">ទម្រង់សរសេរ (Syntax)៖</span>
                        <pre className="bg-[#181825] text-slate-200 p-2 rounded-lg font-mono text-[10px] mt-1 overflow-x-auto">
                          {selectedTag.syntax}
                        </pre>
                      </div>

                      <div>
                        <span className="font-bold text-blue-400 block">ឧទាហរណ៍៖</span>
                        <pre className="bg-[#181825] text-slate-200 p-2 rounded-lg font-mono text-[10px] mt-1 overflow-x-auto">
                          {selectedTag.example}
                        </pre>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <span className="font-bold text-red-400 flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>កំហុសឆ្គងទូទៅ៖</span>
                        </span>
                        <p className="text-slate-300 dark:text-slate-400 italic mt-0.5">{selectedTag.mistakes}</p>
                      </div>

                      <div>
                        <span className="font-bold text-green-400 flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>ការអនុវត្តល្អបំផុត៖</span>
                        </span>
                        <p className="text-slate-300 dark:text-slate-400 mt-0.5">{selectedTag.practices}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Default view: Lessons List and Tag Library List
                <div className="space-y-6">
                  {/* Lessons section */}
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center space-x-1">
                      <Book className="h-3.5 w-3.5" />
                      <span>មេរៀនសរសេរកូដ HTML ខ្មែរ</span>
                    </h3>
                    <div className="space-y-2">
                      {lessons.map((lesson) => (
                        <div key={lesson.id} className={`border rounded-xl p-3 transition-all ${
                          selectedLesson === lesson.id 
                            ? "border-blue-500 bg-blue-500/5" 
                            : settings.theme === "vs-dark" ? "border-gray-800 bg-[#1E1E2E]/40 hover:bg-[#1E1E2E]" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                        }`}>
                          <button 
                            onClick={() => setSelectedLesson(selectedLesson === lesson.id ? null : lesson.id)}
                            className="w-full flex items-center justify-between font-bold text-xs text-left"
                          >
                            <span className={selectedLesson === lesson.id ? "text-blue-400" : ""}>{lesson.title}</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${selectedLesson === lesson.id ? "rotate-180 text-blue-400" : "text-slate-400"}`} />
                          </button>
                          
                          {selectedLesson === lesson.id && (
                            <div className="mt-2 text-xs text-slate-300 dark:text-slate-300 space-y-3 pt-2 border-t border-slate-200 dark:border-gray-800">
                              <p className="leading-relaxed whitespace-pre-line">{lesson.content}</p>
                              
                              <div className="pt-2">
                                <span className="font-bold text-blue-400 block mb-1.5">ស្លាកពាក់ព័ន្ធ៖</span>
                                <div className="flex flex-wrap gap-1.5">
                                  {lesson.tags.map((tag) => (
                                    <button
                                      key={tag}
                                      onClick={() => setSelectedTag(TAG_DOCS[tag])}
                                      className="text-[10px] bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md border border-blue-500/20 font-bold transition-colors"
                                    >
                                      &lt;{tag}&gt;
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tag Quick Library */}
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center space-x-1">
                      <ListChecks className="h-3.5 w-3.5" />
                      <span>បណ្ណាល័យស្លាកខ្មែរ (Tag Library)</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-1.5">
                      {Object.entries(TAG_DOCS).map(([tagName, info]) => (
                        <button
                          key={tagName}
                          onClick={() => setSelectedTag(info)}
                          className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                            settings.theme === "vs-dark" 
                              ? "border-gray-800 bg-[#1E1E2E]/40 hover:bg-blue-500/10 hover:border-blue-500/30" 
                              : "border-slate-200 bg-slate-50 hover:bg-blue-50/5 hover:border-blue-500/20"
                          }`}
                        >
                          <span className="font-bold text-xs text-blue-400">&lt;{tagName}&gt;</span>
                          <span className="text-[9px] text-slate-400 font-mono mt-0.5">HTML: &lt;{info.standard}&gt;</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE EXERCISES */}
        {activeTab === "exercises" && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase flex items-center space-x-2">
                <Award className="h-4 w-4 text-blue-400" />
                <span>លំហាត់សរសេរកូដ</span>
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeExercise ? (
                // Selected Exercise Details
                <div className="space-y-4">
                  <button 
                    onClick={() => {
                      setActiveExercise(null);
                    }}
                    className="text-xs font-bold text-blue-400 hover:underline flex items-center space-x-1"
                  >
                    <span>← ត្រឡប់ទៅបញ្ជីលំហាត់</span>
                  </button>

                  <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 space-y-3">
                    <h3 className="font-bold text-sm text-blue-400">{activeExercise.title}</h3>
                    <p className="text-xs text-slate-300 dark:text-slate-300">{activeExercise.description}</p>
                    
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest block">ការណែនាំ៖</span>
                      <ul className="text-xs text-slate-300 dark:text-slate-300 list-decimal pl-4 space-y-1">
                        {activeExercise.instructions.map((inst, idx) => (
                           <li key={idx}>{inst}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Validate Button */}
                    <div className="pt-2 space-y-2">
                      <button
                        onClick={onValidateExercise}
                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow transition"
                      >
                        <ListChecks className="h-4 w-4" />
                        <span>ផ្ទៀងផ្ទាត់កូដរបស់ខ្ញុំ</span>
                      </button>

                      {/* Feedback State */}
                      {exerciseStatus === "success" && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-xs flex items-start space-x-2">
                          <ThumbsUp className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">អបអរសាទរ! ល្អណាស់</span>
                            <span>អ្នកបានសម្រេចលំហាត់នេះដោយជោគជ័យ!</span>
                          </div>
                        </div>
                      )}

                      {exerciseStatus === "error" && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs flex items-start space-x-2">
                          <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">មិនទាន់ត្រឹមត្រូវទេ៖</span>
                            <span>{exerciseFeedback}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                // Exercises List
                <div className="space-y-3">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    អនុវត្តសមត្ថភាពសរសេរកូដ KhmerHTML របស់អ្នកជាមួយលំហាត់សាមញ្ញៗ៖
                  </p>
                  
                  {EXERCISES.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => handleSelectExercise(ex)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all ${
                        settings.theme === "vs-dark" 
                          ? "border-gray-800 bg-[#1E1E2E]/40 hover:bg-[#1E1E2E] hover:border-blue-500/30" 
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-500/20"
                      }`}
                    >
                      <h3 className="font-bold text-xs text-blue-400 flex items-center justify-between">
                        <span>{ex.title}</span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1">{ex.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: STARTER TEMPLATES */}
        {activeTab === "templates" && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase flex items-center space-x-2">
                <Layout className="h-4 w-4 text-blue-400" />
                <span>គំរូគេហទំព័រ (Templates)</span>
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                ជ្រើសរើសទំព័រគំរូដ៏ស្រស់ស្អាត ដើម្បីចាប់ផ្តើមជាមូលដ្ឋាន៖
              </p>
              
              {STARTER_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => onSelectTemplate(tpl)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                    settings.theme === "vs-dark" 
                      ? "border-gray-800 bg-[#1E1E2E]/40 hover:bg-[#1E1E2E] hover:border-blue-500/30" 
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-500/20"
                  }`}
                >
                  <div className="absolute top-0 right-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300" />
                  <h3 className="font-bold text-xs text-blue-400 flex items-center justify-between">
                    <span>{tpl.title}</span>
                    <span className="text-[9px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-bold uppercase">{tpl.category}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{tpl.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SEARCH */}
        {activeTab === "search" && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-gray-800">
              <h2 className="text-xs font-bold tracking-widest text-blue-400 uppercase">ស្វែងរកស្លាកកូដ</h2>
            </div>
            
            <div className="p-4 space-y-4 flex-1 overflow-hidden flex flex-col">
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="វាយបញ្ចូលស្លាកខ្មែរ ឬអង់គ្លេស..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full text-xs p-3 pl-9 rounded-xl border focus:outline-blue-500 ${
                    settings.theme === "vs-dark" ? "bg-[#1E1E2E] border-gray-800 text-slate-100" : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                />
                <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              </div>

              {/* Results */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {filteredTags.length > 0 ? (
                  filteredTags.map(([tagName, info]) => (
                    <button
                      key={tagName}
                      onClick={() => {
                        setSelectedTag(info);
                        setActiveTab("learning");
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all ${
                        settings.theme === "vs-dark" 
                          ? "border-gray-800 bg-[#1E1E2E]/40 hover:bg-[#1E1E2E] hover:border-blue-500/30" 
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-blue-500/20"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-blue-400">&lt;{tagName}&gt;</span>
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-400 font-mono px-1.5 py-0.5 rounded">&lt;{info.standard}&gt;</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{info.purpose}</p>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-10 text-xs text-slate-400">
                    រកមិនឃើញស្លាកដែលអ្នកចង់ស្វែងរកទេ។
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
