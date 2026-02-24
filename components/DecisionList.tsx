'use client';

import { Decision } from '@/lib/types';
import { DecisionCard } from './DecisionCard';

interface DecisionListProps {
  decisions: Decision[];
  onDelete: (id: string) => void;
}

export function DecisionList({ decisions, onDelete }: DecisionListProps) {
  if (decisions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {decisions.map((decision) => (
        <DecisionCard
          key={decision.id}
          decision={decision}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
