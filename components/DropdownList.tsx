import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type DropdownListProps = {
  title: string;
  selectedOption: string | undefined;
  style: string;
  onPress: () => void;
  isLast?: true;
};

function DropdownList(props: DropdownListProps) {
  const { theme } = useContext(ThemeContext);
  const { title, selectedOption, style, onPress, isLast } = props;

  const topRadius = style === "start" ? 20 : 0;
  const bottomRadius = style === "end" ? 20 : 0;
  const borderBottomWidth = isLast ? 0 : 1

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "auto",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: theme.colors.cardBackground,
      borderTopStartRadius: topRadius,
      borderTopEndRadius: topRadius,
      borderBottomStartRadius: bottomRadius,
      borderBottomEndRadius: bottomRadius,
      padding: 15,
      borderBottomWidth: borderBottomWidth,
      borderBottomColor: theme.colors.divider,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.colors.text,
    },
    option: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 0,
    },
    selectedOption: {
      fontSize: 16,
      height: 18,
      color: theme.colors.labelText,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.title}> {title} </Text>
        <View style={styles.option}>
          <Text style={styles.selectedOption}> {selectedOption} </Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.colors.labelText}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(DropdownList)