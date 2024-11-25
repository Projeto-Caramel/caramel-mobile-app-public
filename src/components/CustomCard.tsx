import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Pressable,
  HStack,
  Avatar,
  Text,
  VStack,
  Box,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "../styles/Theme";
import { PetProfileNavigationProp } from "../navigation/RootStackParamList";
import { ImageSourcePropType } from "react-native";
import PartnerService from "../services/PartnerService";
import FavoriteService from "../services/FavoriteService";
import { Alert as RNAlert } from "react-native"; 

interface PetCardProps {
  image: string | null;
  name: string;
  age: string;
  ong: string;
  id: number;
  onRemove?: () => void;
  hideRemoveIcon?: boolean;
}

const PetCard = ({
  image,
  name,
  age,
  ong,
  id,
  onRemove,
  hideRemoveIcon = false,
}: PetCardProps) => {
  const navigation = useNavigation<PetProfileNavigationProp>();
  const [avatarImage, setAvatarImage] = useState<ImageSourcePropType>(
    image ? { uri: image } : require("../assets/Users/defaultImage.png")
  );

  const [partnerName, setPartnerName] = useState("ONG Desconhecida");
  const partnerService = new PartnerService();
  const favoriteService = new FavoriteService();

  useEffect(() => {
    setAvatarImage(
      image ? { uri: image } : require("../assets/Users/defaultImage.png")
    );
  }, [image]);

  useEffect(() => {
    const fetchPartnerName = async () => {
      try {
        const name = await partnerService.getPartnerNameById(ong);
        setPartnerName(name || "ONG Desconhecida");
      } catch (error) {
        console.error("Erro ao buscar nome da ONG:", error);
      }
    };

    if (ong) fetchPartnerName();
  }, [ong]);

  const handleRemoveFavorite = async () => {
    try {
      const userId = await FavoriteService.getUserId();
      if (userId) {
        await favoriteService.removeFavorite(userId, id.toString());
        if (onRemove) onRemove();
      }
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  const confirmRemoveFavorite = () => {
    RNAlert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja remover este pet dos favoritos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: handleRemoveFavorite,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView
      bgColor={Theme.colors.caramelLight[90]}
      contentContainerStyle={{ padding: 5 }}
      w="100%"
    >
      <Box bgColor={Theme.colors.white} borderRadius={10} shadow={5}>
        <HStack
          w="100%"
          p={3}
          space={3}
          borderRadius={10}
          alignItems="flex-start"
        >
          <Avatar source={avatarImage} size="lg" />
          <VStack flex={1} maxW="70%">
            <HStack alignItems="baseline" space={1} flexWrap="wrap">
              <Text
                color={Theme.colors.brown.original}
                fontSize={Theme.fontSizes.lg}
                bold
              >
                {name}
              </Text>

              <Text
                color={Theme.colors.sealBrown.original}
                fontSize={Theme.fontSizes.md}
                bold
              >
                {age} anos
              </Text>
            </HStack>

            <Text
              color={Theme.colors.sealBrown.original}
              fontSize={Theme.fontSizes.md}
              fontWeight={500}
            >
              {partnerName}
            </Text>
          </VStack>
          <HStack space={2}>
            <Pressable
              onPress={() =>
                navigation.navigate("PetProfile", {
                  petId: id.toString(),
                  partnerId: ong,
                })
              }
              bg={Theme.colors.sealBrown.original}
              borderRadius={100}
              justifyContent="center"
              alignItems="center"
              p={3}
            >
              <Ionicons
                name={"search"}
                size={20}
                color={Theme.colors.white}
              />
            </Pressable>
            {!hideRemoveIcon && (
              <Pressable
                onPress={confirmRemoveFavorite}
                bg={Theme.colors.red[500]}
                borderRadius={100}
                justifyContent="center"
                alignItems="center"
                p={3}
              >
                <Ionicons
                  name={"heart-dislike-sharp"}
                  size={20}
                  color={Theme.colors.white}
                />
              </Pressable>
            )}
          </HStack>
        </HStack>
      </Box>
    </ScrollView>
  );
};

export default PetCard;
