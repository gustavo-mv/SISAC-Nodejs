const express = require("express");
const router = express.Router();
const professorController = require("./controllers/professorController");
const alunoController = require("./controllers/alunoController");
const coordenadorController = require("./controllers/coordenadorController");
const administradorController = require("./controllers/administradorController");
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

router.post(
  "/aluno/:idAluno?/consultarPresencas/",
  alunoController.consultarPresencasEmUmaDisciplina
);




router.get("/aluno/:idAluno?/", alunoController.verTodasDisciplinas);

router.get("/aluno/:idAluno?/presenca", alunoController.consultarPresencas);

router.post(
  "/professor/:idProf?/consultarAula/",
  professorController.consultarAulaDisciplina
);

router.post(
  "/professor/:idProf?/criarAula",
  professorController.criarAula
);

router.post(
  "/professor/:idProf?/alunosPresentes/",
  professorController.consultarAlunosPresentes,
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

router.post("/coordenador/alunos/curso", coordenadorController.verAlunos);
router.post("/coordenador/aluno/faltas", coordenadorController.verFaltas);
router.post("/coordenador/alunos/", coordenadorController.criarAluno);
router.put("/coordenador/alunos/", coordenadorController.editarAluno);
router.delete("/coordenador/alunos/", coordenadorController.deletarAluno);
router.post("/administrador/coordenadores/", administradorController.criarCoordenador);
router.post("/administrador/professores/", administradorController.criarProfessor);
router.delete("/administrador/professores/", administradorController.deletarProfessor);
router.post("/administrador/polo/", administradorController.verCursosPolo);
router.get("/administrador/polos/", administradorController.verPolos);
router.post("/administrador/polos/", administradorController.criarPolo);
router.delete("/administrador/polos/", administradorController.deletarPolo);
router.put("/administrador/polos/", administradorController.editarPolo);

module.exports = router;
