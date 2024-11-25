import { RouteProp, NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  PetProfile: { petId: string, partnerId: string };
  ReasonInform: { idPartner: string; idPet: string; phone:string };
  InterestConfirmation: { idPartner: string; idPet: string;};
};

export type PetProfileNavigationProp = NavigationProp<RootStackParamList, 'PetProfile'>;
