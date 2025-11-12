"use client";

import React from "react";
import { LiveProvider, LivePreview, LiveError } from "react-live";

// React scope for live rendering
const scope = { 
  React,
  useState: React.useState,
  useEffect: React.useEffect,
  useCallback: React.useCallback,
  useMemo: React.useMemo,
  useRef: React.useRef
};

interface LessonRendererProps {
  code: string;
}

const LessonRenderer: React.FC<LessonRendererProps> = ({ code }) => {
  const cleanCode = code
    .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, "")
    .trim();

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
      <LiveProvider
        code={cleanCode}
        scope={scope}
        noInline={true}
      >
        <LiveError 
          className="bg-red-50 border border-red-200 text-red-700 p-3 sm:p-4 rounded-lg mb-3 font-mono text-xs sm:text-sm whitespace-pre-wrap"
        />

        {/* 🌈 FIXED PREVIEW AREA */}
        <div className="rounded-xl overflow-hidden shadow-inner border border-gray-300 bg-[#1a1a1a] text-white p-4 sm:p-6 min-h-[220px] transition-all duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 sm:p-6">
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
};

export default LessonRenderer;
