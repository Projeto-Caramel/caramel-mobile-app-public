import React, { useState, useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { CustomAvatar } from "../../../components/CustomAvatar";
import { Theme } from "../../../styles/Theme";
import { Text, VStack, ScrollView, Button, Icon } from "native-base";
import CustomSelect from "../../../components/CustomSelect";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createInputs } from "../../../utils/Profile/EditInputsUtil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdopterService from "../../../services/AdopterService";
import { format, parse } from "date-fns";

interface EditProfileParams {
  name: string;
  age: number;
  profileImage: string | null;
  birthday: string;
  characteristics: { id: number; title: string; value: number; options: string[] }[];
}

export default function EditProfile({ navigation }: { navigation: any }) {
  const route = useRoute<RouteProp<{ params: EditProfileParams }, "params">>();
  const { name, age, profileImage, birthday, characteristics } = route.params || {};

  const [userId, setUserId] = useState<string | null>(null);
  const initialInputs = createInputs({ name, age }, characteristics);
  const [inputsState, setInputsState] = useState(initialInputs);
  const [birthDate, setBirthDate] = useState<string>(
    birthday ? format(parse(birthday, "yyyy-MM-dd", new Date()), "dd/MM/yyyy") : ""
  );
  const [profileImageBase64, setProfileImageBase64] = useState<string | null>(null);

  const adopterService = new AdopterService();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };

    fetchUserId();
    setProfileImageBase64(profileImage);
  }, []);

  const handleDateInput = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos
    let maskedValue = cleanedValue;
    if (cleanedValue.length > 2) maskedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    if (cleanedValue.length > 4) maskedValue = `${maskedValue.slice(0, 5)}/${cleanedValue.slice(4, 8)}`;
    setBirthDate(maskedValue);
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

  const handleInputChange = (id: number, newValue: string) => {
    setInputsState(prevState =>
      prevState.map(input => (input.id === id ? { ...input, value: newValue } : input))
    );
  };

  const handleSave = async () => {
    const validationError = validateBirthday(birthDate);
    if (validationError) {
      alert(validationError);
      return;
    }

    const formattedDate = format(parse(birthDate, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
    const { payload, invalidFields } = validateAndPreparePayload(inputsState);
    if (invalidFields.length > 0) {
      alert(`Por favor, preencha os seguintes campos: ${invalidFields.join(", ")}`);
      return;
    }

    payload.birthday = formattedDate;

    try {
      if (!userId) {
        alert("Erro: ID do usuário não encontrado");
        return;
      }

      const response = await adopterService.updateAdopterProfile(userId, payload);
      handleApiResponse(response, payload);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar os dados.");
    }
  };

  const validateAndPreparePayload = (inputsState: any[]) => {
    const invalidFields: string[] = [];
    const payload: any = {};

    inputsState.forEach(input => {
      const { id, label, value, options, type } = input;

      if (type === "input" && id !== 2) {
        validateInputField(value, label, id, payload, invalidFields);
      } else if (type === "select") {
        validateSelectField(value, options, label, id, payload, invalidFields);
      }
    });

    return { payload, invalidFields };
  };

  const validateInputField = (value: string, label: string, id: number, payload: any, invalidFields: string[]) => {
    if (!value || value.trim() === "") invalidFields.push(label);
    if (id === 1) payload.name = value;
  };

  const validateSelectField = (value: string, options: string[], label: string, id: number, payload: any, invalidFields: string[]) => {
    const selectedIndex = Number(value);
    if (selectedIndex < 1 || selectedIndex > options.length) {
      invalidFields.push(label);
    } else {
      assignPayloadField(id, selectedIndex, payload);
    }
  };

  const assignPayloadField = (id: number, value: number, payload: any) => {
    const mapping: Record<number, string> = {
      3: "residencyType",
      4: "lifestyle",
      5: "petExperience",
      6: "hasChildren",
      7: "financialSituation",
      8: "freeTime",
    };
    const field = mapping[id];
    if (field) payload[field] = value;
  };

  const handleApiResponse = (response: any, payload: any) => {
    if (response.status === 0) {
      console.log("Dados atualizados com sucesso:", payload);
      alert("Perfil atualizado com sucesso!");
      navigation.goBack();
    } else {
      console.error("Erro ao atualizar o perfil:", response.description);
      alert("Erro ao atualizar o perfil.");
    }
  };

  return (
    <ScrollView flexDirection="column" width="100%" height="100%" bg={Theme.colors.caramelLight[90]}>
      <Button variant="unstyled" onPress={() => navigation.goBack()} alignSelf="flex-start" mb={5}>
        <Icon as={Ionicons} name="chevron-back" size="md" color="black" />
      </Button>

      {userId && (
        <CustomAvatar userId={userId} image={profileImageBase64} />
      )}

      <Text color={Theme.colors.sealBrown.original} textAlign="center" fontSize={Theme.fontSizes.xxl} fontWeight="bold">
        {name}, {age}
      </Text>

      <VStack space={3} alignItems="flex-start" p={5} width="100%">
        {inputsState.map(input =>
          input.type === "input" && input.id === 2 ? (
            <CustomInput
              key={`input-${input.id}`}
              placeholder="Data de Aniversário"
              iconName={input.icon}
              value={birthDate}
              keyboardType="numeric"
              onChangeText={handleDateInput}
              width="100%"
            />
          ) : input.type === "input" ? (
            <CustomInput
              key={`input-${input.id}`}
              placeholder={input.placeholder}
              iconName={input.icon}
              hidePassword={input.secureTextEntry}
              value={input.value}
              onChangeText={text => handleInputChange(input.id, text)}
              width="100%"
            />
          ) : (
            <CustomSelect
              key={`select-${input.id}`}
              placeholder={input.label}
              iconName={input.icon}
              items={input.options.map((option, index) => ({ label: option, value: String(index + 1) }))}
              initialValue={String(input.value)}
              onValueChange={newValue => handleInputChange(input.id, newValue)}
              width="100%"
            />
          )
        )}
        <CustomButton isLoading={false} onPress={handleSave} outlined={false} color="white" mt={5}>
          Salvar
        </CustomButton>
      </VStack>
    </ScrollView>
  );
}
