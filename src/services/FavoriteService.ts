// src/services/FavoriteService.ts
import ApiService from "./ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FavoriteService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService("{ApiGateway}");
  }

  // Função para buscar o ID do usuário a partir do AsyncStorage
  static async getUserId(): Promise<string | null> {
    try {
      const userId = await AsyncStorage.getItem("userId");
      return userId;
    } catch (error) {
      console.error("Erro ao obter User ID do AsyncStorage:", error);
      throw error;
    }
  }

  // Função para obter os favoritos de um usuário
  public async fetchFavorites(userId: string): Promise<{ data: { pets: any[] } }> {
    const response = await this.apiService.get<{ data: { pets: any[] } }>(`/pets-control/favorites?userId=${userId}`);
    return response;
  }

  // Função para adicionar um favorito
  public async addFavorite(userId: string, petId: string): Promise<void> {
    try {
      await this.apiService.post(`/pets-control/favorites/add?userId=${userId}&petId=${petId}`, {});
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      throw error;
    }
  }

  // Função para remover um favorito
  public async removeFavorite(userId: string, petId: string): Promise<void> {
    try {
      console.log(`Removendo favorito para userId=${userId} e petId=${petId}`);
      await this.apiService.post(`/pets-control/favorites/remove?userId=${userId}&petId=${petId}`, {});
      console.log("Favorito removido com sucesso.");
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      throw error;
    }
  }
}

export default FavoriteService;
