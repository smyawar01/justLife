import React from 'react';
import { EmptySearchView } from '@/features/shared/components/search/EmptySearchView';
import { renderWithTheme, fireEvent } from '@/core/testing/testUtils';

describe('EmptySearchView Component Unit Tests', () => {
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders default message when query is empty and no custom message is provided', async () => {
    const { getByTestId, getByText, queryByTestId } = await renderWithTheme(<EmptySearchView />);

    expect(getByTestId('empty-search-view')).toBeTruthy();
    expect(getByText('No Results Found')).toBeTruthy();
    expect(getByText('No matching items found.')).toBeTruthy();
    expect(queryByTestId('clear-search-button')).toBeNull();
  });

  it('renders query-specific message when query prop is passed', async () => {
    const { getByText } = await renderWithTheme(<EmptySearchView query="dragon-lord" />);
    expect(getByText('We couldn\'t find any items matching "dragon-lord".')).toBeTruthy();
  });

  it('renders custom title and message when explicitly provided', async () => {
    const { getByText } = await renderWithTheme(
      <EmptySearchView
        title="Custom Title"
        message="This is a fully custom empty message."
      />
    );

    expect(getByText('Custom Title')).toBeTruthy();
    expect(getByText('This is a fully custom empty message.')).toBeTruthy();
  });

  it('renders clear button when onClear prop is provided and triggers callback on press', async () => {
    const { getByTestId } = await renderWithTheme(
      <EmptySearchView query="missing" onClear={mockOnClear} />
    );

    const clearBtn = getByTestId('clear-search-button');
    expect(clearBtn).toBeTruthy();

    await fireEvent.press(clearBtn);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});
