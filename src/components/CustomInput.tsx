import React, { useState } from "react";
import { Input, IInputProps, View } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Theme } from "../styles/Theme";

interface CustomInputProps extends IInputProps {
  iconName?: string;
  placeholder: string;
  hidePassword?: boolean;
  initialValue?: string | number;
  inputType?: "text" | "select";
}

const CustomInput = ({
  iconName,
  placeholder,
  hidePassword = false,
  initialValue = "",
  inputType = "text",
  ...rest
}: CustomInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState(!hidePassword);
  const [value, setValue] = useState(String(initialValue));

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View
      mt={5}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: Theme.colors.sealBrown.original,
        width: "100%",
        paddingHorizontal: 10,
      }}
    >
      {iconName && (
        <Ionicons
          name={iconName}
          style={{
            color: Theme.colors.sealBrown.original,
            fontSize: Theme.fontSizes.lg,
            marginRight: 10,
          }}
        />
      )}

      <Input
        variant="unstyled"
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.sealBrown.original}
        secureTextEntry={hidePassword && !passwordVisible}
        value={value}
        onChangeText={(text) => setValue(text)}
        style={{
          flex: 1,
          height: 40,
          fontSize: Theme.fontSizes.lg,
          color: Theme.colors.sealBrown.original,
          paddingRight: hidePassword ? 40 : 0,
        }}
        {...rest}
      />

      {hidePassword && (
        <Ionicons
          name={passwordVisible ? "eye" : "eye-off"}
          style={{
            position: "absolute",
            right: 0,
            color: Theme.colors.sealBrown.original,
            fontSize: Theme.fontSizes.xl,
            marginRight: 10,
          }}
          onPress={togglePasswordVisibility}
        />
      )}
    </View>
  );
};

export default CustomInput;
