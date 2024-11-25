// src/utils/Pets/PetsEnums.ts

export enum HealthStatus {
    Castrated = 1,
    NotCastrated = 2,
    Vaccinated = 1,
    NotVaccinated = 2,
}

export enum AgeType {
    Puppy = 1, // Filhote
    Young = 2, // Jovem
    Adult = 3, // Adulto
    Senior = 4 // Sênior
}

export enum AnimalsSocializationType {
    OnlyPet = 1, // Único Pet
    SameSpeciesOnly = 2, // Apenas da Mesma Espécie
    Friendly = 3 // Amigável
}

export enum ChildLoveType {
    No = 1, // Não
    Tolerant = 2, // Tolerante
    Loves = 3 // Ama
}

export enum CoatType {
    Short = 1, // Curta
    Long = 2, // Longa
    Medium = 3, // Média
    Hairless = 4 // Sem Pelo
}

export enum EnergyLevelType {
    Low = 1, // Baixa
    Medium = 2, // Média
    High = 3 // Alta
}

export enum PetSex {
    Male = 1, // Macho
    Female = 2 // Fêmea
}

export enum SheddingType {
    ShedsALot = 1, // Solta Muito Pelo
    ShedsSeasonally = 2, // Solta Pelo Sazonalmente
    ShedsLittle = 3 // Solta Pouco Pelo
}

export enum SizeType {
    Small = 1, // Pequeno
    Medium = 2, // Médio
    Large = 3 // Grande
}

export enum SpecialNeedsType {
    No = 1, // Não
    Phisical = 2, // Física
    Dietary = 3 // Alimentar
}

export enum StimulusLevelType {
    Low = 1, // Baixo
    Moderate = 2, // Moderado
    High = 3 // Alto
}

export enum TemperamentType {
    NotFriendly = 1, // Não Amigável
    ShyFriendly = 2, // Pouco Amigável
    VeryFriendly = 3 // Muito Amigável
}

// Função de tradução para valores legíveis em português
export const translatePetEnum = (value: number, enumType: any): string => {
    const translations: { [key: string]: string } = {
        Castrated: "Castrado",
        NotCastrated: "Não Castrado",
        Vaccinated: "Vacinado",
        NotVaccinated: "Não Vacinado",
        Puppy: "Filhote",
        Young: "Jovem",
        Adult: "Adulto",
        Senior: "Sênior",
        OnlyPet: "Prefere ser o único Pet",
        SameSpeciesOnly: "Apenas da Mesma Espécie",
        Friendly: "Amigável",
        No: "Não é amigável com Crianças",
        Tolerant: "Tolerante a Crianças",
        Loves: "Ama Crianças",
        Short: "Curta",
        Long: "Longa",
        Medium: "Média",
        Hairless: "Sem Pelo",
        Low: "Baixa",
        High: "Alta",
        Male: "Macho",
        Female: "Fêmea",
        ShedsALot: "Solta Muito Pelo",
        ShedsSeasonally: "Solta Pelo Sazonalmente",
        ShedsLittle: "Solta Pouco Pelo",
        Small: "Pequeno",
        Large: "Grande",
        Phisical: "Necessidades Físicas",
        Dietary: "Necessidades Alimentares",
        Moderate: "Moderado",
        NotFriendly: "Não Amigável",
        ShyFriendly: "Pouco Amigável",
        VeryFriendly: "Muito Amigável"
    };
    return translations[enumType[value]] || "Não especificado";
};
