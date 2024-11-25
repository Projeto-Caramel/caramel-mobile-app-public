import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { ScrollView, Button, Icon, VStack, Text } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../../components/CustomButton";
import CustomTitle from "../../../components/CustomTitle";
import { Theme } from "../../../styles/Theme";
import { useRoute, RouteProp } from "@react-navigation/native";

type ReasonInformParams = {
  ReasonInform: {
    idPartner: string;
    idPet: string;
    phone: string;
  };
};

export default function ReasonInform({ navigation }: { navigation: any }) {
  const route = useRoute<RouteProp<ReasonInformParams, "ReasonInform">>();
  const { idPartner, idPet, phone } = route.params;

  const [reason, setReason] = useState("");
  const maxLength = 300;

  const handleReasonChange = (value: string) => {
    if (value.length <= maxLength) {
      setReason(value);
    }
  };

  return (
    <ScrollView
      flex={1}
      p={5}
      showsVerticalScrollIndicator={false}
      bgColor={Theme.colors.caramelLight[90]}
    >
      <VStack mt={4} mb={10}>
        <Button
          variant="unstyled"
          onPress={() => navigation.goBack()}
          alignSelf="flex-start"
          mb={5}
        >
          <Icon as={Ionicons} name="chevron-back" size="md" color="black" />
        </Button>

        <CustomTitle>Por que você deseja adotar um CãoPanheiro?</CustomTitle>

        <Text color={Theme.colors.sealBrown.original} mt={3}>
          Escreva com carinho o motivo pelo qual você acredita que este pet
          seria uma boa escolha para a sua família. Suas palavras podem ajudar a
          ONG a entender o seu perfil e melhorar as chances de sua sua adoção.{" "}
          <Text fontWeight="bold" color={Theme.colors.sealBrown.original}>
            Este campo não é obrigatório.
          </Text>
        </Text>

        <TextInput
          style={styles.textArea}
          placeholder="Escreva aqui o motivo pelo qual você deseja adotar este pet..."
          value={reason}
          onChangeText={handleReasonChange}
          multiline={true}
          numberOfLines={4}
          maxLength={maxLength}
          
        />

        <Text color={Theme.colors.sealBrown.original} mt={2}>
          {maxLength - reason.length} caracteres restantes
        </Text>
      </VStack>
      <CustomButton
        isLoading={false}
        outlined={false}
        color="white"
        onPress={() =>
          navigation.navigate("InterestSended", {
            idPartner,
            idPet,
            phone,
            reason,
          })
        }
      >
        Enviar
      </CustomButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textArea: {
    fontSize: 18,
    height: 120,
    padding: 10,
    borderColor: Theme.colors.sealBrown.original,
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: 'top', 
    marginTop: 10
  },
});
