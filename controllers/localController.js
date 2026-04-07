const { getLocaisDB, addLocalDB, updateLocalDB, deleteLocalDB, getLocalByCodigoDB } = require('../services/localSevices');

const getErrorMessage = (error) => error instanceof Error ? error.message : String(error);

const getLocais = async (req, res) => {
    await getLocaisDB()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}

const addLocal = async (req, res) => {
    await addLocalDB(req.body)
        .then(data => res.status(201).json({
            status : 'success',
            message : 'Local adicionado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}

const updateLocal = async (req, res) => {
    await updateLocalDB(req.params.codigo, req.body)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Local atualizado com sucesso',
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

const deleteLocal = async (req, res) => {
    await deleteLocalDB(req.params.codigo)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Local deletado com sucesso',
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

const getLocalByCodigo = async (req, res) => {
    await getLocalByCodigoDB(req.params.codigo)
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
    getLocais,
    addLocal,
    updateLocal,
    deleteLocal,
    getLocalByCodigo
}