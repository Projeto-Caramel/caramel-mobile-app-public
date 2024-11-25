import React, { useState, useEffect } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  Badge,
  ScrollView,
  Text,
  VStack,
  Wrap,
  Button,
  Icon,
  HStack,
  Spinner,
  Box,
} from "native-base";
import { Theme } from "../../../styles/Theme";
import { CustomAvatar } from "../../../components/CustomAvatar";
import PartnerDetails from "../../../components/PartnerDetails";
import Ionicons from "react-native-vector-icons/Ionicons";
import PhotoGallery from "../../../components/PhotoGallery";
import PetService from "../../../services/PetService";
import PartnerService from "../../../services/PartnerService";
import { NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/RootStackParamList";
import {
  AnimalsSocializationType,
  ChildLoveType,
  CoatType,
  EnergyLevelType,
  PetSex,
  SheddingType,
  SizeType,
  SpecialNeedsType,
  StimulusLevelType,
  TemperamentType,
  translatePetEnum,
} from "../../../utils/Pets/PetsEnums";
import CustomButton from "../../../components/CustomButton";

type PetProfileRouteParams = {
  PetProfile: { petId: string; partnerId: string };
};

export default function PetProfile() {
  const route = useRoute<RouteProp<PetProfileRouteParams, "PetProfile">>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { petId, partnerId } = route.params;

  const [pet, setPet] = useState<any>(null);
  const [partner, setPartner] = useState<any>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  const petService = new PetService();
  const partnerService = new PartnerService();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const petDetails = await petService.getPetById(petId);

        const profileImageBase64 = petDetails.data.info.profileImageUrl
          ? petDetails.data.info.profileImageUrl
          : null;

        setPet({ ...petDetails.data, profileImageBase64 });
      } catch (error) {
        console.error("Erro ao carregar detalhes do pet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [petId]);

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const partnerDetails = await partnerService.getPartnerById(partnerId);
        setPartner(partnerDetails);
      } catch (error) {
        console.error("Erro ao carregar dados do parceiro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [partnerId]);

  useEffect(() => {
    const fetchPetGallery = async () => {
      try {
        const galleryResponse = await petService.getPetGallery(petId);
        const validImages = Array.isArray(galleryResponse.data)
          ? galleryResponse.data
              .filter((item) => item && item.imageUrl)
              .map((item) => ({ uri: item.imageUrl }))
          : [];

        setGalleryImages(validImages);
      } catch (error) {
        console.error("Erro ao carregar galeria do pet:", error);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchPetGallery();
  }, [petId]);

  if (loading) {
    return (
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg={Theme.colors.caramelLight[90]}
      >
        <Spinner color={Theme.colors.sealBrown.original} size="lg" />
      </Box>
    );
  }

  if (!pet) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView bg={Theme.colors.caramelLight[90]}>
      <HStack justifyContent="space-between" alignItems="center" p={5}>
        <Button variant="unstyled" onPress={() => navigation.goBack()}>
          <Icon
            as={Ionicons}
            name="chevron-back"
            size="md"
            color={Theme.colors.sealBrown.original}
          />
        </Button>
      </HStack>

      <CustomAvatar
        image={pet.profileImageBase64}
        userId={petId}
        mt={5}
        isEditable={false}
      />

      <Text
        color={Theme.colors.sealBrown.original}
        textAlign="center"
        fontSize={Theme.fontSizes.xxl}
        fontWeight="bold"
      >
        {pet.info.name}, {calculateAge(pet.info.birthDate)}
      </Text>

      <Text
        color={Theme.colors.sealBrown.original}
        textAlign="center"
        fontSize={Theme.fontSizes.md}
        italic
        mt={2}
        p={1}
      >
        {pet.info.description}
      </Text>

      <Button
        variant="outline"
        backgroundColor={Theme.colors.sealBrown.original}
        onPress={() =>
          navigation.navigate("InterestConfirmation", {
            idPartner: pet.partnerId,
            idPet: pet.id,
          })
        }
        px={6}
        py={2}
        mt={3}
        alignSelf="center"
        width="auto"
        borderRadius={7}
      >
        <Text color={Theme.colors.white} fontSize={Theme.fontSizes.md} bold>
          Tenho Interesse
        </Text>
      </Button>

      <VStack space={3} alignItems="flex-start" p={5}>
        <Text
          color={Theme.colors.sealBrown.original}
          textAlign="center"
          fontSize={Theme.fontSizes.lg}
          fontWeight="bold"
        >
          Saúde
        </Text>
        <Wrap space={2} alignItems="flex-start">
          <Badge
            bgColor={Theme.colors.caramelMedium.original}
            variant="solid"
            borderRadius="md"
            paddingX={5}
            paddingY={3}
          >
            <Text
              fontSize={Theme.fontSizes.sm}
              color={Theme.colors.white}
              fontWeight="bold"
            >
              {pet.healthy.castrated === 1 ? "Castrado" : "Não Castrado"}
            </Text>
          </Badge>
          <Badge
            bgColor={Theme.colors.caramelMedium.original}
            variant="solid"
            borderRadius="md"
            paddingX={5}
            paddingY={3}
          >
            <Text
              fontSize={Theme.fontSizes.sm}
              color={Theme.colors.white}
              fontWeight="bold"
            >
              {pet.healthy.vaccinated === 1 ? "Vacinado" : "Não Vacinado"}
            </Text>
          </Badge>
        </Wrap>

        <Text
          color={Theme.colors.sealBrown.original}
          textAlign="center"
          fontSize={Theme.fontSizes.lg}
          fontWeight="bold"
        >
          Características Físicas
        </Text>
        <Wrap space={2} alignItems="flex-start">
          <Badge bgColor={Theme.colors.sealBrown[40]}>
            <Text color="white">
              Tamanho: {translatePetEnum(pet.caracteristics.size, SizeType)}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.sealBrown[40]}>
            <Text color="white">
              Sexo: {translatePetEnum(pet.caracteristics.sex, PetSex)}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.sealBrown[40]}>
            <Text color="white">
              Pelagem: {translatePetEnum(pet.caracteristics.coat, CoatType)}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.sealBrown[40]}>
            <Text color="white">
              Queda de Pelo:{" "}
              {translatePetEnum(pet.caracteristics.shedding, SheddingType)}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.sealBrown[40]}>
            <Text color="white">
              Energia:{" "}
              {translatePetEnum(
                pet.caracteristics.energyLevel,
                EnergyLevelType
              )}
            </Text>
          </Badge>
        </Wrap>

        <Text
          color={Theme.colors.sealBrown.original}
          textAlign="center"
          fontSize={Theme.fontSizes.lg}
          fontWeight="bold"
        >
          Comportamento
        </Text>
        <Wrap space={2} alignItems="flex-start">
          <Badge bgColor={Theme.colors.licorice[50]}>
            <Text color="white">
              Temperamento:{" "}
              {translatePetEnum(
                pet.caracteristics.temperament,
                TemperamentType
              )}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.licorice[50]}>
            <Text color="white">
              Compatibilidade com Crianças:{" "}
              {translatePetEnum(pet.caracteristics.childLove, ChildLoveType)}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.licorice[50]}>
            <Text color="white">
              Socialização com Animais:{" "}
              {translatePetEnum(
                pet.caracteristics.animalsSocialization,
                AnimalsSocializationType
              )}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.licorice[50]}>
            <Text color="white">
              Necessidades Especiais:{" "}
              {translatePetEnum(
                pet.caracteristics.specialNeeds,
                SpecialNeedsType
              )}
            </Text>
          </Badge>
          <Badge bgColor={Theme.colors.licorice[50]}>
            <Text color="white">
              Nível de Estímulo:{" "}
              {translatePetEnum(
                pet.caracteristics.stimulusLevel,
                StimulusLevelType
              )}
            </Text>
          </Badge>
        </Wrap>

        <Text
          color={Theme.colors.sealBrown.original}
          textAlign="center"
          fontSize={Theme.fontSizes.lg}
          fontWeight="bold"
        >
          Detalhes da ONG
        </Text>
        <Wrap space={2} alignItems="flex-start">
          {partner ? (
            <PartnerDetails
              partner={{
                name: partner.name,
                address: partner.address,
                cellphone: partner.cellphone,
                email: partner.email,
                facebook: partner.facebook,
                instagram: partner.instagram,
              }}
            />
          ) : (
            <Text
              color={Theme.colors.sealBrown.original}
              fontSize={Theme.fontSizes.md}
            >
              Carregando informações da ONG...
            </Text>
          )}
        </Wrap>

        {galleryImages.length > 0 && (
          <>
            <Text
              color={Theme.colors.sealBrown.original}
              textAlign="center"
              fontSize={Theme.fontSizes.lg}
              fontWeight="bold"
            >
              Um pouco mais sobre mim...
            </Text>
            {galleryLoading ? (
              <Box alignItems="center" my={3}>
                <Spinner color={Theme.colors.sealBrown.original} size="lg" />
              </Box>
            ) : (
              <PhotoGallery images={galleryImages} />
            )}
          </>
        )}
      </VStack>
    </ScrollView>
  );
}

const calculateAge = (birthDateString: string) => {
  const birthDate = new Date(birthDateString);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return `${Math.abs(ageDate.getUTCFullYear() - 1970)} anos`;
};
