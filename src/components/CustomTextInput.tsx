import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Colors, Fonts, CHANGE_BY_MOBILE_DPI } from '../global';
import SearchIcon from '../assets/svgs/Search.svg';

interface CustomTextInputProps {
  value?: string;
  setValue: (text: string) => void;
  placeholderText?: string;
  searchIcon?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  setValue,
  placeholderText = 'Search',
  searchIcon = false,
  containerStyle = {},
  inputStyle = {},
  autoCapitalize = 'none',
}) => {
  const styles = createStyles();

  return (
    <View
      style={[styles.container, containerStyle]}
      testID="text-input-container"
    >
      {searchIcon && (
        <SearchIcon
          width={CHANGE_BY_MOBILE_DPI(16)}
          height={CHANGE_BY_MOBILE_DPI(16)}
          testID="search-icon"
        />
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholderText}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#00000033"
        testID="text-input"
      />
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: CHANGE_BY_MOBILE_DPI(8),
      paddingHorizontal: CHANGE_BY_MOBILE_DPI(15),
      marginHorizontal: CHANGE_BY_MOBILE_DPI(15),
      marginTop: CHANGE_BY_MOBILE_DPI(10),
      backgroundColor: Colors.WHITE,
    },
    input: {
      flex: 1,
      fontSize: CHANGE_BY_MOBILE_DPI(14),
      fontFamily: Fonts.REGULAR,
      color: Colors.TEXT_COLOR,
      paddingVertical: CHANGE_BY_MOBILE_DPI(12),
      marginLeft: CHANGE_BY_MOBILE_DPI(8),
    },
  });

export default CustomTextInput;
