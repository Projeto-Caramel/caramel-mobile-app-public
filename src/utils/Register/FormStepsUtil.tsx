const steps = [
  {
    id: 1,
    inputs: [
      {
        label: "Meu nome é",
        icon: "person",
        placeholder: "Digite seu Nome Completo",
        secureTextEntry: false,
        type: "input",
        fieldName: "name",
      },
    ],
  },
  {
    id: 2,
    inputs: [
      {
        label: "Meu aniversário é",
        icon: "calendar",
        placeholder: "Insira sua Data de Nascimento",
        secureTextEntry: false,
        type: "input",
        fieldName: "birthday",
      },
    ],
  },
  {
    id: 3,
    inputs: [
      {
        label: "O Tipo da minha Residência é",
        icon: "home",
        placeholder: "Selecione uma Opção",
        secureTextEntry: false,
        type: "select",
        options: [
          { label: "Casa", value: 1 },
          { label: "Apartamento", value: 2 },
          { label: "Chácara ou Sítio", value: 3 },
        ],
        fieldName: "residenceType",
      },
    ],
  },
  {
    id: 4,
    inputs: [
      {
        label: "Meu estilo de vida é",
        icon: "bicycle-sharp",
        placeholder: "Selecione uma Opção",
        secureTextEntry: false,
        type: "select",
        options: [
          { label: "Muito Ativo", value: 1 },
          { label: "Moderadamente Ativo", value: 2 },
          { label: "Ligeiramente Ativo", value: 3 },
          { label: "Sedentário", value: 4 },
        ],
        fieldName: "lifestyle",
      },
    ],
  },
  {
    id: 5,
    inputs: [
      {
        label: "Já teve convívio com Cachorros?",
        icon: "paw",
        placeholder: "Selecione uma Opção",
        secureTextEntry: false,
        type: "select",
        options: [
          { label: "Sim", value: 1 },
          { label: "Não", value: 2 },
        ],
        fieldName: "dogExperience",
      },
    ],
  },
  {
    id: 6,
    inputs: [
      {
        label: "Possui Crianças em casa?",
        icon: "extension-puzzle",
        placeholder: "Selecione uma Opção",
        secureTextEntry: false,
        type: "select",
        options: [
          { label: "Sim", value: 1 },
          { label: "Não", value: 2 },
        ],
        fieldName: "hasChildren",
      },
    ],
  },
  {
    id: 7,
    inputs: [
      {
        label: "Minha situação financeira é",
        icon: "cash",
        placeholder: "Selecione uma Opção",
        secureTextEntry: false,
        type: "select",
        options: [
          { label: "Confortável", value: 1 },
          { label: "Normal", value: 2 },
          { label: "Instável", value: 3 },
          { label: "Dificuldade Financeira", value: 4 },
        ],
        fieldName: "financialSituation",
      },
    ],
  },
  {
    id: 8,
    inputs: [
      {
        label: "Em média, o meu tempo livre é de",
        icon: "time",
        placeholder: "Selecione uma Opção",
        secureTextEntry: false,
        type: "select",
        options: [
          { label: "Muito Pouco (menos de 2 horas)", value: 1 },
          { label: "Pouco (2 a 4 horas)", value: 2 },
          { label: "Médio (4 a 8 horas)", value: 3 },
          { label: "Muito (mais de 8 horas)", value: 4 },
        ],
        fieldName: "freeTime",
      },
    ],
  },
  {
    id: 9,
    inputs: [
      {
        label: "Meu email é",
        icon: "mail-unread",
        placeholder: "Digite seu Email",
        secureTextEntry: false,
        type: "input",
        fieldName: "email",
      },
    ],
  },
  {
    id: 10,
    inputs: [
      {
        label: "Código de Confirmação",
        icon: "mail-open",
        placeholder: "Digite o Código de Confirmação",
        secureTextEntry: false,
        type: "input",
        fieldName: "identity",
      },
    ],
  },
  {
    id: 11,
    inputs: [
      {
        label: "Digite sua Senha",
        icon: "lock-closed",
        placeholder: "Digite sua Senha",
        secureTextEntry: true,
        type: "input",
        fieldName: "password",
      },
      {
        label: "Confirme a sua Senha",
        icon: "lock-closed",
        placeholder: "Digite sua Senha Novamente",
        secureTextEntry: true,
        type: "input",
        fieldName: "confirmPassword",
      },
    ],
  },
];

export { steps };
