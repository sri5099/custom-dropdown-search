import { render, fireEvent } from '@testing-library/react-native';
import CustomTextInput from '../components/CustomTextInput';

describe('CustomTextInput', () => {
  const mockSetValue = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput setValue={mockSetValue} placeholderText="Search here" />
    );

    expect(getByPlaceholderText('Search here')).toBeTruthy();
  });

  it('calls setValue when text changes', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput setValue={mockSetValue} placeholderText="Search" />
    );

    const input = getByPlaceholderText('Search');
    fireEvent.changeText(input, 'test');

    expect(mockSetValue).toHaveBeenCalledWith('test');
  });

  it('displays search icon when searchIcon prop is true', () => {
    const { getByTestId } = render(
      <CustomTextInput setValue={mockSetValue} searchIcon={true} />
    );

    expect(getByTestId('search-icon')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customContainerStyle = { backgroundColor: 'red' };
    const customInputStyle = { fontSize: 20 };

    const { getByTestId } = render(
      <CustomTextInput
        setValue={mockSetValue}
        containerStyle={customContainerStyle}
        inputStyle={customInputStyle}
      />
    );

    const container = getByTestId('text-input-container');
    expect(container.props.style).toMatchObject(
      expect.arrayContaining([expect.objectContaining(customContainerStyle)])
    );
  });
});
