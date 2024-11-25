import ApiService from "./ApiService";
import PetService from "./PetService";
import AdopterService from "./AdopterService";
import AsyncStorage from "@react-native-async-storage/async-storage";

class RegisterService {
  private apiService: ApiService;
  private petService: PetService;
  private adopterService: AdopterService;

  constructor() {
    this.apiService = new ApiService("{ApiGateway}");
    this.petService = new PetService();
    this.adopterService = new AdopterService();
  }

  public async registerUser(payload: any): Promise<any> {
    try {
        if (payload?.email)
            payload.email = payload.email.toLowerCase();

        const response = await this.apiService.post(
            "/auth/adopter/register",
            payload
        );
        return response;
    } catch (error) {
        throw new Error("Erro ao registrar o usuário.");
    }
}


  public async sendEmailVerificationCode(email: string): Promise<any> {
    try {
      const response = await this.apiService.post(
        `/auth/adopter/verification/email?email=${email}`,
        null
      );
      return response;
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao enviar o código de verificação de e-mail.");
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
      console.log(error);
      throw new Error("Erro ao validar o código de verificação de e-mail.");
    }
  }

  public async sendInterestEmail(adopterId: string, petId: string, partnerId: string, adopterPhone: string, reason: string): Promise<any> {
    try {
      const adopterResponse = await this.adopterService.getAdopterById(adopterId);
      const petResponse = await this.petService.getPetById(petId);

      console.log(adopterResponse);
      console.log(petResponse);

      console.log(adopterPhone);
      console.log(reason);

      const payload = {
        adopterInfos: {
          id: adopterResponse.data.id,
          name: adopterResponse.data.name,
          email: adopterResponse.data.email,
          adopterPhone,
          birthday: adopterResponse.data.birthday,
          residencyType: adopterResponse.data.residencyType,
          lifestyle: adopterResponse.data.lifestyle,
          petExperience: adopterResponse.data.petExperience,
          hasChildren: adopterResponse.data.hasChildren,
          financialSituation: adopterResponse.data.financialSituation,
          freeTime: adopterResponse.data.freeTime,
          reason
        },
        petInfos: {
          name: petResponse.data.info.name,
          description: petResponse.data.info.description,
          birthDate: petResponse.data.info.birthDate,
          sex: petResponse.data.caracteristics.sex,
          coat: petResponse.data.caracteristics.coat,
          energyLevel: petResponse.data.caracteristics.energyLevel,
          size: petResponse.data.caracteristics.size,
          stimulusLevel: petResponse.data.caracteristics.stimulusLevel,
          temperament: petResponse.data.caracteristics.temperament,
          childLove: petResponse.data.caracteristics.childLove,
          animalsSocialization: petResponse.data.caracteristics.animalsSocialization,
          specialNeeds: petResponse.data.caracteristics.specialNeeds,
          shedding: petResponse.data.caracteristics.shedding,
        },
        partnerId
      };

      console.log(payload);

      return await this.apiService.post("/auth/adopter/interest/email", payload);
    } catch (error) {
      console.error("Erro ao enviar e-mail de interesse:", error);
      throw error;
    }
  }

  public async validateEmail(email: string): Promise<boolean> {
    try {
      const response = await this.apiService.get<any>(`/users-control/adopter/email/exists?email=${email}`);
      if (response && response.status === 0) {
        return response.data;
      }
      throw new Error("Erro ao validar o e-mail.");
    } catch (error) {
      console.error("Erro ao validar o e-mail:", error);
      throw error;
    }
  }
  
}
export default RegisterService;