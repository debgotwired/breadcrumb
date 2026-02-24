'use client';

import { Decision } from '@/lib/types';

interface DecisionCardProps {
  decision: Decision;
  onDelete: (id: string) => void;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase();
}

export function DecisionCard({ decision, onDelete }: DecisionCardProps) {
  return (
    <div className="group bg-[#141414] rounded-lg p-5 border border-[#262626] hover:border-[#404040] transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-[#6b7280] mb-2">
            <span>{formatDate(decision.createdAt)}</span>
            <span>·</span>
            <span>{formatTime(decision.createdAt)}</span>
          </div>

          <p className="text-[#e5e5e5] font-medium mb-3 leading-relaxed">
            {decision.decision}
          </p>

          {decision.context && (
            <>
              <div className="border-t border-[#262626] my-3" />
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                {decision.context}
              </p>
            </>
          )}
        </div>

        <button
          onClick={() => onDelete(decision.id)}
          className="opacity-0 group-hover:opacity-100 text-[#6b7280] hover:text-[#ef4444] transition-all p-1"
          aria-label="Delete decision"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
