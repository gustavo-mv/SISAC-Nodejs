const servidorModel = require("../models/servidorModel");



const checarAulas = async (req, res) => {
    const result = await servidorModel.checarAulas(idAula);
    return res.status(200).json(result);
};


module.exports = {
  checarAulas
};
