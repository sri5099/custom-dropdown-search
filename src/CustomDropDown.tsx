import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { Colors, Fonts, CHANGE_BY_MOBILE_DPI } from './global';
import DropDownModal from './DropDownModal';

export interface DropdownItem {
  id?: string | number;
  value?: string | number;
  [key: string]: any;
}

export interface CustomDropDownProps {
  placeHolder?: string;
  containerStyle?: ViewStyle;
  dropDownList?: DropdownItem[];
  setState: (selected: DropdownItem | DropdownItem[]) => void;
  defaultValue?: string | number | DropdownItem[];
  disabled?: boolean;
  externalPlaceholder?: string;
  endPoint?: string;
  dropDownSearchKey: string;
  error?: string;
  multiple?: boolean;
  externalPlaceholderStyle?: TextStyle;
  externalContainerStyle?: ViewStyle;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  placeHolder,
  containerStyle = {},
  dropDownList = [],
  setState,
  defaultValue = null,
  disabled = false,
  externalPlaceholder,
  endPoint,
  dropDownSearchKey,
  error,
  multiple = false,
  externalPlaceholderStyle = {},
  externalContainerStyle = {},
}) => {
  const [selectedValue, setSelectedValue] = useState<
    DropdownItem | DropdownItem[] | null
  >(multiple ? [] : null);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const toggleModalVisibility = () => setModalVisibility(!modalVisibility);

  const setValue = (data: DropdownItem) => {
    if (multiple) {
      const selectedArray = selectedValue as DropdownItem[];
      if (
        selectedArray.some((e) => (e.id ?? e.value) === (data.id ?? data.value))
      ) {
        let arr = selectedArray.filter(
          (e) => (e.id ?? e.value) !== (data.id ?? data.value)
        );
        setSelectedValue(arr);
        setState(arr);
      } else {
        let arr = [...selectedArray, data];
        setSelectedValue(arr);
        setState(arr);
      }
    } else {
      setState(data);
      setSelectedValue(data);
    }
  };

  useEffect(() => {
    if (dropDownList.length > 0) {
      if (multiple) {
        setSelectedValue((defaultValue ?? []) as DropdownItem[]);
      } else {
        setSelectedValue(
          dropDownList.find((e) => (e.id ?? e.value) === defaultValue) ?? null
        );
      }
    } else {
      setSelectedValue(defaultValue as DropdownItem | null);
    }
  }, [defaultValue, dropDownList, multiple]);

  return (
    <View
      style={[styles.mainContainer, externalContainerStyle]}
      testID="dropdown-main-container"
    >
      {externalPlaceholder ? (
        <Text
          style={[styles.externalText, externalPlaceholderStyle]}
          testID="external-placeholder"
        >
          {externalPlaceholder}
        </Text>
      ) : null}
      <TouchableOpacity
        disabled={disabled}
        onPress={toggleModalVisibility}
        style={[styles.container, error ? styles.error : {}, containerStyle]}
        testID="dropdown-touchable"
      >
        <Text
          numberOfLines={1}
          style={[
            styles.placeHolderText,
            selectedValue ? styles.selectedText : styles.placeholderColor,
          ]}
          testID="dropdown-selected-text"
        >
          {multiple
            ? (selectedValue as DropdownItem[])
                .map((u) => u[dropDownSearchKey])
                .join(', ')
            : selectedValue
              ? (selectedValue as DropdownItem)[dropDownSearchKey]
              : placeHolder}
        </Text>
        <Text>▼</Text>
      </TouchableOpacity>
      <DropDownModal
        visibility={modalVisibility}
        toggleVisibility={toggleModalVisibility}
        dropDownList={dropDownList}
        setState={setValue}
        state={selectedValue}
        endPoint={endPoint}
        dropDownSearchKey={dropDownSearchKey}
        multiple={multiple}
      />
      {error ? (
        <Text style={styles.errorText} testID="error-text">
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: CHANGE_BY_MOBILE_DPI(10),
  },
  externalPlaceholder: {
    color: Colors.TEXT_COLOR,
    fontSize: CHANGE_BY_MOBILE_DPI(14),
    fontFamily: Fonts.MEDIUM,
  },
  container: {
    marginHorizontal: CHANGE_BY_MOBILE_DPI(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: CHANGE_BY_MOBILE_DPI(15),
    height: CHANGE_BY_MOBILE_DPI(50),
    borderRadius: CHANGE_BY_MOBILE_DPI(6),
    backgroundColor: Colors.WHITE,
    borderWidth: CHANGE_BY_MOBILE_DPI(1),
    borderColor: Colors.BLACK + '66',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  error: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontFamily: Fonts.REGULAR,
    fontSize: CHANGE_BY_MOBILE_DPI(12),
    marginLeft: CHANGE_BY_MOBILE_DPI(32),
    marginTop: CHANGE_BY_MOBILE_DPI(4),
  },
  externalText: {
    marginHorizontal: CHANGE_BY_MOBILE_DPI(30),
    marginBottom: CHANGE_BY_MOBILE_DPI(10),
    fontFamily: Fonts.REGULAR,
    color: Colors.BLACK,
    fontSize: CHANGE_BY_MOBILE_DPI(14),
  },
  placeHolderText: {
    fontSize: CHANGE_BY_MOBILE_DPI(15),
    fontFamily: Fonts.MEDIUM,
    flex: 1,
  },
  selectedText: {
    color: Colors.BLACK,
  },
  placeholderColor: {
    color: '#00000033',
  },
});

export default CustomDropDown;
