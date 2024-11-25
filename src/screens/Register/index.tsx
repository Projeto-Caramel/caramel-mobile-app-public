import React, { useState } from "react";
import { FlatList, Button, Icon, VStack, Progress, Alert } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/CustomButton";
import CustomTitle from "../../components/CustomTitle";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import { steps } from "../../utils/Register/FormStepsUtil";
import { Theme } from "../../styles/Theme";
import RegisterService from "../../services/RegisterService";
import LoginService from "../../services/LoginService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({ navigation }: { navigation: any }) {
  const [numSteps, setNumSection] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    residenceType: null,
    lifestyle: null,
    dogExperience: null,
    hasChildren: null,
    financialSituation: null,
    freeTime: null,
    email: "",
    identity: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerService = new RegisterService();
  const loginService = new LoginService();

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
    setErrors(null);
  };

  const handleDateInput = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    let maskedValue = cleanedValue;
    if (cleanedValue.length > 2) maskedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    if (cleanedValue.length > 4) maskedValue = `${maskedValue.slice(0, 5)}/${cleanedValue.slice(4, 8)}`;
    setFormData((prevState) => ({
      ...prevState,
      birthday: maskedValue,
    }));
    setErrors(null);
  };

  const validateBirthday = (value: string) => {
    const dateRegex = /^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(value)) return "Data de nascimento inválida. Use o formato dd/MM/yyyy.";

    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return "Data de nascimento inválida.";
    }
    if (date >= new Date()) {
      return "A data de nascimento deve ser no passado.";
    }
    return null;
  };

  const handleDateSubmission = () => {
    const validationError = validateBirthday(formData.birthday);
    if (validationError) {
      setErrors(validationError);
      return false;
    }
    const [day, month, year] = formData.birthday.split("/").map(Number);
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    handleInputChange("birthday", formattedDate);
    return true;
  };

  async function handleEmailValidation(): Promise<boolean> {
    try {
      const emailExists = await registerService.validateEmail(formData.email);
      if (emailExists) {
        setErrors("O e-mail já está cadastrado. Por favor, utilize outro e-mail. Se você não lembra a sua senha, acesse a tela de recuperação de senha!");
        return false;
      }
      return true;
    } catch (error) {
      setErrors("Erro ao validar o e-mail. Tente novamente mais tarde.");
      return false;
    }
  }

  async function handleEmailVerification(): Promise<boolean> {
    try {
      const isEmailValid = await handleEmailValidation();
      if (!isEmailValid) return false;

      const response = await registerService.sendEmailVerificationCode(formData.email);
      if (response.status === 0) {
        alert("Código de verificação enviado para o e-mail.");
        return true;
      } else {
        setErrors("Erro ao enviar código de verificação de e-mail. Verifique o endereço e tente novamente.");
        return false;
      }
    } catch (error) {
      setErrors("Erro ao enviar código de verificação de e-mail.");
      return false;
    }
  }

  async function handleCodeVerification() {
    try {
      const response = await registerService.sendVerificationCode(formData.email, formData.identity);
      if (response.status === 0) {
        alert("Código de verificação validado com sucesso.");
        return true;
      } else {
        setErrors("Código de verificação inválido. Por favor, tente novamente.");
        return false;
      }
    } catch (error) {
      setErrors("Código de verificação inválido. Por favor, tente novamente.");
      return false;
    }
  }

  const goToNextSection = async () => {
    const currentStep = steps[numSteps];

    for (const input of currentStep.inputs) {
      const value = formData[input.fieldName];
      if (!value || value === "") {
        setErrors(`Preencha o campo antes de avançar a próxima etapa.`);
        return;
      }

      if (input.fieldName === "email" && !validateEmail(value)) {
        setErrors("Por favor, insira um e-mail válido.");
        return;
      }

      if (input.fieldName === "password" && !validatePassword(value)) {
        setErrors("A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.");
        return;
      }
    }

    if (currentStep.inputs.some((input) => input.fieldName === "confirmPassword")) {
      const { password, confirmPassword } = formData;
      if (password !== confirmPassword) {
        setErrors("A confirmação da senha não corresponde à senha.");
        return;
      }
    }

    if (currentStep.inputs.some((input) => input.fieldName === "birthday")) {
      if (!handleDateSubmission()) {
        return;
      }
    }

    if (currentStep.inputs.some((input) => input.fieldName === "email")) {
      const emailVerified = await handleEmailVerification();
      if (!emailVerified) return;
    }

    if (currentStep.inputs.some((input) => input.fieldName === "identity")) {
      const codeVerified = await handleCodeVerification();
      if (!codeVerified) return;
    }

    setIsLoading(true);

    try {
      if (numSteps < steps.length - 1) {
        setNumSection(numSteps + 1);
        setErrors(null);
      } else {
        const payload = {
          name: formData.name,
          birthday: formData.birthday,
          residencyType: Number(formData.residenceType),
          lifestyle: Number(formData.lifestyle),
          petExperience: Number(formData.dogExperience),
          hasChildren: Number(formData.hasChildren),
          financialSituation: Number(formData.financialSituation),
          freeTime: Number(formData.freeTime),
          email: formData.email,
          password: formData.password,
        };

        const response = await registerService.registerUser(payload);

        if (response.status === 0) {
          const responseLogin = await loginService.authenticate(formData.email.toLowerCase(), formData.password);

          if (responseLogin && responseLogin.status === 0) {
            const token = responseLogin.token.token;
            const userId = responseLogin.token.id;

            await AsyncStorage.setItem("authToken", token);
            await AsyncStorage.setItem("userId", userId);

            navigation.navigate("Welcome", { formData });
          } else {
            setErrors("Erro ao autenticar após registro.");
          }
        } else {
          setErrors("Erro ao registrar. Tente novamente.");
        }
      }
    } catch (error: any) {
      setErrors(error.message || "Erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousSection = () => {
    if (numSteps > 0) {
      setErrors(null);
      setNumSection(numSteps - 1);
    } else {
      setErrors(null);
      navigation.navigate("Initial");
    }
  };

  const currentStep = steps[numSteps];
  const progress = Math.floor(((numSteps + 1) / steps.length) * 100); // Usando Math.floor para garantir valor inteiro

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

          {currentStep.inputs.map((input) =>
            input.type === "input" && input.fieldName === "birthday" ? (
              <CustomInput
                key={input.fieldName}
                placeholder={input.placeholder}
                iconName={input.icon}
                keyboardType="numeric"
                value={formData.birthday}
                onChangeText={(value) => handleDateInput(value)}
              />
            ) : input.type === "input" ? (
              <CustomInput
                key={input.fieldName}
                placeholder={input.placeholder}
                iconName={input.icon}
                hidePassword={input.secureTextEntry}
                value={formData[input.fieldName]}
                onChangeText={(value) => handleInputChange(input.fieldName, value)}
              />
            ) : (
              <CustomSelect
                key={input.fieldName}
                placeholder={input.placeholder}
                iconName={input.icon}
                items={input.options}
                selectedValue={formData[input.fieldName]}
                onValueChange={(value) => handleInputChange(input.fieldName, value)}
              />
            )
          )}

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

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password: string): boolean {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  return passwordRegex.test(password);
}
