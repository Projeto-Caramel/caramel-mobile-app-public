// services/LoginService.ts
import ApiService from "./ApiService";

class LoginService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService("{ApiGateway}");
  }

  public async authenticate(email: string, password: string): Promise<any> {
    const payload = { email, password };

    try {
      const response = await this.apiService.post<typeof payload, any>("/auth/adopter/authenticate", payload);
      return response;
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      throw new Error("Erro ao tentar se autenticar. Tente novamente mais tarde.");
    }
  }

  public async changeAdopterPassword(id: string, email: string, newPassword: string, authToken?: string): Promise<any> {
    const payload = { id, email: email.toLowerCase(), newPassword };
    console.log(payload);
    console.log(authToken);
    try {
      const response = await this.apiService.put<any, { status: number; description: string }>(
        `/auth/adopter/password/change`,
        payload);
      console.log(response)
      return response;
    } catch (error) {
      console.error("Erro ao mudar a senha do adotante:", error);
      throw new Error("Erro ao atualizar a senha.");
    }
  }

}

export default LoginService;
