import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importações de Telas
import Initial from "../screens/Initial";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Welcome from "../screens/Main/Welcome";
import Tabs from "../screens/Main/Tabs";
import PetProfile from "../screens/Main/PetProfile/PetProfile";
import InterestConfirmation from "../screens/Main/PetProfile/InterestConfirmation";
import PhoneInform from "../screens/Main/PetProfile/PhoneInform";
import InterestSended from "../screens/Main/PetProfile/InterestSended";
import EditProfile from "../screens/Main/UserProfile/EditProfile";
import SecurityProfile from "../screens/Main/UserProfile/SecurityProfile";
import ChangePassword from "../screens/ResetPassword";
import TermsAndConditions from "../screens/TermsAndConditions";
import ReasonInform from "../screens/Main/PetProfile/ReasonInform";

// Tipagem para a Navegação
type RootStackParamList = {
  Initial: undefined;
  Register: undefined;
  Login: undefined;
  Welcome: undefined;
  Tabs: undefined;
  PetProfile: undefined;
  InterestConfirmation: undefined;
  PhoneInform: undefined;
  ReasonInform: undefined;
  InterestSended: undefined;
  EditProfile: undefined;
  SecurityProfile: undefined;
  ChangePassword: undefined;
  TermsAndConditions: undefined;
};

// Criação do Stack Navigator
const Tab = createNativeStackNavigator<RootStackParamList>();

// Componente de Rotas
export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator id={undefined}>
        <Tab.Screen
          name="Initial"
          component={Initial}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="PetProfile"
          component={PetProfile}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="InterestConfirmation"
          component={InterestConfirmation}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="PhoneInform"
          component={PhoneInform}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ReasonInform"
          component={ReasonInform}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="InterestSended"
          component={InterestSended}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="SecurityProfile"
          component={SecurityProfile}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
