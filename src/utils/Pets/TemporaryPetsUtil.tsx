import { Theme } from "../../styles/Theme";

const pets = [
    {
      id: 1,
      name: 'Jerônimo',
      age: '6 anos',
      ong: 'Projeto Caramel',
      image: require('../../assets/Dogs/jeronimo.jpg'),
      healthy: [
        {
          id: 1,
          title: "Castrado",
          color: Theme.colors.caramelMedium.original,
        },
        {
          id: 2,
          title: "Vacinado",
          color: Theme.colors.caramelMedium.minus20,
        },
      ],
      physicalCharacteristics: [
        {
          id: 1,
          title: "Porte Médio",
          color: Theme.colors.sealBrown[50],
        },
        {
          id: 2,
          title: "Macho",
          color: Theme.colors.sealBrown[40],
        },
        {
          id: 3,
          title: "Pelagem Curta",
          color: Theme.colors.sealBrown[30],
        },
        {
          id: 4,
          title: "Alta queda de pelo",
          color: Theme.colors.sealBrown[20],
        },
      ],
      behavioralCharacteristics: [
        {
          id: 1,
          title: "Alto nível de energia",
          color: Theme.colors.licorice[50],
        },
        {
          id: 2,
          title: "Muita atividade física",
          color: Theme.colors.licorice[40],
        },
        {
          id: 3,
          title: "Amigável",
          color: Theme.colors.licorice[30],
        },
        {
          id: 4,
          title: "Amigável com outros pets",
          color: Theme.colors.licorice[20],
        },
        {
          id: 5,
          title: "Ama crianças",
          color: Theme.colors.licorice[10],
        },
      ],
      gallery: [
        require('../../assets/Dogs/jeronimo.jpg'),
        require('../../assets/Dogs/jeronimo.jpg'),
        require('../../assets/Dogs/jeronimo.jpg'),
        require('../../assets/Dogs/jeronimo.jpg'),
      ]
    },
    {
      id: 2,
      name: 'Teté',
      age: '4 anos',
      ong: 'Projeto Caramel',
      image: require('../../assets/Dogs/tete.jpg'),
      healthy: [
        {
          id: 1,
          title: "Castrado",
          color: Theme.colors.caramelMedium.original,
        },
        {
          id: 2,
          title: "Vacinado",
          color: Theme.colors.licorice.minus20,
        },
      ],
      physicalCharacteristics: [
        {
          id: 1,
          title: "Porte Médio",
          color: Theme.colors.sealBrown[50],
        },
        {
          id: 2,
          title: "Macho",
          color: Theme.colors.sealBrown[40],
        },
        {
          id: 3,
          title: "Pelagem Curta",
          color: Theme.colors.sealBrown[30],
        },
        {
          id: 4,
          title: "Alta queda de pelo",
          color: Theme.colors.sealBrown[20],
        },
      ],
      behavioralCharacteristics: [
        {
          id: 1,
          title: "Alto nível de energia",
          color: Theme.colors.licorice[50],
        },
        {
          id: 2,
          title: "Muita atividade física",
          color: Theme.colors.licorice[40],
        },
        {
          id: 3,
          title: "Amigável",
          color: Theme.colors.licorice[30],
        },
        {
          id: 4,
          title: "Amigável com outros pets",
          color: Theme.colors.licorice[20],
        },
        {
          id: 5,
          title: "Ama crianças",
          color: Theme.colors.licorice[10],
        },
      ],
      gallery: [
        require('../../assets/Dogs/tete.jpg'),
        require('../../assets/Dogs/tete.jpg'),
        require('../../assets/Dogs/tete.jpg'),
        require('../../assets/Dogs/tete.jpg'),
      ]
    },
    {
      id: 3,
      name: 'Caramelo',
      age: '1 ano',
      ong: 'Projeto Caramel',
      image: require('../../assets/Dogs/caramelo.jpg'),
      healthy: [
        {
          id: 1,
          title: "Castrado",
          color: Theme.colors.caramelMedium.original,
        },
        {
          id: 2,
          title: "Vacinado",
          color: Theme.colors.licorice.minus20,
        },
      ],
      physicalCharacteristics: [
        {
          id: 1,
          title: "Porte Médio",
          color: Theme.colors.sealBrown[50],
        },
        {
          id: 2,
          title: "Macho",
          color: Theme.colors.sealBrown[40],
        },
        {
          id: 3,
          title: "Pelagem Curta",
          color: Theme.colors.sealBrown[30],
        },
        {
          id: 4,
          title: "Alta queda de pelo",
          color: Theme.colors.sealBrown[20],
        },
      ],
      behavioralCharacteristics: [
        {
          id: 1,
          title: "Alto nível de energia",
          color: Theme.colors.licorice[50],
        },
        {
          id: 2,
          title: "Muita atividade física",
          color: Theme.colors.licorice[40],
        },
        {
          id: 3,
          title: "Amigável",
          color: Theme.colors.licorice[30],
        },
        {
          id: 4,
          title: "Amigável com outros pets",
          color: Theme.colors.licorice[20],
        },
        {
          id: 5,
          title: "Ama crianças",
          color: Theme.colors.licorice[10],
        },
      ],
      gallery: [
        require('../../assets/Dogs/caramelo.jpg'),
        require('../../assets/Dogs/caramelo.jpg'),
        require('../../assets/Dogs/caramelo.jpg'),
        require('../../assets/Dogs/caramelo.jpg'),
      ]
    },
  ];
  
  export { pets };
  