import { 
  ResidencyType, 
  Lifestyle, 
  PetExperience, 
  HasChildren, 
  FinancialSituation, 
  FreeTime, 
  translateEnum 
} from "../Enums/UserEnums";

const createInputs = (userData: any, characteristics: any[]) => {
  console.log("Dados recebidos em createInputs:", userData);
  console.log("Características recebidas:", characteristics);

  const getCharacteristicValue = (id: number, enumType: any): number => {
    const characteristic = characteristics.find((char) => char.id === id);
    if (characteristic) {
      const valueKey = Object.keys(enumType).find(key => 
        translateEnum(enumType[key], enumType) === characteristic.title.split(": ")[1]
      );
      return valueKey ? enumType[valueKey] : 0;
    }
    return 0;
  };

  const getEnumOptions = (enumType: any) => {
    return Object.keys(enumType)
      .filter((key) => isNaN(Number(key))) 
      .map((key) => translateEnum(enumType[key], enumType));
  };

  return [
    {
      id: 1,
      label: "Meu nome é",
      icon: "person",
      placeholder: "Digite seu Nome Completo",
      secureTextEntry: false,
      type: "input",
      options: [],
      value: userData.name || "",
    },
    {
      id: 2,
      label: "Minha idade é",
      icon: "calendar",
      placeholder: "Digite sua Idade",
      secureTextEntry: false,
      type: "input",
      options: [],
      value: userData.age ? String(userData.age) : "",
    },
    {
      id: 3,
      label: "O Tipo da minha Residência é",
      icon: "home",
      placeholder: "Selecione uma Opção",
      secureTextEntry: false,
      type: "select",
      options: getEnumOptions(ResidencyType),
      value: userData.residencyType ?? getCharacteristicValue(2, ResidencyType),
    },
    {
      id: 4,
      label: "Meu estilo de vida é",
      icon: "bicycle-sharp",
      placeholder: "Selecione uma Opção",
      secureTextEntry: false,
      type: "select",
      options: getEnumOptions(Lifestyle),
      value: userData.lifestyle ?? getCharacteristicValue(5, Lifestyle),
    },
    {
      id: 5,
      label: "Já teve convívio com cachorros?",
      icon: "paw",
      placeholder: "Selecione uma Opção",
      secureTextEntry: false,
      type: "select",
      options: getEnumOptions(PetExperience),
      value: userData.petExperience ?? getCharacteristicValue(1, PetExperience),
    },    
    {
      id: 6,
      label: "Possui Crianças em casa?",
      icon: "extension-puzzle",
      placeholder: "Selecione uma Opção",
      secureTextEntry: false,
      type: "select",
      options: getEnumOptions(HasChildren),
      value: userData.hasChildren ?? getCharacteristicValue(3, HasChildren),
    },
    {
      id: 7,
      label: "Minha situação financeira é",
      icon: "cash",
      placeholder: "Selecione uma Opção",
      secureTextEntry: false,
      type: "select",
      options: getEnumOptions(FinancialSituation),
      value: userData.financialSituation ?? getCharacteristicValue(4, FinancialSituation),
    },
    {
      id: 8,
      label: "Em média, o meu tempo livre é de",
      icon: "time",
      placeholder: "Selecione uma Opção",
      secureTextEntry: false,
      type: "select",
      options: getEnumOptions(FreeTime),
      value: userData.freeTime ?? getCharacteristicValue(6, FreeTime),
    },
  ];
};

export { createInputs };
