import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CustomDropDown from '../CustomDropDown';

describe('CustomDropDown', () => {
  const mockSetState = jest.fn();
  const mockDropdownData = [
    { id: 1, label: 'Option 1', value: 'option1' },
    { id: 2, label: 'Option 2', value: 'option2' },
    { id: 3, label: 'Option 3', value: 'option3' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with placeholder', () => {
    const { getByTestId } = render(
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
      />
    );

    const selectedText = getByTestId('dropdown-selected-text');
    expect(selectedText.props.children).toBe('Select an option');
  });

  it('opens modal when pressed', () => {
    const { getByTestId } = render(
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
      />
    );

    const dropdown = getByTestId('dropdown-touchable');
    fireEvent.press(dropdown);

    expect(getByTestId('dropdown-modal')).toBeTruthy();
  });

  it('selects single item correctly', async () => {
    const { getByTestId } = render(
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
      />
    );

    fireEvent.press(getByTestId('dropdown-touchable'));

    await waitFor(() => {
      expect(getByTestId('dropdown-modal').props.visible).toBe(true);
    });

    const item = getByTestId('dropdown-item-1');
    fireEvent.press(item);

    expect(mockSetState).toHaveBeenCalledWith(mockDropdownData[0]);
  });

  it('handles multiple selection correctly', async () => {
    const { getByTestId } = render(
      <CustomDropDown
        placeHolder="Select options"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
        multiple={true}
      />
    );

    fireEvent.press(getByTestId('dropdown-touchable'));

    await waitFor(() => {
      expect(getByTestId('dropdown-modal').props.visible).toBe(true);
    });

    fireEvent.press(getByTestId('dropdown-item-1'));
    fireEvent.press(getByTestId('dropdown-item-2'));

    expect(mockSetState).toHaveBeenCalled();
  });

  it('displays error message when provided', () => {
    const { getByTestId } = render(
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
        error="This field is required"
      />
    );

    const errorText = getByTestId('error-text');
    expect(errorText.props.children).toBe('This field is required');
  });

  it('is disabled when disabled prop is true', () => {
    const { getByTestId, queryByTestId } = render(
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
        disabled={true}
      />
    );

    const dropdown = getByTestId('dropdown-touchable');
    fireEvent.press(dropdown);

    // Modal should not be visible
    const modal = queryByTestId('dropdown-modal');
    expect(modal?.props.visible).toBeFalsy();
  });

  it('applies custom styles correctly', () => {
    const customStyle = { borderColor: 'red', borderWidth: 2 };
    const { getByTestId } = render(
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
        containerStyle={customStyle}
      />
    );

    const container = getByTestId('dropdown-touchable');
    expect(container.props.style).toEqual(expect.objectContaining(customStyle));
  });

  it('displays external placeholder when provided', () => {
    const { getByTestId } = render(
      <CustomDropDown
        placeHolder="Select an option"
        dropDownList={mockDropdownData}
        setState={mockSetState}
        dropDownSearchKey="label"
        externalPlaceholder="Choose your option"
      />
    );

    const externalPlaceholder = getByTestId('external-placeholder');
    expect(externalPlaceholder.props.children).toBe('Choose your option');
  });
});
