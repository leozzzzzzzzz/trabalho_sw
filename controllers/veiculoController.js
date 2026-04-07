const { getVeiculosDB, addVeiculoDB, updateVeiculoDB, deleteVeiculoDB, getVeiculoByIdDB } = require('../services/veiculoServices')

const getErrorMessage = (error) => error instanceof Error ? error.message : String(error);

const getVeiculos = async (req, res) => {
    await getVeiculosDB()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}  

const addVeiculo = async (req, res) => {
    await addVeiculoDB(req.body)
        .then(data => res.status(201).json({
            status : 'success',
            message : 'Veículo adicionado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}   

const updateVeiculo = async (req, res) => {
    await updateVeiculoDB(req.params.id, req.body)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Veículo atualizado com sucesso',
            data : data
        }))
        .catch(error => {
            const message = getErrorMessage(error);
            if (message.includes('não encontrado')) {
                return res.status(404).json({ status: 'error', message });
            }
            return res.status(500).json({ status: 'error', message });
         })
}   

const deleteVeiculo = async (req, res) => {
    await deleteVeiculoDB(req.params.id)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Veículo deletado com sucesso',
            data : data
        }))
        .catch(error => {
            const message = getErrorMessage(error);
            if (message.includes('não encontrado')) {
                return res.status(404).json({ status: 'error', message });
            }
            return res.status(500).json({ status: 'error', message });
         })
}   

const getVeiculoById = async (req, res) => {
    await getVeiculoByIdDB(req.params.id)
        .then(data => res.status(200).json({
            status : 'success',
            data : data
        }))
        .catch(error => {
            const message = getErrorMessage(error);
            if (message.includes('não encontrado')) {
                return res.status(404).json({ status: 'error', message });
            }
            return res.status(500).json({ status: 'error', message });
        })
}


module.exports = {
    getVeiculos,
    addVeiculo,
    updateVeiculo,
    deleteVeiculo,
    getVeiculoById
}