import React, { useState } from "react";
import { ScrollView, Button, Icon, VStack, Alert, Text } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import CustomTitle from "../../components/CustomTitle";
import CustomInput from "../../components/CustomInput";
import { Theme } from "../../styles/Theme";
import ApiService from "../../services/ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }: { navigation: any }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleLogin = async () => {
    const apiService = new ApiService("{ApiGateway}");
    setIsLoading(true);

    try {
      const payload = {
        email: formData.email.toLocaleLowerCase(),
        password: formData.password,
      };

      const response = await apiService.post<typeof payload, any>("/auth/adopter/authenticate", payload);

      if (response && response.status === 0) {
        const token = response.token.token;
        const userId = response.token.id;

        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("userId", userId);

        navigation.navigate("Welcome", { formData: response });
      } else {
        setError("Email ou senha incorretos.");
      }
    } catch (error: any) {
      if (
        error === "Unauthorized" ||
        error.message === "Unauthorized" ||
        error?.description === "Request Inválida" ||
        (error?.errorDetails && (
          error.errorDetails.includes("E-mail inválido.") ||
          error.errorDetails.includes("O E-mail é obrigatório.")
        ))
      ) {
        setError("Email ou senha incorretos.");
      } else {
        console.error("Erro na autenticação:", error);
        setError("Erro ao tentar se autenticar. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      flex={1}
      p={5}
      showsVerticalScrollIndicator={false}
      bgColor={Theme.colors.caramelLight[90]}
    >
      <VStack mt={4} mb={10}>
        <Button
          variant="unstyled"
          onPress={() => navigation.navigate("Initial")}
          alignSelf="flex-start"
          mb={5}
        >
          <Icon as={Ionicons} name="chevron-back" size="md" color="black" />
        </Button>

        <CustomTitle>Login</CustomTitle>       

        <CustomInput
          placeholder="Digite seu Email"
          iconName="mail"
          hidePassword={false}
          outlineColor="white"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

        <CustomInput
          placeholder="Digite a sua Senha"
          iconName="lock-closed"
          hidePassword={true}
          outlineColor="white"
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
        />

        {error && (
          <Alert w="100%" status="error" mt={2}>
            <Text color="black">{error}</Text>
          </Alert>
        )}
        
      </VStack>
      <CustomButton isLoading={isLoading} onPress={handleLogin} outlined={false} color="white">
        Avançar
      </CustomButton>
    </ScrollView>
  );
}
