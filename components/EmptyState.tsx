'use client';

interface EmptyStateProps {
  hasSearchQuery?: boolean;
}

export function EmptyState({ hasSearchQuery }: EmptyStateProps) {
  if (hasSearchQuery) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-[#e5e5e5] font-medium mb-2">No matches found</h3>
        <p className="text-[#6b7280] text-sm">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-4">🍞</div>
      <h3 className="text-[#e5e5e5] font-medium mb-2">No decisions yet</h3>
      <p className="text-[#6b7280] text-sm">
        Drop your first crumb above
      </p>
    </div>
  );
}
