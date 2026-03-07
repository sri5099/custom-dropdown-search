import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import SearchIcon from '../../assets/searchIcon.svg';

import { Colors, Fonts, CHANGE_BY_MOBILE_DPI } from '../global';

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
  placeholderText,
  searchIcon,
  containerStyle = {},
  inputStyle = {},
  autoCapitalize = 'none',
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {searchIcon && (
        <SearchIcon
          width={CHANGE_BY_MOBILE_DPI(16)}
          height={CHANGE_BY_MOBILE_DPI(16)}
        />
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={setValue}
        placeholder={placeholderText}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CHANGE_BY_MOBILE_DPI(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.TEXT_COLOR,
    marginVertical: CHANGE_BY_MOBILE_DPI(10),
  },
  input: {
    flex: 1,
    fontSize: CHANGE_BY_MOBILE_DPI(14),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    marginLeft: CHANGE_BY_MOBILE_DPI(8),
  },
});

export default CustomTextInput;
