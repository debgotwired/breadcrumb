'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDecisions } from '@/hooks/useDecisions';
import { DecisionForm } from '@/components/DecisionForm';
import { DecisionList } from '@/components/DecisionList';
import { SearchBar } from '@/components/SearchBar';
import { ExportButton } from '@/components/ExportButton';
import { EmptyState } from '@/components/EmptyState';

export default function AppPage() {
  const {
    decisions,
    isLoaded,
    addDecision,
    deleteDecision,
    searchDecisions,
    exportAsJSON,
    exportAsMarkdown,
  } = useDecisions();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredDecisions = searchDecisions(searchQuery);
  const hasDecisions = decisions.length > 0;
  const hasResults = filteredDecisions.length > 0;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#6b7280]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[#262626] sticky top-0 bg-[#0a0a0a] z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-medium hover:opacity-80 transition-opacity">
            <span>🍞</span>
            <span>breadcrumb</span>
          </Link>
          <ExportButton
            onExportJSON={exportAsJSON}
            onExportMarkdown={exportAsMarkdown}
            disabled={!hasDecisions}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
        <div className="space-y-6">
          {/* Decision Form */}
          <DecisionForm onSubmit={addDecision} />

          {/* Search (only show if there are decisions) */}
          {hasDecisions && (
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          )}

          {/* Decision List or Empty State */}
          {hasResults ? (
            <DecisionList decisions={filteredDecisions} onDelete={deleteDecision} />
          ) : (
            <EmptyState hasSearchQuery={!!searchQuery} />
          )}
        </div>
      </main>
    </div>
  );
}
