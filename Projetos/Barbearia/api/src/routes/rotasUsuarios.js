import { Router } from "express";
import { BD } from "../../db.js";
import bcrypt from "bcrypt";

const router = Router();



router.get("/usuarios", async (req, res) => {
    try {
        const query = `SELECT id_usuario, nome, email, tipo FROM usuarios`;

        const usuarios = await BD.query(query);

        return res.status(200).json(usuarios.rows);
    } catch (error) {
        console.error("Erro ao listar usuários", error.message);
        return res.status(500).json({ error: "Erro ao listar usuários" });
    }
});



router.post("/usuarios", async (req, res) => {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });
    }

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const comando = `
      INSERT INTO usuarios (nome, email, senha, tipo)
      VALUES ($1, $2, $3, $4)
    `;

        const valores = [nome, email, senhaCriptografada, tipo];

        await BD.query(comando, valores);

        return res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar usuário", error.message);
        return res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
});



router.put("/usuarios/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email, senha, tipo } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM usuarios WHERE id_usuario = $1`,
            [id_usuario]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const comando = `
      UPDATE usuarios SET
        nome = $1,
        email = $2,
        senha = $3,
        tipo = $4
      WHERE id_usuario = $5
    `;

        const valores = [nome, email, senhaCriptografada, tipo, id_usuario];

        await BD.query(comando, valores);

        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        console.error("Erro ao atualizar usuário", error.message);
        return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
});



// router.patch("/usuarios/:id_usuario", async (req, res) => {
//   const { id_usuario } = req.params;
//   const { nome, email, senha, tipo } = req.body;

//   try {
//     const verificar = await BD.query(
//       `SELECT * FROM usuarios WHERE id_usuario = $1`,
//       [id_usuario]
//     );

//     if (verificar.rows.length === 0) {
//       return res.status(404).json({ message: "Usuário não encontrado" });
//     }

//     const campos = [];
//     const valores = [];
//     let contador = 1;

//     if (nome !== undefined) {
//       campos.push(`nome = $${contador}`);
//       valores.push(nome);
//       contador++;
//     }

//     if (email !== undefined) {
//       campos.push(`email = $${contador}`);
//       valores.push(email);
//       contador++;
//     }

//     if (senha !== undefined) {
//       const senhaCriptografada = await bcrypt.hash(senha, 10);
//       campos.push(`senha = $${contador}`);
//       valores.push(senhaCriptografada);
//       contador++;
//     }

//     if (tipo !== undefined) {
//       campos.push(`tipo = $${contador}`);
//       valores.push(tipo);
//       contador++;
//     }

//     if (campos.length === 0) {
//       return res.status(400).json({ message: "Nenhum campo enviado" });
//     }

//     valores.push(id_usuario);

//     const comando = `
//       UPDATE usuarios
//       SET ${campos.join(", ")}
//       WHERE id_usuario = $${contador}
//     `;

//     await BD.query(comando, valores);

//     return res.status(200).json({ message: "Usuário atualizado parcialmente" });
//   } catch (error) {
//     console.error("Erro no PATCH", error.message);
//     return res.status(500).json({ error: "Erro ao atualizar usuário" });
//   }
// });



router.delete("/usuarios/:id_usuario", async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const resultado = await BD.query(
            `DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *`,
            [id_usuario]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar usuário", error.message);
        return res.status(500).json({ error: "Erro ao deletar usuário" });
    }
});



router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios" });
    }

    try {
        const comando = `
      SELECT id_usuario, nome, email, senha
      FROM usuarios
      WHERE email = $1
    `;

        const resultado = await BD.query(comando, [email]);

        if (resultado.rows.length === 0) {
            return res.status(401).json({ message: "Email não encontrado" });
        }

        const usuario = resultado.rows[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: "Senha inválida" });
        }

        return res.status(200).json({
            message: "Login realizado com sucesso",
            usuario: {
                id_usuario: usuario.id_usuario,
                nome: usuario.nome,
                email: usuario.email,
            },
        });
    } catch (error) {
        console.error("Erro no login", error.message);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

export default router;
