// getCharacteristics.ts
import { Theme } from "../../styles/Theme";
import {
  PetExperience,
  ResidencyType,
  HasChildren,
  FinancialSituation,
  Lifestyle,
  FreeTime,
  translateEnum, 
} from "../Enums/UserEnums";

export const getCharacteristics = (userData: any) => {
  return [
    {
      id: 1,
      title: `Possui convívio com Pets: ${translateEnum(userData.petExperience, PetExperience)}`,
      color: Theme.colors.licorice[60],
    },
    {
      id: 2,
      title: `Mora em: ${translateEnum(userData.residencyType, ResidencyType)}`,
      color: Theme.colors.licorice[50],
    },
    {
      id: 3,
      title: `Crianças em casa: ${translateEnum(userData.hasChildren, HasChildren)}`,
      color: Theme.colors.licorice[30],
    },
    {
      id: 4,
      title: `Situação Financeira: ${translateEnum(userData.financialSituation, FinancialSituation)}`,
      color: Theme.colors.licorice[20],
    },
    {
      id: 5,
      title: `Estilo de Vida: ${translateEnum(userData.lifestyle, Lifestyle)}`,
      color: Theme.colors.licorice[10],
    },
    {
      id: 6,
      title: `Tempo Livre: ${translateEnum(userData.freeTime, FreeTime)}`,
      color: Theme.colors.licorice.original,
    },
  ];
};
