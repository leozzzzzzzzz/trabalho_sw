const {getPassagensDB, addPassagemDB, updatePassagemDB, deletePassagemDB, getPassagemByIdDB} = require('../services/passagemServices.js');

const getErrorMessage = (error) => error instanceof Error ? error.message : String(error);

const getPassagens = async (req, res) => {
    await getPassagensDB()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}

const addPassagem = async (req, res) => {
    await addPassagemDB(req.body)
        .then(data => res.status(201).json({
            status : 'success',
            message : 'Passagem adicionada com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}

const updatePassagem = async (req, res) => {
    const { id } = req.params;
    const body = { ...req.body, id: parseInt(id) };
    await updatePassagemDB(body)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Passagem atualizada com sucesso',
            data : data
        }))
        .catch(error => {
            const message = getErrorMessage(error);
            if (error.status === 404 || message.includes('não encontrado')) {
                return res.status(404).json({ status: 'error', message });
            }
            return res.status(500).json({ status: 'error', message });
         })
} 

const deletePassagem = async (req, res) => {
    await deletePassagemDB(req.params.id)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Passagem deletada com sucesso',
            data : data
        }))
        .catch(error => {
            const message = getErrorMessage(error);
            if (error.status === 404 || message.includes('não encontrado')) {
                return res.status(404).json({ status: 'error', message });
            }
            return res.status(500).json({ status: 'error', message });
         })
}   

const getPassagemById = async (req, res) => {
    try {
        const data = await getPassagemByIdDB(req.params.id);
        res.status(200).json({
            status : 'success',
            data : data
        });
    } catch (error) {
        const message = getErrorMessage(error);
        if (error.status === 404 || message.includes('não encontrado')) {
            return res.status(404).json({ status: 'error', message });
        }
        if (error.status === 400 || message.includes('ID inválido')) {
            return res.status(400).json({ status: 'error', message });
        }
        return res.status(500).json({ status: 'error', message });
    }
}


module.exports = {
    getPassagens,
    addPassagem,
    updatePassagem,
    deletePassagem,
    getPassagemById
}