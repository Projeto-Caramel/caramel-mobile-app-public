import React from "react";
import { View, Text, theme } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../styles/Theme";

interface CustomRuleItemProps {
  title: string;
  body: string;
}

const CustomRuleItem = ({ title, body }: CustomRuleItemProps) => {
  return (
    <View
      style={{
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        flex={1}
        flexDirection={"row"}
        width={"100%"}
        alignItems={"center"}
      >
        <Ionicons
          name="checkmark-circle-sharp"
          size={Theme.fontSizes.xl}
          color={Theme.colors.brown.original}
          style={{ marginRight: 10, fontWeight: "bold" }}
        />
        <Text
          fontSize={Theme.fontSizes.lg}
          fontWeight="bold"
          color={Theme.colors.brown.original}
        >
          {title}
        </Text>
      </View>

      <Text
        fontSize={Theme.fontSizes.md}
        color={Theme.colors.sealBrown.original}
      >
        {body}
      </Text>
    </View>
  );
};

export default CustomRuleItem;
