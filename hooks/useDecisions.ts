'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Decision } from '@/lib/types';

const STORAGE_KEY = 'breadcrumb-decisions';

function getStoredDecisions(): Decision[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function useDecisions() {
  // Start with empty array (SSR-safe), populate on client
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const isFirstRender = useRef(true);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = getStoredDecisions();
    setDecisions(stored);
    setIsLoaded(true);
  }, []);

  // Persist to localStorage whenever decisions change (skip initial load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
    }
  }, [decisions, isLoaded]);

  const addDecision = useCallback((decision: string, context: string) => {
    const newDecision: Decision = {
      id: crypto.randomUUID(),
      decision,
      context,
      createdAt: Date.now(),
    };
    setDecisions((prev) => [newDecision, ...prev]);
  }, []);

  const deleteDecision = useCallback((id: string) => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const searchDecisions = useCallback(
    (query: string) => {
      if (!query.trim()) return decisions;
      const lowerQuery = query.toLowerCase();
      return decisions.filter(
        (d) =>
          d.decision.toLowerCase().includes(lowerQuery) ||
          d.context.toLowerCase().includes(lowerQuery)
      );
    },
    [decisions]
  );

  const exportAsJSON = useCallback(() => {
    const data = JSON.stringify(decisions, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breadcrumb-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [decisions]);

  const exportAsMarkdown = useCallback(() => {
    const lines = ['# Decision Log', '', `*Exported from Breadcrumb on ${new Date().toLocaleDateString()}*`, ''];

    decisions.forEach((d) => {
      const date = new Date(d.createdAt);
      lines.push(`## ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`);
      lines.push('');
      lines.push(`**Decision:** ${d.decision}`);
      lines.push('');
      lines.push(`**Context:** ${d.context}`);
      lines.push('');
      lines.push('---');
      lines.push('');
    });

    const data = lines.join('\n');
    const blob = new Blob([data], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `breadcrumb-export-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [decisions]);

  return {
    decisions,
    isLoaded,
    addDecision,
    deleteDecision,
    searchDecisions,
    exportAsJSON,
    exportAsMarkdown,
  };
}
