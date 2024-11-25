import { Text, Button, IButtonProps } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";
import { Theme } from "../styles/Theme";

interface ButtonProps extends IButtonProps {
  outlined: boolean;
  outlinedColor?: string;
  color: string;
  children?: React.ReactNode;
  isLoading: boolean
}

export default function CustomButton({
  outlined = false,
  outlinedColor = "#FFF",
  color,
  children,
  ...rest
}: ButtonProps) {
  return (
    <Button
      justifyContent="center"
      alignItems="center"
      borderRadius={100}
      borderWidth={outlined ? 1 : 0}
      borderColor={outlined ? outlinedColor : "transparent"}
      alignSelf="center"
      width="100%"
      bgColor={
        outlined ? "transparent" : rest.bgColor || Theme.colors.brown.minus50
      }
      {...rest}
    >
      <Text
        color={color}
        fontFamily="Roboto"
        fontSize={20}
        fontWeight="700"
      >
        {children}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonText: {},
});
