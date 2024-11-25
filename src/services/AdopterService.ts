// services/AdopterService.ts
import ApiService from './ApiService';

class AdopterService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService("{ApiGateway}");
  }

  public async getAdopterById(userId: string): Promise<any> {
    try {
      const response = await this.apiService.get<any>(`/users-control/adopter?id=${userId}`);
      return response;
    } catch (error) {
      console.error("Erro ao buscar os dados do adotante:", error);
      throw new Error("Erro ao buscar os dados do usuário.");
    }
  }

  public async updateAdopterProfile(userId: string, payload: any): Promise<any> {
    try {
      const response = await this.apiService.put<any, { status: number; description: string }>(
        `/users-control/adopters?id=${userId}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Erro ao atualizar o perfil do adotante:", error);
      throw new Error("Erro ao atualizar o perfil.");
    }
  }

  public async changeAdopterPassword(userId: string, payload: any): Promise<any> {
    try {
      const response = await this.apiService.put<any, { status: number; description: string }>(
        `/users-control/adopters/password?id=${userId}`,
        payload
      );
      return response;
    } catch (error) {
      console.error("Erro ao mudar a senha do adotante:", error);
      throw new Error("Erro ao atualizar a senha.");
    }
  }
}

export default AdopterService;
