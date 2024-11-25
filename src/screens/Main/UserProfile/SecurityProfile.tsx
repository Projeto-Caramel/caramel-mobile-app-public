import { CustomAvatar } from "../../../components/CustomAvatar";
import { Theme } from "../../../styles/Theme";
import { Text, VStack, ScrollView, Button, Icon, Alert } from "native-base";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdopterService from "../../../services/AdopterService";
import { getCharacteristics } from "../../../utils/Profile/TemporaryPerfilUtil";
import LoginService from "../../../services/LoginService";

const imageUrlToBase64 = async (url: string): Promise<string | null> => {
  if (!url) return null;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Erro ao buscar a imagem:", response.statusText);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binaryString = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binaryString += String.fromCharCode(bytes[i]);
    }
    const base64String = btoa(binaryString);
    return `${base64String}`; // Substitua "jpeg" pelo tipo real se necessário
  } catch (error) {
    console.error("Erro na conversão de URL para Base64:", error);
    return null;
  }
};

export default function EditProfile({ navigation }: { navigation: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o carregamento
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userCharacteristics, setUserCharacteristics] = useState([]);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const adopterService = new AdopterService();
  const loginService = new LoginService();

  useEffect(() => {
    fetchData();
  }, []);

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

        setEmail(user.email);
        setName(user.name || "Usuário");
        setAge(calculateAge(user.birthday));
        setProfileImage(user.profileImageUrl || null);

        const characteristicsArray = getCharacteristics(user);
        setUserCharacteristics(characteristicsArray);
      } else {
        console.error("Erro ao recuperar os dados do usuário:", response.description);
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

  const handleLogin = async () => {
    try {
      const response = await loginService.authenticate(email, password);
      if (response && response.status === 0) {
        const token = response.token.token;
        const userId = response.token.id;
        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("userId", userId);
        return true;
      } else {
        setError("Erro ao autenticar após registro. Tente novamente.");
        return false;
      }
    } catch (error) {
      console.error("Erro na autenticação:", error);
      setError("Erro ao tentar mudar a senha. Tente novamente mais tarde.");
      return false;
    }
  };

  const handlePasswordChange = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const response = await loginService.changeAdopterPassword(userId, email, newPassword, token);

      if (response && response.status === 0) {
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setIsEditing(false);
        setShowEditButton(true);
        return true;
      } else {
        setError("Erro ao alterar a senha.");
        return false;
      }
    } catch (error) {
      console.error("Erro na troca de senha:", error);
      setError("Erro ao tentar alterar a senha. Tente novamente mais tarde.");
      return false;
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowEditButton(false);
  };

  function validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return passwordRegex.test(password);
  }

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (newPassword.trim().length == 0 || password.trim().length == 0) {
      setError("Preencha todas as senhas.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError("A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.");
      return;
    }

    setIsLoading(true); // Inicia o carregamento

    try {
      const loginSuccess = await handleLogin();
      if (!loginSuccess) {
        setError("Erro ao autenticar. Verifique suas credenciais.");
        return;
      }

      const passwordChangeSuccess = await handlePasswordChange();
      if (passwordChangeSuccess) {
        setIsEditing(false);
        setShowEditButton(true);
        setError("");
        console.log("Senha alterada com sucesso!");
      } else {
        setError("Erro ao alterar a senha.");
      }
    } catch (error) {
      console.error("Erro durante o processo de salvar:", error);
      setError("Erro ao tentar salvar as mudanças. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setShowEditButton(true);
  };

  return (
    <ScrollView
      flexDirection="column"
      width="100%"
      height="100%"
      bg={Theme.colors.caramelLight[90]}
    >
      <Button
        variant="unstyled"
        onPress={() => {
          navigation.goBack();
        }}
        alignSelf="flex-start"
        mb={5}
      >
        <Icon as={Ionicons} name="chevron-back" size="md" color="black" />
      </Button>

      <Text
        color={Theme.colors.sealBrown.original}
        textAlign="center"
        fontSize={Theme.fontSizes.xxl}
        fontWeight="bold"
      >
        Alteração de senha
      </Text>

      <VStack space={3} alignItems="flex-start" p={5} width="100%">
        <CustomInput
          placeholder="Digite seu Email"
          iconName="mail"
          hidePassword={false}
          isDisabled={true}
          value={email}
        />

        {!showEditButton ? (
          <>
            <CustomInput
              placeholder="Digite a senha atual"
              iconName="lock-closed"
              hidePassword={true}
              isDisabled={!isEditing}
              value={password}
              onChangeText={setPassword}
            />
            <CustomInput
              placeholder="Digite a nova senha"
              iconName="lock-closed"
              hidePassword={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <CustomInput
              placeholder="Confirme a nova senha"
              iconName="lock-closed"
              hidePassword={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </>
        ) : (
          <Text color={Theme.colors.brown.original} fontSize="md">
              Clique abaixo para alterar sua senha.
            </Text>
        )
      }

        {error && !showEditButton && (
          <Alert w="100%" status="error" mt={2}>
            {error}
          </Alert>
        )}

        {showEditButton ? (
          <CustomButton onPress={handleEdit} outlined={false} mt={5} color="white" isLoading={false}>
            Deseja mudar a sua senha?
          </CustomButton>
        ) : (
          <VStack flex={1} width="100%">
            <CustomButton onPress={handleSave} outlined={false} mt={5} color="white" isLoading={isLoading}>
              Salvar
            </CustomButton>
            <CustomButton
              isLoading={false}
              onPress={handleCancel}
              outlined={true}
              outlinedColor={Theme.colors.sealBrown.original}
              color={Theme.colors.sealBrown.original}
              mt={5}
            >
              Cancelar
            </CustomButton>
          </VStack>
        )}
      </VStack>
    </ScrollView>
  );
}
