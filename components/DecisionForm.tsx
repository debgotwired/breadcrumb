'use client';

import { useState, useRef, useEffect } from 'react';

interface DecisionFormProps {
  onSubmit: (decision: string, context: string) => void;
}

export function DecisionForm({ onSubmit }: DecisionFormProps) {
  const [decision, setDecision] = useState('');
  const [context, setContext] = useState('');
  const decisionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    decisionRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision.trim()) return;

    onSubmit(decision.trim(), context.trim());
    setDecision('');
    setContext('');
    decisionRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#141414] rounded-lg p-6 border border-[#262626]">
      <div className="space-y-4">
        <div>
          <label htmlFor="decision" className="block text-sm text-[#6b7280] mb-2">
            What did you decide?
          </label>
          <textarea
            ref={decisionRef}
            id="decision"
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="We're going with Postgres over MySQL..."
            className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#e5e5e5] placeholder-[#4b5563] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent resize-none"
            rows={2}
          />
        </div>

        <div>
          <label htmlFor="context" className="block text-sm text-[#6b7280] mb-2">
            Why?
          </label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Better JSON support, team already knows it..."
            className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#e5e5e5] placeholder-[#4b5563] focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent resize-none"
            rows={3}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!decision.trim()}
            className="bg-[#f59e0b] hover:bg-[#d97706] disabled:bg-[#4b5563] disabled:cursor-not-allowed text-black font-medium px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
          >
            Drop crumb
            <span className="text-xs opacity-70">⌘↵</span>
          </button>
        </div>
      </div>
    </form>
  );
}
