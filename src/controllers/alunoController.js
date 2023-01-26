const alunoModel = require("../models/alunoModel");

const adicionarPresenca = async (req, res) => {
  const idAluno = req.body.idAluno;
  const idAula = req.body.idAula;
  const result = await alunoModel.adicionarPresenca(idAluno, idAula);
  return res.status(200).json(result);
};

module.exports = {
  adicionarPresenca,
};
