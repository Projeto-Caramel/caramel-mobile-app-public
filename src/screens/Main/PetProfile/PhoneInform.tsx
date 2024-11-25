import React, { useState } from "react";
import { ScrollView, Button, Icon, VStack, Text, Box } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../../components/CustomButton";
import CustomTitle from "../../../components/CustomTitle";
import CustomInput from "../../../components/CustomInput";
import { Theme } from "../../../styles/Theme";
import { useRoute, RouteProp } from "@react-navigation/native";

type PhoneInformParams = {
  PhoneInform: {
    idPartner: string;
    idPet: string;
  };
};

export default function PhoneInform({ navigation }: { navigation: any }) {
  const route = useRoute<RouteProp<PhoneInformParams, "PhoneInform">>();
  const { idPartner, idPet } = route.params;

  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePhoneInput = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");
    let formattedValue = cleanedValue;

    if (cleanedValue.length > 2) {
      formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2)}`;
    }
    if (cleanedValue.length > 7) {
      formattedValue = `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(
        2,
        7
      )}-${cleanedValue.slice(7)}`;
    }

    setPhone(formattedValue);
    setError(null); // Limpa o erro ao atualizar o campo
  };

  const handleSubmit = () => {
    const cleanedPhone = phone.replace(/\D/g, ""); // Remove a máscara
    if (cleanedPhone.length !== 11 && cleanedPhone.length !== 0) {
      setError("O telefone deve ter 11 dígitos.");
      return;
    }

    // Navegar para a próxima tela
    navigation.navigate("ReasonInform", { idPartner, idPet, phone });
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

        <CustomTitle>Digite um Telefone para Contato</CustomTitle>

        <Text color={Theme.colors.sealBrown.original} mt={3}>
          Enviaremos um Email para a Parceira responsável pelo nosso Aumiguinho
          para informar o seu interesse. Se possível, informe um telefone com
          acesso ao Whatsapp para facilitar o contato.
        </Text>

        <CustomInput
          placeholder="Digite um telefone para contato"
          iconName="call"
          value={phone}
          keyboardType="numeric"
          onChangeText={handlePhoneInput}
          style={{
            fontSize: 18,
            padding: 5,
          }}
          placeholderTextColor="#888"
        />


        {error && (
          <Box mt={2} bg={Theme.colors.red[500]} borderRadius={8} p={3}>
            <Text color={Theme.colors.white} fontSize="md" fontWeight="bold">
              {error}
            </Text>
          </Box>
        )}

      </VStack>
      <CustomButton
        isLoading={false}
        outlined={false}
        color="white"
        onPress={handleSubmit}
      >
        Avançar
      </CustomButton>
    </ScrollView>
  );
}
