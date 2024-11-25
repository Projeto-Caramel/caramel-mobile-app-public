// services/PartnerService.ts
import ApiService from "./ApiService";

interface Partner {
  id: string;
  email: string;
  password: string;
  name: string;
  description: string;
  address: string;
  cellphone: string;
  cnpj: string;
  adoptionRate: string;
  pix: string;
  website: string;
  instagram: string;
  facebook: string;
  type: number;
  role: number;
  profileImageUrl: string;
  maxCapacity: number;
}

class PartnerService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService("{ApiGateway}");
  }

  public async getPartnerNameById(partnerId: string): Promise<string> {
    try {
      console.log(partnerId);
      const response = await this.apiService.get<{ status: number; data: { name: string } }>(
        `/users-control/partner?id=${partnerId}`
      );
      if (response.status === 0) {
        return response.data.name; 
      } else {
        throw new Error("Erro ao buscar o nome da ONG.");
      }
    } catch (error) {
      console.error("Erro ao buscar a ONG:", error);
      throw new Error("Erro ao buscar a ONG. Tente novamente mais tarde.");
    }
  }

  public async getPartnerById(partnerId: string): Promise<Partner> {
    try {
      console.log(partnerId);
      const response = await this.apiService.get<{ status: number; data: Partner; description: string }>(
        `/users-control/partner?id=${partnerId}`
      );
      if (response.status === 0) {
        return response.data; 
      } else {
        throw new Error(response.description || "Erro ao buscar o parceiro.");
      }
    } catch (error) {
      console.error("Erro ao buscar o parceiro:", error);
      throw new Error("Erro ao buscar o parceiro. Tente novamente mais tarde.");
    }
  }
}

export default PartnerService;
