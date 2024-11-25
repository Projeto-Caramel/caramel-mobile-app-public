// services/PetService.ts
import ApiService from "./ApiService";

class PetService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService("{ApiGateway}");
  }

  public async getAllPets(page: number, size: number): Promise<any> {
    try {
      const response = await this.apiService.get<any>(
        `/pets-control/pets/all?page=${page}&size=${size}`
      );
      return response;
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      throw new Error("Erro ao buscar pets. Tente novamente mais tarde.");
    }
  }

  public async getPetById(petId: string): Promise<any> {
    try {
      const response = await this.apiService.get<any>(`/pets-control/pets/${petId}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar pet por ID:", error);
      throw new Error("Erro ao buscar detalhes do pet. Tente novamente mais tarde.");
    }
  }

  public async getPetGallery(petId: string): Promise<any> {
    try {
      const response = await this.apiService.get<any>(`/pets-control/pets/gallery?petId=${petId}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar galeria do pet:", error);
      throw new Error("Erro ao buscar galeria do pet. Tente novamente mais tarde.");
    }
  }
}

export default PetService;
