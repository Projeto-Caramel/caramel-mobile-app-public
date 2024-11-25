import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../../components/CustomButton";
import CustomRuleItem from "../../../components/RuleItem"; 
import { Theme } from '../../../styles/Theme';
import { items } from "../../../utils/Interest/NotificationsItemsUtil";
import LetterForm from "../../../assets/LetterForm.png";
import { useRoute, RouteProp } from "@react-navigation/native";

type InterestConfirmationParams = {
  InterestConfirmation: {
    idPartner: string;
    idPet: string;
  };
};

export function WelcomeScreen({ navigation }: { navigation: any }) {
  const route = useRoute<RouteProp<InterestConfirmationParams, "InterestConfirmation">>();
  const { idPartner, idPet } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Ionicons
        name="chevron-back"
        size={30}
        color={Theme.colors.sealBrown.original}
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
      />

      <Image
        source={LetterForm} 
        style={styles.logo}
      />

      <Text style={styles.welcomeText}>Confirme o Seu Interesse</Text>
      <Text style={styles.subText}>Mas antes, se atente a esses pontos...</Text>

      <View style={styles.rulesContainer}>
        {items.map(item => (
          <CustomRuleItem key={item.id} title={item.title} body={item.body} />
        ))}
      </View>

      <CustomButton
        isLoading={false}
        style={styles.button}
        outlined={false}
        color="white"
        onPress={() => navigation.navigate("PhoneInform", { idPartner, idPet })}
      >
        Eu Concordo
      </CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: Theme.colors.caramelLight[90],
    alignItems: "center",
  },
  backIcon: {
    alignSelf: "flex-start",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Theme.colors.sealBrown.original,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    fontWeight: "500",
    color: Theme.colors.sealBrown.original,
    textAlign: "center",
    marginBottom: 30,
  },
  rulesContainer: {
    marginBottom: 10,
    width: "100%",
  },
  button: {
    width: "100%",
    backgroundColor: Theme.colors.sealBrown.original,
  },
});

export default WelcomeScreen;
