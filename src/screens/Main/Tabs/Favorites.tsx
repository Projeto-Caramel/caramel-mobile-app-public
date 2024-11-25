import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, Center, VStack, Text } from "native-base";
import { Theme } from "../../../styles/Theme";
import PetCard from "../../../components/CustomCard";
import FavoriteService from "../../../services/FavoriteService";
import { useFocusEffect } from "@react-navigation/native";

const favoriteService = new FavoriteService();

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Carregando favoritos");
  const [subtitle, setSubtitle] = useState(
    "Aguarde enquanto carregamos seus pets favoritos..."
  );

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const userId = await FavoriteService.getUserId();
      if (!userId) {
        setTitle("Usuário não encontrado");
        setSubtitle("Não foi possível carregar seus favoritos.");
        setLoading(false);
        return;
      }

      const response = await favoriteService.fetchFavorites(userId);
      console.log("Resposta da API:", response);
      const favoritePets = response?.data?.pets || [];
      console.log("Número de pets favoritos:", favoritePets.length);

      if (Array.isArray(favoritePets) && favoritePets.length > 0) {
        const formattedPets = favoritePets.map((pet) => ({
          id: pet.id,
          name: pet.info.name,
          age: (
            new Date().getFullYear() -
            new Date(pet.info.birthDate).getFullYear()
          ).toString(),
          ong: pet.partnerId,
          image: pet.info.profileImageUrl,
        }));
        setFavorites(formattedPets);
        setTitle("Atualizando seus pets favoritos...");
        setSubtitle("");
      } else {
        setFavorites([]);
        setTitle("Nenhum favorito encontrado");
        setSubtitle("Você ainda não tem pets favoritos.");
      }
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      setTitle("Erro ao buscar favoritos");
      setSubtitle("Não foi possível carregar seus pets favoritos.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Executa loadFavorites toda vez que a aba for aberta
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  return (
    <ScrollView
      bgColor={Theme.colors.caramelLight[90]}
      contentContainerStyle={{ padding: 10 }}
    >
      {loading ? (
        <Center flex={1} bgColor={Theme.colors.caramelLight[90]} p={10}>
          <VStack alignItems="center" space={5}>
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
      ) : favorites.length > 0 ? (
        <VStack alignItems="center" width="100%">
          <Text
            fontSize="3xl"
            bold
            color={Theme.colors.brown.original}
            textAlign="center"
          >
            Aumigos favoritos
          </Text>
          <Text
            fontSize="md"
            bold
            color={Theme.colors.sealBrown.original}
            textAlign="center"
            mb={3}
          >
            Estes são os pets que você mais gostou. Entre em contato com as ONGs
            para saber mais!
          </Text>

          {favorites.map((pet) => (
            <PetCard
              key={pet.id}
              image={pet.image}
              name={pet.name}
              age={pet.age}
              ong={pet.ong}
              id={pet.id}
              onRemove={loadFavorites}
            />
          ))}
        </VStack>
      ) : (
        <Center flex={1} bgColor={Theme.colors.caramelLight[90]} p={10}>
          <VStack alignItems="center" space={5}>
            <Text
              fontSize="3xl"
              bold
              color={Theme.colors.brown.original}
              textAlign="center"
            >
              Sem favoritos por enquanto
            </Text>
            <Text
              fontSize="md"
              color={Theme.colors.sealBrown.original}
              textAlign="center"
            >
              Explore os perfis e adicione seus pets preferidos aos favoritos!
            </Text>
          </VStack>
        </Center>
      )}
    </ScrollView>
  );
}
