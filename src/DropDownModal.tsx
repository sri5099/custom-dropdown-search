import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Fonts, CHANGE_BY_MOBILE_DPI } from './global';
import CustomTextInput from './components/CustomTextInput';
import CancelIcon from '../assets/svgs/Close.svg';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import type { DropdownItem } from './CustomDropDown';
import axiosInstance from './global/api-core';

export interface DropDownModalProps {
  dropDownList: DropdownItem[];
  visibility?: boolean;
  toggleVisibility?: () => void;
  onRequestClose?: () => void;
  setState: (selected: DropdownItem) => void;
  state: DropdownItem | DropdownItem[] | null;
  showSearch?: boolean;
  endPoint?: string;
  dropDownSearchKey: string;
  multiple?: boolean;
}

const DropDownModal: React.FC<DropDownModalProps> = ({
  dropDownList,
  visibility = false,
  toggleVisibility = () => {},
  onRequestClose = () => {},
  setState,
  state,
  endPoint = '',
  dropDownSearchKey,
  multiple = false,
}) => {
  const styles = createStyles();
  const loadingLoader = <ActivityIndicator size="small" color="#988F8A" />;
  const [searchList, setSearchList] = useState<DropdownItem[]>(dropDownList);
  const [dataList, setDataList] = useState<DropdownItem[]>(dropDownList);

  const searchData = (text: string) => {
    const response = dataList.filter((item) =>
      item[dropDownSearchKey]
        ?.toString()
        .toUpperCase()
        .includes(text.toUpperCase())
    );
    setSearchList(response);
  };

  const selectContent = (item: DropdownItem) => {
    setState(item);
    toggleVisibility();
  };

  const renderSearchItem = (item: DropdownItem) => (
    <TouchableOpacity
      onPress={() => selectContent(item)}
      key={JSON.stringify(item)}
      style={styles.searchItemContainer}
    >
      {item.icon && <Image source={{ uri: item.icon }} style={styles.icon} />}
      <Text
        style={{
          ...styles.searchItemText,
          color: multiple
            ? (state as DropdownItem[]).some(
                (e) => (e.id ?? e.value) === (item.id ?? item.value)
              )
              ? Colors.PRIMARY
              : '#988F8A'
            : state &&
                (state as DropdownItem)[dropDownSearchKey] ===
                  item[dropDownSearchKey]
              ? Colors.PRIMARY
              : '#988F8A',
        }}
      >
        {item[dropDownSearchKey]}
      </Text>
    </TouchableOpacity>
  );

  const flattenBranches = (branches: any[], parent: string = '') => {
    let flatList: any[] = [];
    branches?.forEach((branch) => {
      const label = parent
        ? `${parent} -> ${branch.branch_name}`
        : branch.branch_name;
      flatList.push({
        id: branch.id,
        display_name: branch.branch_name,
        label,
        parent,
        sub_branches: branch.sub_branches,
      });
      if (branch.sub_branches && branch.sub_branches.length > 0) {
        flatList = flatList.concat(flattenBranches(branch.sub_branches, label));
      }
    });
    return flatList;
  };

  const convertToRailwayTime = (time12h: string, type: string) => {
    let time24h: string;
    if (type === 'timestamp') {
      time24h = moment(time12h).format('HH:mm');
    } else if (type === 'mType') {
      time24h = moment(time12h, 'HH:mm').format('hh:mm A');
    } else {
      time24h = moment(time12h, ['h:mm A']).format('HH:mm');
    }
    return time24h;
  };

  const onShow = async () => {
    if (endPoint !== '') {
      setSearchList([]);
      setDataList([]);
      try {
        const response = await axiosInstance.get(endPoint);
        if (response.data.status === 200) {
          if (endPoint === 'company/branch/list') {
            const list = flattenBranches(response.data.data);
            setSearchList(list);
            setDataList(list);
          } else if (endPoint === 'attendance/approver-list') {
            setSearchList(response.data.data.approvers);
            setDataList(response.data.data.approvers);
          } else if (endPoint === 'general-config/shift') {
            let list = response.data.data.map((d: any) => ({
              label:
                d.shift_name +
                ' (' +
                moment(
                  convertToRailwayTime(d.start_time, ''),
                  'HH:mm:ss'
                ).format('HH:mm') +
                ' - ' +
                moment(convertToRailwayTime(d.end_time, ''), 'HH:mm:ss').format(
                  'HH:mm'
                ) +
                ')',
              value: d.id,
            }));
            setSearchList(list);
            setDataList(list);
          } else if (endPoint === 'leave/leave-list') {
            let list = response.data.data.map((d: any) => ({
              label: d.leave_name + '  (' + d.leave_code + ')',
              value: d.id,
            }));
            setSearchList(list);
            setDataList(list);
          } else {
            setSearchList(response.data.data);
            setDataList(response.data.data);
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'No Data Found',
          });
        }
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'No Data Found',
        });
      }
    } else {
      setDataList(dropDownList);
      setSearchList(dropDownList);
    }
  };

  return (
    <Modal
      visible={visibility}
      onRequestClose={onRequestClose}
      transparent
      onShow={onShow}
      animationType="slide"
    >
      <View style={styles.dropDownMainContainer}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <TouchableOpacity onPress={toggleVisibility} style={{ flex: 0.35 }} />
        <View style={styles.dropDownContainer}>
          <TouchableOpacity
            onPress={toggleVisibility}
            style={styles.svgContainer}
          >
            <CancelIcon
              height={CHANGE_BY_MOBILE_DPI(15)}
              width={CHANGE_BY_MOBILE_DPI(15)}
            />
          </TouchableOpacity>
          <CustomTextInput
            setValue={searchData}
            autoCapitalize="none"
            placeholderText="Search here"
            searchIcon
          />
          {!dataList ? (
            <View style={styles.topSpace}>{loadingLoader}</View>
          ) : dataList.length === 0 ? (
            <View style={styles.topSpace}>
              <Text style={styles.noDataText}>"No Data Found"</Text>
            </View>
          ) : (
            <ScrollView contentContainerStyle={styles.dropDownListContainer}>
              {searchList.map(renderSearchItem)}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const createStyles = () =>
  StyleSheet.create({
    dropDownMainContainer: {
      flex: 1,
      backgroundColor: '#524B4560',
      justifyContent: 'flex-end',
    },
    dropDownContainer: {
      flex: 0.65,
      backgroundColor: Colors.WHITE,
      borderTopRightRadius: CHANGE_BY_MOBILE_DPI(15),
      borderTopLeftRadius: CHANGE_BY_MOBILE_DPI(15),
    },
    dropDownTitle: {
      color: Colors.TEXT_COLOR,
      fontSize: CHANGE_BY_MOBILE_DPI(18),
      fontFamily: Fonts.SEMIBOLD,
      textAlign: 'center',
      marginTop: CHANGE_BY_MOBILE_DPI(16),
      marginBottom: CHANGE_BY_MOBILE_DPI(10),
    },
    dropDownListContainer: {
      paddingBottom: CHANGE_BY_MOBILE_DPI(20),
    },
    searchItemContainer: {
      paddingHorizontal: CHANGE_BY_MOBILE_DPI(30),
      paddingVertical: CHANGE_BY_MOBILE_DPI(10),
      borderBottomWidth: 1,
      borderColor: '#F0EFFE',
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      height: CHANGE_BY_MOBILE_DPI(12),
      width: CHANGE_BY_MOBILE_DPI(16),
      marginRight: CHANGE_BY_MOBILE_DPI(5),
    },
    searchItemText: {
      fontSize: CHANGE_BY_MOBILE_DPI(12),
      fontFamily: Fonts.BOLD,
      color: Colors.TEXT_COLOR,
      marginTop: CHANGE_BY_MOBILE_DPI(4),
    },
    svgContainer: {
      alignItems: 'flex-end',
      marginVertical: CHANGE_BY_MOBILE_DPI(15),
      marginRight: CHANGE_BY_MOBILE_DPI(15),
    },
    noDataText: {
      color: Colors.TEXT_COLOR,
      fontSize: CHANGE_BY_MOBILE_DPI(12),
      fontFamily: Fonts.REGULAR,
      textAlign: 'center',
    },
    topSpace: {
      marginTop: CHANGE_BY_MOBILE_DPI(20),
    },
  });

export default DropDownModal;
