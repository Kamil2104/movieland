import React, { useContext } from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import { ThemeContext } from "../contexts/ThemeContext";

type DropdownListProps = {
  title: string,
  selectedOption: string,
  style: string,
  onPress: () => void
}

export default function DropdownList(props: DropdownListProps) {
    const { theme } = useContext(ThemeContext);
    const { title, selectedOption, style, onPress } = props

    const topRadius = style === 'start' ? 20 : 0
    const bottomRadius = style === 'end' ? 20 : 0

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: 'auto',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: theme.colors.cardBackground,
            borderTopStartRadius: topRadius,
            borderTopEndRadius: topRadius,
            borderBottomStartRadius: bottomRadius,
            borderBottomEndRadius: bottomRadius,
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.divider,
        },
        title: {
          fontSize: 18,
          fontWeight: '500',
          color: theme.colors.text,
        },
        option: {
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 0,
        },
        selectedOption: {
          fontSize: 16,
          height: 18,
          color: theme.colors.labelText,
        },
    })

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Text style={styles.title}> {title} </Text>
          <View style={styles.option}>
            <Text style={styles.selectedOption}> {selectedOption} </Text>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.labelText} />
          </View>
        </View>
      </TouchableOpacity>
    )
}