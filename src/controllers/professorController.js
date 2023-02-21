const professorModel = require("../models/professorModel");

const todasAsDisciplinas = async (req, res) => {
  const idProfessor = req.params.idProf;
  const professores = await professorModel.pegarDisciplinas(idProfessor);
  return res.status(200).json(professores);
};
const todasAsPresencas = async (req, res) => {
  const idProfessor = req.params.idProf;
  const presencas = await professorModel.consultarPresencas(idProfessor);
  return res.status(200).json(presencas);
};
const alunosUmaDisciplina = async (req, res) => {
  const idMateria = req.params.idMateria;
  const alunos = await professorModel.consultarAlunosDisciplina(idMateria);
  return res.status(200).json(alunos);
};
const consultarAlunosPresentes = async (req, res) => {
  const idAula = req.body.idAula;
  const alunos = await professorModel.consultarAlunosPresentes(idAula);
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
  const idProf = req.body.idProf;
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

const consultarAulaDisciplina = async (req, res) => {
  const idMateria = req.body.idMateria;
  const result = await professorModel.consultarAulaDisciplina(idMateria);
  return res.status(201).json(result);
};

const addAula = async (req, res) => {
  const data = req.body.data;
  const idMateria = req.body.idMateria;
  const carga = req.body.carga;
  const result = await professorModel.addAula(idMateria, carga, data);
  return res.status(201).json(result);
};

const adicionarNaMateria = async (req, res) => {
  const idAluno = req.body.idAluno;
  const idMateria = req.body.idMateria;
  const result = await professorModel.adicionarNaMateria(idMateria, idAluno);
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
  consultarAulaDisciplina,
  adicionarNaMateria,
  consultarAlunosPresentes,
};
