import ApiService from "./ApiService";

class PasswordService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService("{ApiGateway}");
  }

  public async sendEmailVerificationCode(email: string): Promise<any> {
    try {
      const response = await this.apiService.post(
        `/auth/adopter/verification/email?email=${email}`,
        null
      );
      return response;
    } catch (error) {
      console.error("Erro ao enviar código de verificação de e-mail:", error);
      throw error;
    }
  }

  public async sendVerificationCode(email: string, code: string): Promise<any> {
    try {
      const response = await this.apiService.post(
        `/auth/adopter/verification/validate?email=${email}&code=${code}`,
        null
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async changePassword(payload: { email: string; newPassword: string }): Promise<any> {
    try {
        console.log(payload)

      const response = await this.apiService.put(
        "/auth/adopter/password/reset",
        payload
      );
      return response;
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      throw error;
    }
  }
}

export default PasswordService;
