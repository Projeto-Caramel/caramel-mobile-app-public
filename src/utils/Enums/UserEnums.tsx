// Enums.tsx
export enum PetExperience {
    Yes = 1,
    No = 2,
  }
  
  export enum ResidencyType {
    House = 1,
    Apartment = 2,
    Farm = 3,
  }
  
  export enum HasChildren {
    Yes = 1,
    No = 2,
  }
  
  export enum FinancialSituation {
    Comfortable = 1,
    Normal = 2,
    Unstable = 3,
    FinancialDifficulty = 4,
  }
  
  export enum Lifestyle {
    VeryActive = 1,
    ModeratelyActive = 2,
    SlightlyActive = 3,
    Sedentary = 4,
  }
  
  export enum FreeTime {
    VeryLittle = 1,
    Little = 2,
    Moderate = 3,
    Much = 4,
  }
  
  // Função de tradução para valores legíveis
  export const translateEnum = (value: any, enumType: any, fallback = "Não especificado"): string => {
    const translations: { [key: string]: string } = {
      House: "Casa",
      Apartment: "Apartamento",
      Farm: "Chácara ou Sítio",
      VeryActive: "Muito Ativo",
      ModeratelyActive: "Moderadamente Ativo",
      SlightlyActive: "Ligeiramente Ativo",
      Sedentary: "Sedentário",
      Yes: "Sim",
      No: "Não",
      Comfortable: "Confortável",
      Normal: "Normal",
      Unstable: "Instável",
      FinancialDifficulty: "Dificuldade Financeira",
      VeryLittle: "Muito Pouco",
      Little: "Pouco",
      Moderate: "Médio",
      Much: "Muito",
    };
    return translations[enumType[value]] || fallback;
  };
  