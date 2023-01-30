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
const verTodosAlunos = async (req, res) => {
  const idProf = req.body.idprofessor;
  const result = await professorModel.verTodosAlunos(idProf);
  return res.status(201).json(result);
};

const fecharAula = async (req, res) => {
  const idAula = req.body.idAula;
  if (idAula) {
    const result = await professorModel.fecharAula(idAula);
    return res.status(201).json(result);
  } else {
    return "O id dessa aula não é válido.";
  }
};

/* const todasAsAulas = async (req, res) => {
  const idProf = req.params.idprofessor;
  const result = await professorModel.todasAsAulas(idProf);
  return res.status(201).json(result);
}; */

const addAula = async (req, res) => {
  const data = req.body.data;
  const idmateria = req.body.idmateria;
  const carga = req.body.carga;
  const result = await professorModel.addAula(idmateria, carga, data);
  return res.status(201).json(result);
};

module.exports = {
  todasAsDisciplinas,
  todasAsPresencas,
  alunosUmaDisciplina,
  adicionarFaltas,
  verTodosAlunos,
  fecharAula,
  addAula,
};
