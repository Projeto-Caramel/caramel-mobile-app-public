// services/ProfileImageService.tsx
import ApiService from "./ApiService";
import * as ImagePicker from "expo-image-picker";

const api = new ApiService(
  "{ApiGateway}users-control"
);

export async function updateProfileImage(
  userId: string,
  base64Image: string
): Promise<void> {
  const endpoint = `/adopters/profile-image?id=${userId}`;
  const body = { base64Image: base64Image };

  await api.put(endpoint, body);
}

export async function selectImageFromGallery(): Promise<string | null> {
  // Solicita permissão para acessar a galeria
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert("Permission to access gallery is required!");
    return null;
  }

  // Abre a galeria com qualidade de imagem em 50%
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true,
    quality: 0.25, // Define a qualidade para 50%
  });

  // Verifica se a seleção foi cancelada e retorna a imagem em base64
  if (!result.canceled && result.assets && result.assets[0].base64) {
    return result.assets[0].base64;
  }

  return null;
}
