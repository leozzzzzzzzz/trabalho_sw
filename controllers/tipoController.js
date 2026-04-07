const {getTiposDB, addTipoDB, updateTipoDB, deleteTipoDB, getTipoByCodigoDB} = require('../services/tipoServices');

const getErrorMessage = (error) => error instanceof Error ? error.message : String(error);

const getTipos = async (req, res) => {
    await getTiposDB()
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}

const addTipo = async (req, res) => {
    await addTipoDB(req.body)
        .then(data => res.status(201).json({
            status : 'success',
            message : 'Tipo adicionado com sucesso',
            data : data
        }))
        .catch(error => res.status(500).json({ 
            status : 'error',
            message : getErrorMessage(error)
         }))
}   

const updateTipo = async (req, res) => {
    const { codigo } = req.params;
    const body = { ...req.body, codigo: parseInt(codigo) };
    await updateTipoDB(body)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Tipo atualizado com sucesso',
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

const deleteTipo = async (req, res) => {
    await deleteTipoDB(req.params.codigo)
        .then(data => res.status(200).json({
            status : 'success',
            message : 'Tipo deletado com sucesso',
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

const getTipoByCodigo = async (req, res) => {
    await getTipoByCodigoDB(parseInt(req.params.codigo))
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
    getTipos,
    addTipo,
    updateTipo,
    deleteTipo,
    getTipoByCodigo
}