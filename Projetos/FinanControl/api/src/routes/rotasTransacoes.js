import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();

//listar transacoes, mostrando categorias e subcategorias
router.get('/transacoes', async (req, res) => {
    try {
        //cria uma variavel para enviar o comando sql
        const comando = `
                    SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria,
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar transacoes', error.message);
        return res.status(500).json({ error: 'Erro ao listar transacoes' })
    }
})

router.post('/transacoes', async (req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;
    try {
        const comando = `
            INSERT INTO transacoes (valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria];
        await BD.query(comando, valores);

        return res.status(201).json({ message: 'Transação cadastrada com sucesso.' });
    } catch (error) {
        console.error('Erro ao cadastrar transação', error.message);
        return res.status(500).json({ error: 'Erro ao cadastrar transação' });
    }
});


router.put('/transacoes/:id_transacao', async (req, res) => {
    // Id recebido via parametro
    const { id_transacao } = req.params;
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria } = req.body;

    try {
        //Verificar se o usuario existe
        const verificarTransacao = await BD.query(`SELECT * FROM TRANSACOES
            WHERE id_transacao`, [id_transacao])
        if (verificarTransacao.rows.length === 0) {
            return res.status(404).json({ message: 'Transacao não encontrado' })
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE transacoes 
                    SET valor = $1, descricao = $2, data_vencimento = $3, data_pagamento = $4,
                    tipo = $5, id_subcategoria = $6, id_categoria = $7
                    WHERE id_transacao = $8`;
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria];
        await BD.query(comando, valores);

        return res.status(200).json('Transação atualizado!');
    } catch (error) {
        console.error('Erro ao atualizar transacoes', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar transacoes' })
    }
})


router.delete('/transacoes/:id_transacao', async (req, res) => {
    const { id_transacao } = req.params;
    try {
        //Executa o comando de delete
        const comando = `DELETE FROM TRANSACOES WHERE id_transacao = $1`
        await BD.query(comando, [id_transacao])
        return res.status(200).json({ message: "Transacao removido com sucesso" })
    } catch (error) {
        console.error('Erro ao atualizar Transacao', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})


//Listando transacoes por tipo (E ou S)
router.get('/transacoes/tipo/:tipo', async (req, res) => {
    const { tipo } = req.params;

    try {
        if (tipo != 'E' && tipo !== 'S') {
            return res.status(400).json({ message: 'Tipo inválido. Use E para entrada ou S para saida' })
        }
        //cria uma variavel para enviar o comando sql
        const comando = `
                    SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria,
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    WHERE t.tipo = $1
                    ORDER BY t.data_registro DESC
        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [tipo]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar transacao', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})

//buscar transacao por periodo

router.get('/transacoes/periodo', async (req, res) => {
    const { inicio, fim } = req.query;
    try {
        if (!inicio || !fim) {
            return res.status(400).json({ message: 'Data de início e fim são obrigatórias' })
        }
        //cria uma variavel para enviar o comando sql
        const comando = `
                    SELECT
                        t.id_transacao,
                        t.valor,
                        t.descricao,
                        TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                        TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                        TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                        t.tipo,
                        c.nome AS nome_categoria,
                        s.nome AS nome_subcategoria
                    FROM transacoes t
                    LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                    LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    WHERE t.data_registro BETWEEN $1 AND $2
                    ORDER BY t.data_registro DESC
        `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [inicio, fim]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    } catch (error) {
        console.error('Erro ao listar transacao', error.message)
        return res.status(500).json({ message: "Erro interno so servidor" + error.message })
    }
})




export default router