import React, { useEffect, useState } from "react";
import { ScrollView, VStack, Text, Image, Center } from "native-base";
import { Theme } from "../../../styles/Theme";
import SugestionService from "../../../services/SugestionService";
import PetCard from "../../../components/CustomCard";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Sugestion() {
  const [title, setTitle] = useState("Analisando os pets");
  const [subtitle, setSubtitle] = useState(
    "Estamos verificando as melhores opções de pets para você..."
  );
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadSuggestedPets = async () => {
        try {
          setTitle("Aguarde um instante");
          setSubtitle(
            "Estamos verificando as melhores opções de pets para você..."
          );

          const storedUserId = await AsyncStorage.getItem("userId");

          const recommendedPets = await SugestionService.fetchSuggestedPets(
            storedUserId
          );

          if (recommendedPets && recommendedPets.length > 0) {
            setTitle("Pronto!");
            setSubtitle("Aqui estão os pets que combinam com seu perfil:");
            setPets(recommendedPets);
          } else {
            setTitle("Nenhuma sugestão encontrada");
            setSubtitle("Infelizmente, não encontramos pets compatíveis.");
          }
        } catch (error) {
          setTitle("Erro ao buscar sugestões");
          setSubtitle("Não foi possível carregar as sugestões de pets.");
        } finally {
          setLoading(false);
        }
      };

      loadSuggestedPets();
    }, [])
  );

  return (
    <ScrollView
      bgColor={Theme.colors.caramelLight[90]}
      contentContainerStyle={{ padding: 10 }}
    >
      {loading ? (
        <Center flex={1} bgColor={Theme.colors.caramelLight[90]} p={10}>
          <VStack alignItems="center" space={5}>
            <Image
              source={require("../../../assets/Gifs/sparkles.gif")}
              alt="Magic Icon"
              size={125}
            />
            <Text
              fontSize="3xl"
              bold
              color={Theme.colors.brown.original}
              textAlign="center"
            >
              {title}
            </Text>
            <Text
              fontSize="md"
              bold
              color={Theme.colors.sealBrown.original}
              textAlign="center"
            >
              {subtitle}
            </Text>
          </VStack>
        </Center>
      ) : (
        <VStack alignItems="center" width="100%">
          <Text
            fontSize="3xl"
            bold
            color={Theme.colors.brown.original}
            textAlign="center"
          >
            Sugestões de Aumigos
          </Text>
          <Text
            fontSize="md"
            bold
            color={Theme.colors.sealBrown.original}
            textAlign="center"
            mb={3}
          >
            Estes são os 5 pets que mais combinam com você
          </Text>

          {pets.map((pet) => {
            console.log("Pet:", pet);
            return (
              <PetCard
                key={pet.id}
                image={pet.info.profileImageUrl}
                name={pet.info.name}
                age={(
                  new Date().getFullYear() -
                  new Date(pet.info.birthDate).getFullYear()
                ).toString()}
                ong={pet.partnerId}
                id={pet.id}
                hideRemoveIcon={true}
              />
            );
          })}
        </VStack>
      )}
    </ScrollView>
  );
}
