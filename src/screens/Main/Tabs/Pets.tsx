import React, { useEffect, useState } from "react";
import { VStack, Spinner, Center } from "native-base";
import { Theme } from "../../../styles/Theme";
import TinderCard from "../../../components/TinderCard";
import PetService from "../../../services/PetService";

export default function Pets() {
  const [petsData, setPetsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Instancia o serviço PetService
  const petService = new PetService();

  useEffect(() => {
    const fetchPetsData = async () => {
      try {
        const response = await petService.getAllPets(1, 50); // Paginação ajustável
        if (response && response.data) {
          console.log(response.data);
          setPetsData(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetsData();
  }, []);

  return (
    <VStack flex={1} bgColor={Theme.colors.caramelLight[90]}>
      {loading ? (
        <Center flex={1}>
          <Spinner color={Theme.colors.sealBrown.original} size="lg" />
        </Center>
      ) : (
        <TinderCard pets={petsData} />
      )}
    </VStack>
  );
}
