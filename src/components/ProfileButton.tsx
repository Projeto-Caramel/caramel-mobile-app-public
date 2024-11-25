import React from "react";
import { Text, VStack, Pressable } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../styles/Theme";

const IconButton = ({ iconName, label, principal = false, onPress, ...rest }) => {
  const iconSize = principal ? 32 : 24;
  const paddingSize = principal ? 4 : 3;
  const fontSize = principal ? Theme.fontSizes.md : Theme.fontSizes.sm;

  return (
    <VStack alignItems="center" mt={5}>
      <Pressable
        bg={Theme.colors.white}
        borderRadius="full"
        justifyContent="center"
        alignItems="center"
        p={paddingSize}
        shadow={5}
        onPress={onPress} 
        {...rest}
      >
        <Ionicons
          name={iconName}
          size={iconSize}
          color={Theme.colors.sealBrown.original}
        />
      </Pressable>
      <Text
        fontSize={fontSize}
        color={Theme.colors.sealBrown.original}
        fontWeight="500"
      >
        {label}
      </Text>
    </VStack>
  );
};

export default IconButton;
