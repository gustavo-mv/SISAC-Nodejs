const professorModel = require("../models/professorModel");

const todasAsDisciplinas = async (req, res) => {
  const idProfessor = req.params.idprofessor;
  const professores = await professorModel.pegarDisciplinas(idProfessor);
  return res.status(200).json(professores);
};
const todasAsPresencas = async (req, res) => {
  const idProfessor = req.params.idprofessor;
  const presencas = await professorModel.consultarPresencas(idProfessor);
  return res.status(200).json(presencas);
};
const alunosUmaDisciplina = async (req, res) => {
  const idMateria = req.params.idmateria;
  const alunos = await professorModel.consultarAlunosDisciplina(idMateria);
  return res.status(200).json(alunos);
};

const adicionarFaltas = async (req, res) => {
  const id = req.body.id;
  const materia = req.body.materia;
  const carga = req.body.carga;
  await professorModel.adicionarFaltas(carga, id, materia);
  return res.status(201).json("Faltas aplicadas com sucesso!");
};

module.exports = {
  todasAsDisciplinas,
  todasAsPresencas,
  alunosUmaDisciplina,
  adicionarFaltas,
};
