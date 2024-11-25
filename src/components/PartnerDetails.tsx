import React from "react";
import { VStack, Text, HStack } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Theme } from "../styles/Theme"; 

interface PartnerDetailsProps {
  partner: {
    name: string;
    address: string | null;
    cellphone: string | null;
    email: string | null;
    facebook: string | null;
    instagram: string | null;
  };
}

const PartnerDetails: React.FC<PartnerDetailsProps> = ({ partner }) => {
  const partnerFields = [
    { label: "Endereço", value: partner.address, icon: "location" },
    { label: "Telefone", value: formatPhoneNumber(partner.cellphone), icon: "call" },
    { label: "Email", value: partner.email, icon: "mail" },
    { label: "Facebook", value: partner.facebook, icon: "logo-facebook" },
    { label: "Instagram", value: partner.instagram, icon: "logo-instagram" },
  ];

  function formatPhoneNumber(phone: string | null): string | null {
    if (!phone) return null;
    const cleanedValue = phone.replace(/\D/g, "");
    if (cleanedValue.length === 11) {
      return `(${cleanedValue.slice(0, 2)}) ${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7)}`;
    }
    return phone; // Retorna o telefone original caso não tenha 11 dígitos
  }

  return (
    <VStack space={3} bgColor={Theme.colors.caramelLight[90]} mb={4}>
      <HStack alignItems="center">
        <MaterialIcons name="diversity-1" size={24} color={Theme.colors.sealBrown.original} />
        <Text
          fontSize={Theme.fontSizes.xl}
          fontWeight="bold"
          color={Theme.colors.sealBrown.original}
          ml={2}
        >
          {partner.name}
        </Text>
      </HStack>

      {partnerFields
        .filter((field) => field.value) 
        .map((field, index) => (
          <HStack key={index} alignItems="center" flexWrap="wrap" width="100%">
            {console.log("Renderizando campo:", field)}
            <Ionicons name={field.icon} size={20} color={Theme.colors.sealBrown.original} style={{ marginRight: 8 }} />
            <Text fontSize={Theme.fontSizes.md} color={Theme.colors.sealBrown.original} flex={1}>
              <Text bold>{field.label}:</Text> {field.value}
            </Text>
          </HStack>
        ))}
    </VStack>
  );
};

export default PartnerDetails;
