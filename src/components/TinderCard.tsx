import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../styles/Theme";
import { Box, VStack, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { PetProfileNavigationProp } from "../navigation/RootStackParamList";
import PartnerService from "../services/PartnerService";
import FavoriteService from "../services/FavoriteService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const TinderCard = ({ pets }) => {
  const navigation = useNavigation<PetProfileNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [partnerName, setPartnerName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [petImages, setPetImages] = useState<string[]>([]); 

  const partnerService = new PartnerService();
  const favoriteService = new FavoriteService();
  const swiperRef = useRef(null);

  useEffect(() => {
    const preloadImages = async () => {
      const images = await Promise.all(
        pets.map(async (pet) => {
          const imageUrl = pet.info.profileImageUrl;
          if (imageUrl) {
            return imageUrl;
          }
          return null;
        })
      );
      setPetImages(images);
    };

    preloadImages(); 
  }, [pets]);

  useEffect(() => {
    const fetchPartnerName = async () => {
      const partnerId = pets[currentIndex]?.partnerId;
      if (partnerId) {
        try {
          const name = await partnerService.getPartnerNameById(partnerId);
          setPartnerName(name);
        } catch (error) {
          console.error("Erro ao buscar nome da ONG:", error);
        }
      }
    };

    const checkIfFavorite = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await favoriteService.fetchFavorites(userId);
          const favoritePets = response.data.pets || [];
          const isAlreadyFavorite = favoritePets.some(
            (favPet) => favPet.id === pets[currentIndex]?.id
          );
          setIsFavorite(isAlreadyFavorite);
        }
      } catch (error) {
        console.error("Erro ao verificar se o pet é favorito:", error);
      }
    };

    fetchPartnerName();
    checkIfFavorite();
  }, [currentIndex, pets]);

  const handleAddFavorite = async () => {
    if (isFavorite) {
      Alert.alert("Atenção", "Este pet já está nos seus favoritos.");
      return;
    }

    const userId = await AsyncStorage.getItem("userId");
    const petId = pets[currentIndex]?.id;

    if (userId && petId) {
      try {
        await favoriteService.addFavorite(userId, petId);
        setIsFavorite(true);
        handleNext();
      } catch (error) {
        console.error("Erro ao adicionar o pet aos favoritos:", error);
      }
    } else {
      console.error("ID do usuário ou do pet não encontrado.");
    }
  };

  const handleNext = () => {
    swiperRef.current?.scrollBy(1);
  };

  const handlePrev = () => {
    swiperRef.current?.scrollBy(-1);
  };

  return (
    <VStack flex={1} width="100%" height="100%" bgColor={Theme.colors.caramelLight[90]}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        index={currentIndex}
        onIndexChanged={(index) => setCurrentIndex(index)}
        containerStyle={styles.cardContainer}
        width={width}
      >
        {pets.map((pet, index) => (
          <ImageBackground
            key={index}
            source={petImages[index] ? { uri: petImages[index] } : require('../assets/Users/defaultImage.png')}
            style={styles.image}
            imageStyle={{ resizeMode: "cover" }}
          >
            <LinearGradient
              colors={[
                "rgba(46, 19, 3, 0.00)",
                "rgba(46, 19, 3, 0.20)",
                "#2E1303",
              ]}
              style={styles.gradientOverlay}
            />
            <VStack justifyContent="flex-end" p={5} width="100%">
              <VStack alignItems="flex-start" justifyContent="space-between" width="100%">
                <Text
                  fontSize="4xl"
                  fontWeight="bold"
                  color="white"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  isTruncated
                  maxWidth="100%"
                  mb={0}
                  lineHeight={34}
                >
                  {pet.info?.name || "Nome desconhecido"}
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="500"
                  color="white"
                  mt="1"
                  mb="2"
                  lineHeight={20}
                >
                  {calculateAge(pet.info?.birthDate) || "Idade desconhecida"}
                </Text>
              </VStack>

              <VStack flexDir="row" alignItems="center">
                <MaterialIcons
                  name="diversity-1"
                  size={24}
                  color={Theme.colors.white}
                />
                <Text fontSize="lg" color="white" ml={2}>
                  {partnerName || "ONG Desconhecida"}
                </Text>
              </VStack>
            </VStack>
            <Box style={styles.buttonsContainer} px="5">
              <TouchableOpacity onPress={handlePrev} style={styles.previousButton}>
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color={Theme.colors.caramelLight[20]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddFavorite} style={styles.FavoritesButtons}>
                <Ionicons name="heart" size={30} color={isFavorite ? Theme.colors.red[300] : Theme.colors.red[500]} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('PetProfile', { petId: pet.id, partnerId: pet.partnerId })}
                style={styles.DetailsButtons}
              >
                <Ionicons
                  name="search"
                  size={30}
                  color={Theme.colors.sealBrown[40]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext} style={styles.NextButtons}>
                <Ionicons
                  name="arrow-forward"
                  size={30}
                  color={Theme.colors.licorice[50]}
                />
              </TouchableOpacity>
            </Box>
          </ImageBackground>
        ))}
      </Swiper>
    </VStack>
  );
};

const calculateAge = (birthDateString) => {
  const birthDate = new Date(birthDateString);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return `${Math.abs(ageDate.getUTCFullYear() - 1970)} anos`;
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "95%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonsContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    paddingBottom: 20
  },
  previousButton: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Theme.colors.caramelLight[20],
  },
  FavoritesButtons: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Theme.colors.red[500],
  },
  DetailsButtons: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Theme.colors.sealBrown[40],
  },
  NextButtons: {
    padding: 12,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Theme.colors.licorice[50],
  },
});


export default TinderCard;
