import React, { useEffect } from "react";
import { VStack, Text, Center, Button } from "native-base";
import { Theme } from "../../../styles/Theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRoute, RouteProp } from "@react-navigation/native";
import RegisterService from "../../../services/RegisterService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type InterestSendedParams = {
  InterestSended: {
    idPartner: string;
    idPet: string;
    phone: string;
    reason: string;
  };
};

export default function InterestSended({ navigation }: { navigation: any }) {
  const route = useRoute<RouteProp<InterestSendedParams, "InterestSended">>();
  const { idPartner, idPet, phone, reason } = route.params;

  useEffect(() => {
    const sendInterestEmail = async () => {
      try {
        const registerService = new RegisterService();

        const adopterId = await AsyncStorage.getItem("userId");
        if (!adopterId) {
          console.error("ID do adotante não encontrado.");
          return;
        }

        const response = await registerService.sendInterestEmail(adopterId, idPet, idPartner, phone, reason);
        console.log("E-mail de interesse enviado com sucesso!", response);
      } catch (error) {
        console.error("Erro ao enviar e-mail de interesse:", error);
      }
    };

    sendInterestEmail();
  }, [idPartner, idPet, phone, reason, navigation]);

  const handleGoBack = () => {
    navigation.navigate("Tabs");
  };

  return (
    <Center flex={1} bgColor={Theme.colors.caramelLight[90]} p={10}>
      <VStack alignItems="center">
        <Ionicons
          name="checkmark-circle-sharp"
          size={100}
          color={Theme.colors.sealBrown.original}
        />

        <Text fontSize="3xl" bold color={Theme.colors.brown.original}>
          Email Enviado
        </Text>
        <Text
          fontSize="md"
          bold
          color={Theme.colors.sealBrown.original}
          textAlign="center"
          mt={10}
        >
          Você receberá uma cópia do email enviado à ONG.
        </Text>
        <Text></Text>

        <Text
          fontSize="md"
          bold
          color={Theme.colors.sealBrown.original}
          textAlign="center"
        >
          Nossa parceira irá entrar em contato o quanto antes para dar
          continuidade ao processo!
        </Text>

        <Button
          variant="outline"
          backgroundColor={Theme.colors.sealBrown.original}
          onPress={handleGoBack}
          px={6}
          py={3}
          mt={5}
          alignSelf="center"
          width="auto"
          borderRadius={7}
          alignItems="center"
          justifyContent="center"
        >
          <Text
            color={Theme.colors.white}
            fontSize={Theme.fontSizes.lg}
            bold
            textAlign="center"
          >
            Voltar para a Página Inicial
          </Text>
        </Button>


      </VStack>
    </Center>
  );
}
