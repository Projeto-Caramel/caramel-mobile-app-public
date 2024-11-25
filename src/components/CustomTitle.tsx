import { StyleSheet } from "react-native";
import { ITextProps, Text } from "native-base";
import { ReactNode } from "react";
import { Theme } from "../styles/Theme";

interface TituloProps extends ITextProps {
  children: ReactNode;
}

const TitleComponent = ({ children }: TituloProps) => {
  return <Text style={styles.titleStyle}>{children}</Text>;
};

const styles = StyleSheet.create({
  titleStyle: {
    color: Theme.colors.sealBrown.original,
    fontFamily: "Roboto",
    fontSize: Theme.fontSizes.xxl,
    fontStyle: "normal",
    fontWeight: "bold",
    letterSpacing: 3,
    lineHeight: 36,
  },
});

export default TitleComponent;
