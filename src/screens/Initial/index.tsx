import React from "react";
import { StyleSheet, View, Linking, LogBox } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text } from "native-base";
import { Theme } from "../../styles/Theme";
import Logo from "../../assets/logotipo.png";
import CustomButton from "../../components/CustomButton";

LogBox.ignoreLogs(["In React 18, SSRProvider is not necessary"]);

export default function Initial({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Theme.colors.brown.minus10, Theme.colors.brown.minus70]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      >
        <Image source={Logo} alt="Logo Voll" />
        <Text style={styles.text}>
          Ao se cadastrar ou entrar na sua conta, você concorda com os nossos
          Termos.{"\n"}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("TermsAndConditions")}
          >
            Saiba como tratamos os seus dados na nossa Política de Privacidade.
          </Text>
        </Text>
        <CustomButton
          isLoading={false}
          mt="5"
          outlined
          onPress={() => navigation.navigate("Login")}
          outlineColor="white"
          color="white"
        >
          Login
        </CustomButton>
        <CustomButton
          isLoading={false}
          mt="5"
          outlined
          onPress={() => navigation.navigate("Register")}
          outlineColor="white"
          color="white"
        >
          Cadastre-se
        </CustomButton>

        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.navigate("ChangePassword")}
        >
          Esqueceu sua Senha?
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 100,
  },
  text: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: Theme.fontSizes.sm,
    fontWeight: "400",
    letterSpacing: 1.4,
    padding: 20,
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "500",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});
