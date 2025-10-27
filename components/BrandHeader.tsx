import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import lightTheme from "../themes/lightTheme";
import MaskedView from "@react-native-masked-view/masked-view";

interface BrandHeaderProps {
  theme: typeof lightTheme;
  subtitle: string;
  description: string;
}

function BrandHeader(props: BrandHeaderProps) {
  const { theme, subtitle, description } = props;

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
      marginTop: 20,
      marginBottom: 0,
    },
    brandName: {
      fontSize: 32,
      fontWeight: "800",
      textAlign: "center",
      letterSpacing: 1,
      marginBottom: 0,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "400",
      color: theme.colors.labelText,
      textAlign: "center",
      opacity: 0.8,
      lineHeight: 22,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subtitle}</Text>
      <MaskedView
        style={{ height: 40, width: "100%" }}
        maskElement={<Text style={styles.brandName}>MovieLand</Text>}
      >
        <LinearGradient
          colors={[
            theme.colors.primary,
            theme.colors.primary,
            "#ff6b6b",
            theme.colors.primary,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
      <Text style={styles.subtitle}>{description}</Text>
    </View>
  );
}

export default React.memo(BrandHeader)