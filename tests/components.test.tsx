import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DecisionForm } from '@/components/DecisionForm';
import { DecisionCard } from '@/components/DecisionCard';
import { SearchBar } from '@/components/SearchBar';
import { EmptyState } from '@/components/EmptyState';
import { Decision } from '@/lib/types';

describe('DecisionForm', () => {
  it('renders the form with labels', () => {
    const onSubmit = vi.fn();
    render(<DecisionForm onSubmit={onSubmit} />);

    expect(screen.getByLabelText(/what did you decide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/why/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /drop crumb/i })).toBeInTheDocument();
  });

  it('disables submit button when decision is empty', () => {
    const onSubmit = vi.fn();
    render(<DecisionForm onSubmit={onSubmit} />);

    const submitButton = screen.getByRole('button', { name: /drop crumb/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when decision is filled', () => {
    const onSubmit = vi.fn();
    render(<DecisionForm onSubmit={onSubmit} />);

    const decisionInput = screen.getByLabelText(/what did you decide/i);
    fireEvent.change(decisionInput, { target: { value: 'Test decision' } });

    const submitButton = screen.getByRole('button', { name: /drop crumb/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onSubmit with decision and context', () => {
    const onSubmit = vi.fn();
    render(<DecisionForm onSubmit={onSubmit} />);

    const decisionInput = screen.getByLabelText(/what did you decide/i);
    const contextInput = screen.getByLabelText(/why/i);

    fireEvent.change(decisionInput, { target: { value: 'Test decision' } });
    fireEvent.change(contextInput, { target: { value: 'Test context' } });

    const submitButton = screen.getByRole('button', { name: /drop crumb/i });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('Test decision', 'Test context');
  });

  it('clears form after submission', () => {
    const onSubmit = vi.fn();
    render(<DecisionForm onSubmit={onSubmit} />);

    const decisionInput = screen.getByLabelText(/what did you decide/i) as HTMLTextAreaElement;
    const contextInput = screen.getByLabelText(/why/i) as HTMLTextAreaElement;

    fireEvent.change(decisionInput, { target: { value: 'Test decision' } });
    fireEvent.change(contextInput, { target: { value: 'Test context' } });

    const submitButton = screen.getByRole('button', { name: /drop crumb/i });
    fireEvent.click(submitButton);

    expect(decisionInput.value).toBe('');
    expect(contextInput.value).toBe('');
  });

  it('trims whitespace from inputs', () => {
    const onSubmit = vi.fn();
    render(<DecisionForm onSubmit={onSubmit} />);

    const decisionInput = screen.getByLabelText(/what did you decide/i);
    const contextInput = screen.getByLabelText(/why/i);

    fireEvent.change(decisionInput, { target: { value: '  Test decision  ' } });
    fireEvent.change(contextInput, { target: { value: '  Test context  ' } });

    const submitButton = screen.getByRole('button', { name: /drop crumb/i });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('Test decision', 'Test context');
  });
});

describe('DecisionCard', () => {
  const mockDecision: Decision = {
    id: 'test-id',
    decision: 'Use Postgres over MySQL',
    context: 'Better JSON support, team already knows it.',
    createdAt: new Date('2024-02-23T14:30:00').getTime(),
  };

  it('renders decision text', () => {
    const onDelete = vi.fn();
    render(<DecisionCard decision={mockDecision} onDelete={onDelete} />);

    expect(screen.getByText('Use Postgres over MySQL')).toBeInTheDocument();
  });

  it('renders context text', () => {
    const onDelete = vi.fn();
    render(<DecisionCard decision={mockDecision} onDelete={onDelete} />);

    expect(screen.getByText('Better JSON support, team already knows it.')).toBeInTheDocument();
  });

  it('renders formatted date', () => {
    const onDelete = vi.fn();
    render(<DecisionCard decision={mockDecision} onDelete={onDelete} />);

    // Check that date is rendered (format may vary by locale)
    expect(screen.getByText(/feb/i)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(<DecisionCard decision={mockDecision} onDelete={onDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith('test-id');
  });

  it('renders without context', () => {
    const decisionWithoutContext: Decision = {
      ...mockDecision,
      context: '',
    };
    const onDelete = vi.fn();
    render(<DecisionCard decision={decisionWithoutContext} onDelete={onDelete} />);

    expect(screen.getByText('Use Postgres over MySQL')).toBeInTheDocument();
  });
});

describe('SearchBar', () => {
  it('renders search input', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    expect(screen.getByPlaceholderText(/search your decisions/i)).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText(/search your decisions/i);
    fireEvent.change(input, { target: { value: 'test' } });

    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('shows clear button when value is present', () => {
    const onChange = vi.fn();
    render(<SearchBar value="test" onChange={onChange} />);

    // There should be a clear button (the X icon)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('clears search when clear button is clicked', () => {
    const onChange = vi.fn();
    render(<SearchBar value="test" onChange={onChange} />);

    const clearButton = screen.getByRole('button');
    fireEvent.click(clearButton);

    expect(onChange).toHaveBeenCalledWith('');
  });
});

describe('EmptyState', () => {
  it('renders empty state for no decisions', () => {
    render(<EmptyState />);

    expect(screen.getByText(/no decisions yet/i)).toBeInTheDocument();
    expect(screen.getByText(/drop your first crumb/i)).toBeInTheDocument();
  });

  it('renders empty state for no search results', () => {
    render(<EmptyState hasSearchQuery={true} />);

    expect(screen.getByText(/no matches found/i)).toBeInTheDocument();
    expect(screen.getByText(/try adjusting your search/i)).toBeInTheDocument();
  });
});
