const documentacao = {
    openapi: "3.0.3",
    info: {
        title: "API de Agendamentos",
        description: "Documentação da API",
        version: "1.0.0",
    },

    servers: [
        { url: "http://localhost:3000", description: "localhost" }
    ],

    tags: [
        { name: "Usuários" },
        { name: "Serviços" },
        { name: "Agendamentos" },
    ],

    paths: {

        
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar usuários",
                responses: {
                    200: {
                        description: "Sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Usuarios" },
                                },
                            },
                        },
                    },
                },
            },

            post: {
                tags: ["Usuários"],
                summary: "Cadastrar usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Usuario" },
                        },
                    },
                },
                responses: {
                    201: { description: "Usuário criado" },
                },
            },
        },

        "/usuarios/{id_usuario}": {
            put: {
                tags: ["Usuários"],
                summary: "Atualizar usuário",
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
                        },
                    },
                },
                responses: {
                    200: { description: "Atualizado" },
                    404: { description: "Não encontrado" },
                },
            },

            // patch: {
            //   tags: ["Usuários"],
            //   summary: "Atualização parcial do usuário",
            //   parameters: [
            //     {
            //       name: "id_usuario",
            //       in: "path",
            //       required: true,
            //       schema: { type: "integer" },
            //     },
            //   ],
            //   requestBody: {
            //     required: true,
            //     content: {
            //       "application/json": {
            //         schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
            //       },
            //     },
            //   },
            //   responses: {
            //     200: { description: "Atualizado parcialmente" },
            //   },
            // },

            delete: {
                tags: ["Usuários"],
                summary: "Deletar usuário",
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Removido" },
                    404: { description: "Não encontrado" },
                },
            },
        },

        "/login": {
            post: {
                tags: ["Usuários"],
                summary: "Login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Login_Usuario" },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Login OK",
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/Resposta_Login" },
                            },
                        },
                    },
                    401: { description: "Credenciais inválidas" },
                },
            },
        },


        // 🔹 SERVIÇOS
        "/servicos": {
            get: {
                tags: ["Serviços"],
                summary: "Listar serviços",
                responses: {
                    200: {
                        description: "Sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Servicos" },
                                },
                            },
                        },
                    },
                },
            },

            post: {
                tags: ["Serviços"],
                summary: "Cadastrar serviço",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Servico" },
                        },
                    },
                },
                responses: {
                    201: { description: "Criado" },
                },
            },
        },

        "/servicos/{id_servico}": {
            put: {
                tags: ["Serviços"],
                summary: "Atualizar serviço",
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Servico" },
                        },
                    },
                },
                responses: {
                    200: { description: "Atualizado" },
                    404: { description: "Não encontrado" },
                },
            },

            // patch: {
            //   tags: ["Serviços"],
            //   summary: "Atualização parcial do serviço",
            //   parameters: [
            //     {
            //       name: "id_servico",
            //       in: "path",
            //       required: true,
            //       schema: { type: "integer" },
            //     },
            //   ],
            //   requestBody: {
            //     required: true,
            //     content: {
            //       "application/json": {
            //         schema: { $ref: "#/components/schemas/Cadastrar_Servico" },
            //       },
            //     },
            //   },
            //   responses: {
            //     200: { description: "Atualizado parcialmente" },
            //   },
            // },

            delete: {
                tags: ["Serviços"],
                summary: "Deletar serviço",
                parameters: [
                    {
                        name: "id_servico",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Deletado" },
                    404: { description: "Não encontrado" },
                },
            },
        },


        // 🔹 AGENDAMENTOS
        "/agendamentos": {
            get: {
                tags: ["Agendamentos"],
                summary: "Listar agendamentos",
                responses: {
                    200: {
                        description: "Sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: "#/components/schemas/Listar_Agendamentos" },
                                },
                            },
                        },
                    },
                },
            },

            post: {
                tags: ["Agendamentos"],
                summary: "Cadastrar agendamento",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Agendamento" },
                        },
                    },
                },
                responses: {
                    201: { description: "Criado" },
                },
            },
        },

        "/agendamentos/{id_agendamento}": {
            put: {
                tags: ["Agendamentos"],
                summary: "Atualizar agendamento",
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Cadastrar_Agendamento" },
                        },
                    },
                },
                responses: {
                    200: { description: "Atualizado" },
                    404: { description: "Não encontrado" },
                },
            },

            delete: {
                tags: ["Agendamentos"],
                summary: "Deletar agendamento",
                parameters: [
                    {
                        name: "id_agendamento",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    200: { description: "Deletado" },
                    404: { description: "Não encontrado" },
                },
            },
        },

    },

    components: {
        schemas: {

            Listar_Usuarios: {
                type: "object",
                properties: {
                    id_usuario: { type: "integer" },
                    nome: { type: "string" },
                    email: { type: "string" },
                    tipo: { type: "string" },
                },
            },

            Cadastrar_Usuario: {
                type: "object",
                required: ["nome", "email", "senha"],
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" },
                    tipo: { type: "string" },
                },
            },

            Atualizar_Usuario: {
                type: "object",
                properties: {
                    nome: { type: "string" },
                    email: { type: "string" },
                    senha: { type: "string" },
                    tipo: { type: "string" },
                },
            },

            Login_Usuario: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                    email: { type: "string" },
                    senha: { type: "string" },
                },
            },

            Resposta_Login: {
                type: "object",
                properties: {
                    message: { type: "string" },
                    usuario: {
                        type: "object",
                        properties: {
                            id_usuario: { type: "integer" },
                            nome: { type: "string" },
                            email: { type: "string" },
                        },
                    },
                },
            },

            Listar_Servicos: {
                type: "object",
                properties: {
                    id_servico: { type: "integer" },
                    nome: { type: "string" },
                    preco: { type: "number" },
                    descricao: { type: "string" },
                },
            },

            Cadastrar_Servico: {
                type: "object",
                required: ["nome", "preco"],
                properties: {
                    nome: { type: "string" },
                    preco: { type: "number" },
                    descricao: { type: "string" },
                },
            },

            Listar_Agendamentos: {
                type: "object",
                properties: {
                    id_agendamento: { type: "integer" },
                    descricao: { type: "string" },
                    data_hora: { type: "string" },
                    status: { type: "string" },
                    id_servico: { type: "integer" },
                    id_usuario: { type: "integer" },
                },
            },

            Cadastrar_Agendamento: {
                type: "object",
                required: ["data_hora", "id_servico", "id_usuario"],
                properties: {
                    descricao: { type: "string" },
                    data_hora: { type: "string" },
                    status: { type: "string" },
                    id_servico: { type: "integer" },
                    id_usuario: { type: "integer" },
                },
            },

        },
    },
};

export default documentacao;
