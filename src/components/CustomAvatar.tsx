import React, { useState, useEffect } from "react";
import { Avatar, IAvatarProps, VStack } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Theme } from "../styles/Theme";
import { ImageSourcePropType, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { updateProfileImage } from "../services/ProfileImageService"; // Atualize conforme sua implementação

interface CustomAvatarProps extends IAvatarProps {
  image: string | null; // String base64 ou URL
  userId: string;
  isEditable?: boolean; // Controla se a imagem pode ser editada
}

export function CustomAvatar({ image, userId, isEditable = true }: CustomAvatarProps) {
  const [profileImage, setProfileImage] = useState<ImageSourcePropType>(
    image ? { uri: image } : require("../assets/Users/defaultImage.png")
  );

  useEffect(() => {
    setProfileImage(
      image ? { uri: image } : require("../assets/Users/defaultImage.png")
    );
  }, [image]);

  // Função para selecionar a imagem da galeria e convertê-la para base64
  const selectImageFromGallery = async (): Promise<string | null> => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permissão para acessar a galeria é necessária!");
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1, // Qualidade máxima
        base64: true, // Gera a string base64
      });

      if (!result.canceled) {
        return result.assets[0].base64 || null; // Retorna a string base64 da imagem
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
    return null;
  };

  // Função para lidar com o clique no avatar
  const handleAvatarClick = async () => {
    if (!isEditable) return;

    try {
      const base64Image = await selectImageFromGallery();
      if (base64Image) {
        console.log("Imagem selecionada (base64):", base64Image);

        // Atualiza a imagem no servidor
        await updateProfileImage(userId, base64Image);

        // Atualiza a imagem no estado
        setProfileImage({ uri: `data:image/jpeg;base64,${base64Image}` });
        console.log("Imagem de perfil atualizada com sucesso.");
      } else {
        console.log("Nenhuma imagem selecionada.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a imagem de perfil:", error);
    }
  };

  return (
    <VStack alignSelf="center" p={2}>
      {isEditable ? (
        <TouchableOpacity onPress={handleAvatarClick} activeOpacity={0.7}>
          <LinearGradient
            colors={["#FDD196", "#98410A"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              borderRadius: 100,
              padding: 3,
            }}
          >
            <VStack
              borderRadius={100}
              borderWidth={3}
              borderColor={Theme.colors.caramelLight[90]}
              bg={Theme.colors.sealBrown.original}
              alignSelf="flex-start"
            >
              <Avatar alignSelf="center" size="2xl" source={profileImage} />
            </VStack>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View>
          <LinearGradient
            colors={["#FDD196", "#98410A"]}
            start={[0, 0]}
            end={[1, 1]}
            style={{
              borderRadius: 100,
              padding: 3,
            }}
          >
            <VStack
              borderRadius={100}
              borderWidth={3}
              borderColor={Theme.colors.caramelLight[90]}
              bg={Theme.colors.sealBrown.original}
              alignSelf="flex-start"
            >
              <Avatar alignSelf="center" size="2xl" source={profileImage} />
            </VStack>
          </LinearGradient>
        </View>
      )}
    </VStack>
  );
}
