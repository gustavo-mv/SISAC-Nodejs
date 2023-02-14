const express = require("express");
const router = express.Router();
const professorController = require("./controllers/professorController");
const alunoController = require("./controllers/alunoController");
const coordenadorController = require("./controllers/coordenadorController");
const loginController = require("./controllers/loginController");
const app = require("./app");

router.post("/professor/login/", loginController.loginProfessor);
router.post("/aluno/login/", loginController.loginAluno);


router.get("/", (req, res) => {
  res.send("Olá mundo");
});

router.get(
  "/professor/:idProf?/disciplinas",
  professorController.todasAsDisciplinas
);

router.get("/professor/:idProf?/alunos", professorController.verTodosAlunos);

router.get(
  "/professor/:idProf?/presencas",
  professorController.todasAsPresencas
);

router.get(
  "/professor/:idProf?/:idMateria?/",
  professorController.alunosUmaDisciplina
);

router.post(
  "/aluno/:idAluno?/aulas/",
  alunoController.consultarAulasAbertas
);

router.get("/aluno/:idAluno?/", alunoController.verTodasDisciplinas);

router.get("/aluno/:idAluno?/presenca", alunoController.consultarPresencas);

router.post(
  "/professor/:idProf?/consultarAula/",
  professorController.consultarAulaDisciplina
);
router.post(
  "/professor/:idProf?/alunosPresentes/",
  professorController.consultarAlunosPresentes
);

router.post(
  "/professor/:idProf?/adicionarNaMateria/",
  professorController.adicionarNaMateria
);

router.post("/professor/:idProf?/adicionarAula/", professorController.addAula);

router.post("/professor/:idProf?/fecharAula", professorController.fecharAula);

router.post("/professor/:idProf?/faltas", professorController.adicionarFaltas);

router.post("/aluno/presenca", alunoController.adicionarPresenca);

router.post("/aluno/presencaMarcada", alunoController.verPresencaMarcada);

module.exports = router;
