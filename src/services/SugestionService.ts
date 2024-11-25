// src/services/SugestionService.ts
import ApiService from "./ApiService";
import { AxiosResponse } from "axios";

class SugestionService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService(
      "{ApiGateway}"
    );
  }

  public async getSuggestedPetIds(userId: string): Promise<string[]> {
    try {
      const response = await this.apiService.get<{ message: string[] }>(
        `/sugestion/knn?key1=${userId}`
      );

      return response.message;
    } catch (error) {
      console.log("Erro ao buscar IDs dos pets sugeridos:", error);
      throw new Error("Erro ao buscar os IDs dos pets sugeridos.");
    }
  }

  public async getPetsByIds(ids: string[]): Promise<any[]> {
    try {
      const response: AxiosResponse<{ data: any[] }> = await this.apiService.post(
        "https://ajbcdtphrarlaf34kwu43i3moa0hiylg.lambda-url.sa-east-1.on.aws/pets-control/pets/range",
        ids
      );

      if (Array.isArray(response.data)) {
        return response.data; 
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data; 
      } else {
        throw new Error("Estrutura inesperada da resposta da API.");
      }
    } catch (error) {
      console.log("Erro ao buscar detalhes dos pets:", error);
      throw new Error("Erro ao buscar detalhes dos pets.");
    }
  }

  public async fetchSuggestedPets(userId: string): Promise<any[]> {
    try {
      const petIds = await this.getSuggestedPetIds(userId);
      if (!petIds || petIds.length === 0) {
        console.log("Nenhum ID de pet encontrado.");
        return [];
      }

      const pets = await this.getPetsByIds(petIds);
      return pets;
    } catch (error) {
      console.log("Erro ao buscar os pets sugeridos:", error);
      throw new Error("Erro ao buscar os pets sugeridos.");
    }
  }
}

export default new SugestionService();
