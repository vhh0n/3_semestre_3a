import { Router } from "express";
import { BD } from "../../db.js";

const router = Router();



router.get('/agendamentos', async (req, res) => {
    try {
        const comando = `
            SELECT
                a.id_agendamento,
                a.descricao,
                TO_CHAR(a.data_hora, 'DD/MM/YYYY HH24:MI') AS data_hora,
                a.status,
                a.id_servico,
                a.id_usuario
            FROM agendamentos a
            ORDER BY a.data_hora DESC
        `;

        const resultado = await BD.query(comando);

        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao listar agendamentos', error.message);
        return res.status(500).json({ error: 'Erro ao listar agendamentos' });
    }
});



router.post('/agendamentos', async (req, res) => {
    const { descricao, data_hora, status, id_servico, id_usuario } = req.body;

    try {
        const comando = `
            INSERT INTO agendamentos
            (descricao, data_hora, status, id_servico, id_usuario)
            VALUES ($1, $2, $3, $4, $5)
        `;

        const valores = [descricao, data_hora, status, id_servico, id_usuario];

        await BD.query(comando, valores);

        return res.status(201).json({ message: 'Agendamento criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao criar agendamento' });
    }
});



router.put('/agendamentos/:id_agendamento', async (req, res) => {
    const { id_agendamento } = req.params;
    const { descricao, data_hora, status, id_servico, id_usuario } = req.body;

    try {
        const verificar = await BD.query(
            `SELECT * FROM agendamentos WHERE id_agendamento = $1`,
            [id_agendamento]
        );

        if (verificar.rows.length === 0) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        const comando = `
            UPDATE agendamentos SET
                descricao = $1,
                data_hora = $2,
                status = $3,
                id_servico = $4,
                id_usuario = $5
            WHERE id_agendamento = $6
        `;

        const valores = [descricao, data_hora, status, id_servico, id_usuario, id_agendamento];

        await BD.query(comando, valores);

        return res.status(200).json({ message: 'Agendamento atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
});



router.delete('/agendamentos/:id_agendamento', async (req, res) => {
    const { id_agendamento } = req.params;

    try {
        const comando = `
            DELETE FROM agendamentos
            WHERE id_agendamento = $1
            RETURNING *
        `;

        const resultado = await BD.query(comando, [id_agendamento]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }

        return res.status(200).json({ message: 'Agendamento deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar agendamento', error.message);
        return res.status(500).json({ error: 'Erro ao deletar agendamento' });
    }
});



router.get('/agendamentos/status/:status', async (req, res) => {
    const { status } = req.params;

    try {
        const comando = `
            SELECT *
            FROM agendamentos
            WHERE status = $1
            ORDER BY data_hora DESC
        `;

        const resultado = await BD.query(comando, [status]);

        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao filtrar por status', error.message);
        return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});



router.get('/agendamentos/periodo', async (req, res) => {
    const { inicio, fim } = req.query;

    try {
        if (!inicio || !fim) {
            return res.status(400).json({ message: 'Informe inicio e fim' });
        }

        const comando = `
            SELECT *
            FROM agendamentos
            WHERE data_hora BETWEEN
                TO_TIMESTAMP($1, 'DD/MM/YYYY HH24:MI')
                AND
                TO_TIMESTAMP($2, 'DD/MM/YYYY HH24:MI')
            ORDER BY data_hora DESC
        `;

        const resultado = await BD.query(comando, [inicio, fim]);

        return res.status(200).json(resultado.rows);
    } catch (error) {
        console.error('Erro ao filtrar por período', error.message);
        return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
});


export default router;
