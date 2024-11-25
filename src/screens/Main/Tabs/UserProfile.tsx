import React, { useState, useEffect } from "react";
import { CustomAvatar } from "../../../components/CustomAvatar";
import { Theme } from "../../../styles/Theme";
import { View, Text, HStack, VStack, Wrap, Badge } from "native-base";
import ProfileButton from "../../../components/ProfileButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdopterService from "../../../services/AdopterService";
import { getCharacteristics } from "../../../utils/Profile/TemporaryPerfilUtil";
import { useIsFocused } from "@react-navigation/native";

export default function Perfil({ navigation }: { navigation: any }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [birthday, setBirthday] = useState<string>("");
  const [userCharacteristics, setUserCharacteristics] = useState([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0); // Força re-renderização
  const isFocused = useIsFocused();

  const adopterService = new AdopterService();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) {
        console.error("ID do usuário não encontrado");
        return;
      }

      setUserId(storedUserId);

      const response = await adopterService.getAdopterById(storedUserId);

      if (response.status === 0) {
        const user = response.data;

        setName(user.name || "Usuário");
        setBirthday(user.birthday);
        setAge(calculateAge(user.birthday));

        // Atualiza a URL da imagem de perfil com um timestamp para invalidar cache
        const profileImageUrl = user.profileImageUrl
          ? `${user.profileImageUrl}?timestamp=${new Date().getTime()}`
          : null;
        setProfileImage(profileImageUrl);

        const characteristicsArray = getCharacteristics(user);
        setUserCharacteristics(characteristicsArray);

        // Força re-renderização do avatar
        setRefreshKey((prevKey) => prevKey + 1);
      } else {
        console.error(
          "Erro ao recuperar os dados do usuário:",
          response.description
        );
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      name,
      age,
      profileImage,
      birthday,
      characteristics: userCharacteristics || [],
    });
  };

  return (
    <View
      flexDirection="column"
      width="100%"
      height="100%"
      bg={Theme.colors.caramelLight[90]}
    >
      <CustomAvatar
        key={refreshKey} // Força a atualização do componente
        userId={userId || ""}
        image={profileImage} // A imagem será atualizada ao focar na tela
        isEditable={false}
      />

      <Text
        color={Theme.colors.sealBrown.original}
        textAlign="center"
        fontSize={Theme.fontSizes.xxl}
        fontWeight="bold"
      >
        {name}, {age}
      </Text>

      <HStack alignItems="center" justifyContent="center" space={10}>
        <ProfileButton
          iconName="shield-checkmark-sharp"
          label="Credenciais"
          principal={false}
          onPress={() => navigation.navigate("SecurityProfile")}
        />
        <ProfileButton
          iconName="brush"
          label="Editar"
          principal={true}
          onPress={handleEditProfile}
        />
        <ProfileButton
          iconName="log-out"
          label="Sair"
          principal={false}
          onPress={() => navigation.navigate("Initial")}
        />
      </HStack>

      <VStack space={3} alignItems="flex-start" p={5}>
        <Text
          color={Theme.colors.sealBrown.original}
          textAlign="center"
          fontSize={Theme.fontSizes.lg}
          fontWeight="bold"
        >
          Características
        </Text>
        <Wrap space={2} alignItems="flex-start" flexDirection="row">
          {userCharacteristics.map((c) => (
            <Badge
              key={c.id}
              bgColor={c.color}
              variant="solid"
              borderRadius="md"
              paddingX={5}
              paddingY={3}
              fontSize={Theme.fontSizes["2xl"]}
            >
              <Text
                fontSize={Theme.fontSizes.sm}
                color={Theme.colors.white}
                fontWeight="bold"
              >
                {c.title}
              </Text>
            </Badge>
          ))}
        </Wrap>
      </VStack>
    </View>
  );
}
