import React from 'react';
import { SearchBar } from '@/features/shared/components/search/SearchBar';
import { renderWithTheme, fireEvent } from '@/core/testing/testUtils';

describe('SearchBar Component Unit Tests', () => {
  const mockOnChangeText = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input with correct placeholder and initial value', async () => {
    const { getByTestId, queryByTestId } = await renderWithTheme(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
        placeholder="Type a card slug..."
      />
    );

    const input = getByTestId('search-input');
    expect(input.props.placeholder).toBe('Type a card slug...');
    expect(input.props.value).toBe('');
    expect(queryByTestId('clear-search-button')).toBeNull();
  });

  it('triggers onChangeText callback on typing', async () => {
    const { getByTestId } = await renderWithTheme(
      <SearchBar
        value=""
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
      />
    );

    const input = getByTestId('search-input');
    await fireEvent.changeText(input, 'fireball');

    expect(mockOnChangeText).toHaveBeenCalledWith('fireball');
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
  });

  it('renders clear button when value is non-empty and triggers onClear on press', async () => {
    const { getByTestId } = await renderWithTheme(
      <SearchBar
        value="spell"
        onChangeText={mockOnChangeText}
        onClear={mockOnClear}
      />
    );

    const clearBtn = getByTestId('clear-search-button');
    expect(clearBtn).toBeTruthy();

    await fireEvent.press(clearBtn);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});
