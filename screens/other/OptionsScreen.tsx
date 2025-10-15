import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";

import { useRoute, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store/hooks";

import { Ionicons } from "@expo/vector-icons";

import useAccountSettings from "../../hooks/useAccountSettings";

export default function OptionsScreen() {
  const { theme } = useContext(ThemeContext);
  const { updateSetting } = useAccountSettings()

  const route = useRoute();
  const navigation = useNavigation();

  const { stateKey, options, title, selectedOptionParam } = route.params as {
    stateKey: 'appearance' | 'stayLoggedIn' | 'defaultHomepage'
    title: string,
    options: string[];
    selectedOptionParam: string
  };

  const [selectedOption, setSelectedOption] = useState<string>(selectedOptionParam)

  const onPress = (opt: any) => {
    setSelectedOption(opt)
    updateSetting(stateKey, opt)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      padding: 20,
      paddingTop: 80,
      backgroundColor: theme.colors.background
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 40,
      position: 'relative',
    },
    backButton: {
      position: 'absolute',
      left: 0,
      color: theme.colors.labelText
    },
    backButtonIcon: {
      color: theme.colors.labelText,
    },
    title: {
      fontSize: 20,
      fontWeight: '500',
      color: theme.colors.text
    },
    option: {
      width: '100%',
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: theme.colors.cardBackground,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={36} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      {options.map((option, index) => {
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              isFirst && {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              },
              isLast && {
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            onPress={() => onPress(option)}
          >
            <Text style={styles.optionTitle}> {option} </Text>
            {option === selectedOption && <Ionicons name="checkmark-circle" size={28} color={theme.colors.primary} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}