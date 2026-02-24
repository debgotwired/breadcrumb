'use client';

import { useState, useRef, useEffect } from 'react';

interface ExportButtonProps {
  onExportJSON: () => void;
  onExportMarkdown: () => void;
  disabled?: boolean;
}

export function ExportButton({ onExportJSON, onExportMarkdown, disabled }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 text-[#e5e5e5] hover:text-white border border-[#262626] hover:border-[#404040] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Export
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#141414] border border-[#262626] rounded-lg shadow-xl z-10 overflow-hidden">
          <button
            onClick={() => {
              onExportJSON();
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-[#e5e5e5] hover:bg-[#262626] transition-colors flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            Export as JSON
          </button>
          <button
            onClick={() => {
              onExportMarkdown();
              setIsOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-[#e5e5e5] hover:bg-[#262626] transition-colors flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Export as Markdown
          </button>
        </div>
      )}
    </div>
  );
}
