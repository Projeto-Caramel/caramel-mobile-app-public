import React, { useState } from "react";
import { FlatList, Button, Icon, VStack, Progress, Alert } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import CustomTitle from "../../components/CustomTitle";
import CustomInput from "../../components/CustomInput";
import { passwordSteps } from "../../utils/ResetPassword/ResertPasswordUtil";
import { Theme } from "../../styles/Theme";
import PasswordService from "../../services/ResetPasswordService";

export default function ChangePassword({ navigation }: { navigation: any }) {
  const [numSteps, setNumSection] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordService = new PasswordService();

  // Função para validar email
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    setErrors(null);
  };

  const validatePasswords = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      setErrors("As senhas não correspondem.");
      return false;
    }
    return true;
  };

  const goToNextSection = async () => {
    const currentStep = passwordSteps[numSteps];

    if (currentStep.inputs.some((input) => input.fieldName === "email")) {
      if (!isValidEmail(formData.email)) {
        setErrors("Email inválido. Por favor, insira um email válido.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await passwordService.sendEmailVerificationCode(formData.email);
        if (response.status !== 0) {
          setErrors(response.message);
          return; // Não avança se houver erro ao enviar o código
        }
        alert("Código de verificação enviado para o email.");
      } catch (error) {
        console.log("--------- Entrou no catch ao enviar o código ----------");
        setErrors("Erro ao enviar código de verificação. Verifique se o email digitado é válido ou tente novamente mais tarde.");
        return; // Não avança se houver exceção
      } finally {
        setIsLoading(false);
      }
    }

    if (currentStep.inputs.some((input) => input.fieldName === "code")) {
      try {
        setIsLoading(true);
        const response = await passwordService.sendVerificationCode(formData.email, formData.code);
        if (response.status !== 0) {
          setErrors(response.message);
          return; // Não avança se houver erro ao validar o código
        }
        alert("Código validado com sucesso.");
      } catch (error) {
        console.log("--------- Entrou no catch ao validar o código ----------");
        setErrors("Erro ao validar o código. Verifique se o código digitado está correto ou tente novamente mais tarde.");
        return; // Não avança se houver exceção
      } finally {
        setIsLoading(false);
      }
    }

    if (currentStep.inputs.some((input) => input.fieldName === "newPassword")) {
      if (!validatePasswords()) return;

      try {
        setIsLoading(true);
        const payload = {
          email: formData.email,
          newPassword: formData.newPassword,
        };

        const response = await passwordService.changePassword(payload);
        if (response.status !== 0) {
          setErrors(response.message);
          return; // Não avança se houver erro ao alterar a senha
        }
        alert("Senha alterada com sucesso.");
        navigation.navigate("Login");
      } catch (error) {
        console.log("--------- Entrou no catch ao alterar a senha ----------");
        setErrors("Erro ao alterar a senha. Tente novamente mais tarde.");
        return; // Não avança se houver exceção
      } finally {
        setIsLoading(false);
      }
    }

    // Apenas avança se não houver erros em nenhuma das etapas
    if (!errors && numSteps < passwordSteps.length - 1) {
      setNumSection(numSteps + 1);
    }
  };

  const goToPreviousSection = () => {
    if (numSteps > 0) {
      setErrors(null);
      setNumSection(numSteps - 1);
    } else {
      setErrors(null);
      navigation.goBack();
    }
  };

  const currentStep = passwordSteps[numSteps];
  const progress = Math.round(((numSteps + 1) / passwordSteps.length) * 100);

  return (
    <FlatList
      data={[currentStep]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={() => (
        <VStack mt={4} mb={10} p={5} bgColor={Theme.colors.caramelLight[90]}>
          <Button
            variant="unstyled"
            onPress={goToPreviousSection}
            alignSelf="flex-start"
            mb={5}
          >
            <Icon as={Ionicons} name="chevron-back" size="md" color="black" />
          </Button>

          <Progress
            value={progress}
            _filledTrack={{
              bg: Theme.colors.sealBrown.original,
            }}
            mb={5}
          />

          <CustomTitle>{currentStep.inputs[0].label}</CustomTitle>

          {currentStep.inputs.map((input) => (
            <CustomInput
              key={input.fieldName}
              placeholder={input.placeholder}
              iconName={input.icon}
              hidePassword={input.secureTextEntry}
              value={formData[input.fieldName]}
              onChangeText={(value) => handleInputChange(input.fieldName, value)}
            />
          ))}

          {errors && (
            <Alert w="100%" status="error" mt={2}>
              {errors}
            </Alert>
          )}

          <CustomButton
            isLoading={isLoading}
            onPress={goToNextSection}
            outlined={false}
            color="white"
            mt={5}
          >
            Avançar
          </CustomButton>
        </VStack>
      )}
    />
  );
}
