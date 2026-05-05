import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();



router.get('/servicos', async (req, res) => {
    try {
        const comando = `
            SELECT
                id_servico,
                nome,
                preco,
                descricao
            FROM servicos
            ORDER BY nome ASC
        `;

        const resultado = await BD.query(comando);

        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao listar serviços', error.message);
        return res.status(500).json({ error: 'Erro ao listar serviços' });
    }
});


router.post('/servicos', async (req, res) => {
    const { nome, preco, descricao } = req.body;

    try {
        const comando = `
            INSERT INTO servicos (nome, preco, descricao)
            VALUES ($1, $2, $3)
        `;

        const valores = [nome, preco, descricao];

        await BD.query(comando, valores);

        return res.status(201).json({ message: 'Serviço cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar serviço' });
    }
});



router.put('/servicos/:id_servico', async (req, res) => {
    const { id_servico } = req.params;
    const { nome, preco, descricao } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM servicos WHERE id_servico = $1`,
            [id_servico]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }

        const comando = `
            UPDATE servicos SET
                nome = $1,
                preco = $2,
                descricao = $3
            WHERE id_servico = $4
        `;

        const valores = [nome, preco, descricao, id_servico];

        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Serviço atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar serviço' });
    }
});



// router.patch('/servicos/:id_servico', async (req, res) => {
//     const { id_servico } = req.params;
//     const dados = req.body;

//     try {
//         const verificar = await BD.query(
//             `SELECT * FROM servicos WHERE id_servico = $1`,
//             [id_servico]
//         );

//         if (verificar.rows.length === 0) {
//             return res.status(404).json({ message: 'Serviço não encontrado' });
//         }

//         const campos = [];
//         const valores = [];
//         let contador = 1;

//         for (let chave in dados) {
//             campos.push(`${chave} = $${contador}`);
//             valores.push(dados[chave]);
//             contador++;
//         }

//         if (campos.length === 0) {
//             return res.status(400).json({ message: 'Nenhum campo enviado' });
//         }

//         valores.push(id_servico);

//         const comando = `
//             UPDATE servicos
//             SET ${campos.join(', ')}
//             WHERE id_servico = $${contador}
//         `;

//         await BD.query(comando, valores);

//         return res.status(200).json({ message: 'Serviço atualizado parcialmente' });
//     } catch (error) {
//         console.error('Erro no PATCH', error.message);
//         return res.status(500).json({ error: 'Erro ao atualizar serviço' });
//     }
// });



router.delete('/servicos/:id_servico', async (req, res) => {
    const { id_servico } = req.params;

    try {
        const comando = `
            DELETE FROM servicos
            WHERE id_servico = $1
            RETURNING *
        `;

        const resultado = await BD.query(comando, [id_servico]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Serviço não encontrado' });
        }

        return res.status(200).json({ message: 'Serviço deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar serviço', error.message);
        return res.status(500).json({ error: 'Erro ao deletar serviço' });
    }
});



router.get('/servicos/nome/:nome', async (req, res) => {
    const { nome } = req.params;

    try {
        const comando = `
            SELECT *
            FROM servicos
            WHERE LOWER(nome) LIKE LOWER($1)
            ORDER BY nome ASC
        `;

        const resultado = await BD.query(comando, [`%${nome}%`]);

        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao buscar serviço por nome', error.message);
        return res.status(500).json({ error: 'Erro ao buscar serviço' });
    }
});



router.get('/servicos/preco', async (req, res) => {
    const { min, max } = req.query;

    try {
        if (!min || !max) {
            return res.status(400).json({ message: 'Informe preço mínimo e máximo' });
        }

        const comando = `
            SELECT *
            FROM servicos
            WHERE preco BETWEEN $1 AND $2
            ORDER BY preco ASC
        `;

        const resultado = await BD.query(comando, [min, max]);

        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao filtrar por preço', error.message);
        return res.status(500).json({ error: 'Erro ao buscar serviços' });
    }
});


export default router;