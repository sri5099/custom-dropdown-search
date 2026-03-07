import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DropDownModal from '../DropDownModal';

describe('DropDownModal', () => {
  const mockSetState = jest.fn();
  const mockToggleVisibility = jest.fn();
  const mockDropdownData = [
    { id: 1, label: 'Apple', value: 'apple' },
    { id: 2, label: 'Banana', value: 'banana' },
    { id: 3, label: 'Orange', value: 'orange' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when visible', () => {
    const { getByTestId } = render(
      <DropDownModal
        dropDownList={mockDropdownData}
        visibility={true}
        toggleVisibility={mockToggleVisibility}
        setState={mockSetState}
        state={null}
        dropDownSearchKey="label"
      />
    );

    expect(getByTestId('dropdown-modal')).toBeTruthy();
    expect(getByTestId('dropdown-item-1')).toBeTruthy();
    expect(getByTestId('dropdown-item-2')).toBeTruthy();
    expect(getByTestId('dropdown-item-3')).toBeTruthy();
  });

  it('filters items based on search', async () => {
    const { getByTestId, queryByTestId } = render(
      <DropDownModal
        dropDownList={mockDropdownData}
        visibility={true}
        toggleVisibility={mockToggleVisibility}
        setState={mockSetState}
        state={null}
        dropDownSearchKey="label"
      />
    );

    const searchInput = getByTestId('text-input');
    fireEvent.changeText(searchInput, 'App');

    await waitFor(() => {
      expect(queryByTestId('dropdown-item-1')).toBeTruthy();
      expect(queryByTestId('dropdown-item-2')).toBeNull();
      expect(queryByTestId('dropdown-item-3')).toBeNull();
    });
  });

  it('selects item and closes modal', async () => {
    const { getByTestId } = render(
      <DropDownModal
        dropDownList={mockDropdownData}
        visibility={true}
        toggleVisibility={mockToggleVisibility}
        setState={mockSetState}
        state={null}
        dropDownSearchKey="label"
        multiple={false}
      />
    );

    const item = getByTestId('dropdown-item-1');
    fireEvent.press(item);

    await waitFor(() => {
      expect(mockSetState).toHaveBeenCalledWith(mockDropdownData[0]);
      expect(mockToggleVisibility).toHaveBeenCalled();
    });
  });

  it('closes modal when cancel button is pressed', () => {
    const { getByTestId } = render(
      <DropDownModal
        dropDownList={mockDropdownData}
        visibility={true}
        toggleVisibility={mockToggleVisibility}
        setState={mockSetState}
        state={null}
        dropDownSearchKey="label"
      />
    );

    const cancelButton = getByTestId('cancel-button');
    fireEvent.press(cancelButton);

    expect(mockToggleVisibility).toHaveBeenCalled();
  });

  it('shows no data message when list is empty', () => {
    const { getByTestId } = render(
      <DropDownModal
        dropDownList={[]}
        visibility={true}
        toggleVisibility={mockToggleVisibility}
        setState={mockSetState}
        state={null}
        dropDownSearchKey="label"
      />
    );

    expect(getByTestId('no-data-container')).toBeTruthy();
    expect(getByTestId('no-data-text')).toBeTruthy();
  });
});
