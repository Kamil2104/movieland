import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import useAccountSettings from "../../hooks/useAccountSettings";
import { translate } from "../../locales/i18n";
import { formatOptionLabel } from "../../locales/optionLabel";
import { useAppSelector } from "../../store/hooks";
import { StateKeyType } from "../../types/settingsTypes";

type SettingKey = StateKeyType;

interface OptionItemProps {
  option: string;
  isSelected: boolean;
  onPress: (opt: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function OptionsScreen() {
  const { theme } = useContext(ThemeContext);
  const { updateSetting } = useAccountSettings();
  const { language } = useAppSelector((state) => state.accountSettings);
  const t = translate(language);

  const route = useRoute();
  const navigation = useNavigation();

  const { stateKey, options, title, selectedOptionParam } = route.params as {
    stateKey: SettingKey;
    title: string;
    options: string[];
    selectedOptionParam: string;
  };

  // Pick language-dependent translator (OptionsScreen params don't include language, so fallback to English titles passed in).
  const [selectedOption, setSelectedOption] = useState<string>(selectedOptionParam);

  const onPressOption = (opt: string) => {
    setSelectedOption(opt);
    // send English values to API (options array must contain English values)
    updateSetting(stateKey, opt);
  };

  const getOptionStyle = (isFirst: boolean, isLast: boolean) => [
    styles.option,
    isFirst && { borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    isLast && { borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderBottomWidth: 0 },
  ];

  const OptionItem = ({
    option,
    isSelected,
    onPress,
    isFirst,
    isLast,
  }: OptionItemProps) => (
    <TouchableOpacity
      key={option}
      style={getOptionStyle(isFirst, isLast)}
      onPress={() => onPress(option)}
    >
          <Text style={styles.optionTitle}>
            {formatOptionLabel(stateKey, option, t)}
          </Text>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={28}
          color={theme.colors.primary}
        />
      )}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      padding: 20,
      paddingTop: 80,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 40,
      position: "relative",
    },
    backButton: {
      position: "absolute",
      left: 0,
      color: theme.colors.labelText,
    },
    backButtonIcon: {
      color: theme.colors.labelText,
    },
    title: {
      fontSize: 20,
      fontWeight: "500",
      color: theme.colors.text,
    },
    option: {
      width: "100%",
      height: 50,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: theme.colors.cardBackground,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back-circle"
            size={36}
            style={styles.backButtonIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      {options.map((option, index) => (
        <OptionItem
          key={option}
          option={option}
          isSelected={option === selectedOption}
          onPress={onPressOption}
          isFirst={index === 0}
          isLast={index === options.length - 1}
        />
      ))}
    </View>
  );
}
