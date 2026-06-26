/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EditorSettings {
  theme: "vs-dark" | "vs-light";
  fontSize: number;
  wordWrap: "on" | "off";
  tabSize: number;
  autoSave: boolean;
  autoRun: boolean;
  minimap: boolean;
  fontFamily: "Noto Sans Khmer" | "JetBrains Mono";
}

export interface WorkspaceFile {
  name: string;
  content: string;
  language: string;
}

export interface ConsoleLog {
  timestamp: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
}
