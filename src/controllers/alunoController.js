const alunoModel = require("../models/alunoModel");

const adicionarPresenca = async (req, res) => {
  const idAluno = req.body.idAluno;
  const idAula = req.body.idAula;
  const result = await alunoModel.adicionarPresenca(idAluno, idAula);
  return res.status(200).json(result);
};

const adicionarPresencaQR = async (req, res) => {
  const idAluno = req.body.idAluno;
  const idAula = req.body.idAula;
  const token = req.body.token;
  const result = await alunoModel.adicionarPresencaQR( idAluno, idAula, token);
  return res.status(200).json(result);
};

const consultarPresencas = async (req, res) => {
  const idAluno = req.params.idAluno;
  if (idAluno != null) {
    const result = await alunoModel.consultarPresencas(idAluno);
    return res.status(200).json(result);
  } else
    return res
      .status(500)
      .json("O id está inexistente ou não é um tipo aceitável");
};

const consultarAulasAbertas = async (req, res) => {
  const idAluno = req.params.idAluno;
  const result = await alunoModel.consultarAulasAbertas(idAluno);
  return res.status(200).json(result);
};

const verPresencaMarcada = async (req, res) => {
  const idAluno = req.body.idAluno;
  const idAula = req.body.idAula;
  if (idAluno != null && idAula != null) {
    const result = await alunoModel.verPresencaJaMarcada(idAluno, idAula);
    return res.status(200).json(result);
  } else
    return res
      .status(500)
      .json("O id está inexistente ou não é um tipo aceitável");
};

const verHorarios = async (req, res) => {
  const idAluno = req.params.idAluno;
  if (idAluno != undefined || idAluno != null) {
    const result = await alunoModel.verHorarios(idAluno);
    return res.status(200).json(result);
  } else{
    return res
      .status(500)
      .json("O id está inexistente ou não é um tipo aceitável");
  }
};

const verTodasDisciplinas = async (req, res) => {
  const idAluno = req.params.idAluno;
  if (idAluno != null) {
    const result = await alunoModel.verTodasDisciplinas(idAluno);
    return res.status(200).json(result);
  } else
    return res
      .status(500)
      .json("O id está inexistente ou não é um tipo aceitável");
};

const consultarPresencasEmUmaDisciplina = async (req, res) => {
  const idAluno = req.params.idAluno;
  const idMateria = req.body.idMateria;
  if (idAluno != null) {
    const result = await alunoModel.consultarPresencasEmUmaDisciplina(idAluno,idMateria);
    return res.status(200).json(result);
  } else
    return res
      .status(500)
      .json("O id está inexistente ou não é um tipo aceitável");
};

const horariosMateria = async (req, res) => {
  const idMateria = req.params.idMateria;
  if (idMateria != undefined) {
    const result = await alunoModel.horariosMateria(idMateria);
    return res.status(200).json(result);
  } else
    return res
      .status(500)
      .json("O id está inexistente ou não é um tipo aceitável");
};


module.exports = {
  adicionarPresenca,
  consultarPresencas,
  verPresencaMarcada,
  verTodasDisciplinas,
  consultarAulasAbertas,
  consultarPresencasEmUmaDisciplina,
  horariosMateria,
  verHorarios,
  adicionarPresencaQR
};
