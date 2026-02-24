import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDecisions } from '@/hooks/useDecisions';

describe('useDecisions', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty decisions', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    expect(result.current.decisions).toEqual([]);
  });

  it('should add a decision', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    act(() => {
      result.current.addDecision('Test decision', 'Test context');
    });

    expect(result.current.decisions).toHaveLength(1);
    expect(result.current.decisions[0].decision).toBe('Test decision');
    expect(result.current.decisions[0].context).toBe('Test context');
    expect(result.current.decisions[0].id).toBeDefined();
    expect(result.current.decisions[0].createdAt).toBeDefined();
  });

  it('should delete a decision', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    act(() => {
      result.current.addDecision('Decision 1', 'Context 1');
      result.current.addDecision('Decision 2', 'Context 2');
    });

    expect(result.current.decisions).toHaveLength(2);

    const idToDelete = result.current.decisions[0].id;
    act(() => {
      result.current.deleteDecision(idToDelete);
    });

    expect(result.current.decisions).toHaveLength(1);
    expect(result.current.decisions[0].decision).toBe('Decision 1');
  });

  it('should search decisions by decision text', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    act(() => {
      result.current.addDecision('Use Postgres', 'Better JSON support');
      result.current.addDecision('Use Redis', 'For caching');
    });

    const filtered = result.current.searchDecisions('postgres');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].decision).toBe('Use Postgres');
  });

  it('should search decisions by context', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    act(() => {
      result.current.addDecision('Use Postgres', 'Better JSON support');
      result.current.addDecision('Use Redis', 'For caching');
    });

    const filtered = result.current.searchDecisions('json');
    expect(filtered).toHaveLength(1);
    expect(filtered[0].decision).toBe('Use Postgres');
  });

  it('should return all decisions when search is empty', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    act(() => {
      result.current.addDecision('Decision 1', 'Context 1');
      result.current.addDecision('Decision 2', 'Context 2');
    });

    const filtered = result.current.searchDecisions('');
    expect(filtered).toHaveLength(2);
  });

  it('should persist decisions to localStorage', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    act(() => {
      result.current.addDecision('Test decision', 'Test context');
    });

    // Wait for the localStorage effect to run
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    const stored = localStorage.getItem('breadcrumb-decisions');
    expect(stored).toBeDefined();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].decision).toBe('Test decision');
  });

  it('should load decisions from localStorage', async () => {
    const existingDecisions = [
      {
        id: 'existing-1',
        decision: 'Existing decision',
        context: 'Existing context',
        createdAt: Date.now(),
      },
    ];
    localStorage.setItem('breadcrumb-decisions', JSON.stringify(existingDecisions));

    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    expect(result.current.decisions).toHaveLength(1);
    expect(result.current.decisions[0].decision).toBe('Existing decision');
  });

  it('should handle malformed localStorage data', async () => {
    localStorage.setItem('breadcrumb-decisions', 'not valid json');

    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    expect(result.current.decisions).toEqual([]);
  });

  it('should add decisions in reverse chronological order', async () => {
    const { result } = renderHook(() => useDecisions());

    await waitFor(() => {
      expect(result.current.isLoaded).toBe(true);
    });

    act(() => {
      result.current.addDecision('First', 'Context 1');
    });

    await new Promise((resolve) => setTimeout(resolve, 10));

    act(() => {
      result.current.addDecision('Second', 'Context 2');
    });

    expect(result.current.decisions[0].decision).toBe('Second');
    expect(result.current.decisions[1].decision).toBe('First');
  });
});
