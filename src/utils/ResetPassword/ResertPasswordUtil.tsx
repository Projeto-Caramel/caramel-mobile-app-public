const passwordSteps = [
    {
      id: 1,
      inputs: [
        {
          label: "Digite seu email",
          icon: "mail-unread",
          placeholder: "Digite seu Email",
          secureTextEntry: false,
          type: "input",
          fieldName: "email",
        },
      ],
    },
    {
      id: 2,
      inputs: [
        {
          label: "Código de Verificação",
          icon: "key",
          placeholder: "Digite o Código de Verificação",
          secureTextEntry: false,
          type: "input",
          fieldName: "code",
        },
      ],
    },
    {
      id: 3,
      inputs: [
        {
          label: "Digite sua nova senha",
          icon: "lock-closed",
          placeholder: "Nova Senha",
          secureTextEntry: true,
          type: "input",
          fieldName: "newPassword",
        },
        {
          label: "Confirme sua nova senha",
          icon: "lock-closed",
          placeholder: "Confirme a Nova Senha",
          secureTextEntry: true,
          type: "input",
          fieldName: "confirmPassword",
        },
      ],
    },
  ];
  
  export { passwordSteps };
  