const { json } = require("express");
const connection = require("./connection");

const adicionarPresenca = async (idAluno, idAula) => {
  const [result] = await connection.execute(
    "INSERT INTO `alunospresentes`(`aulas_idAulas`,`idalunos`) VALUES (?,?)",
    [idAula, idAluno]
  );
  return "Presença adicionada com sucesso!";
};

const consultarPresencas = async (idAluno) => {
  if (idAluno) {
    const result = await connection.execute(
      `SELECT materia.nome as Disciplina, aulas.data as Dia FROM aulas INNER JOIN materia ON aulas.materia_idmateria = materia.idmateria INNER JOIN alunospresentes ON alunospresentes.aulas_idAulas = aulas.idAulas WHERE alunospresentes.idalunos = ${idAluno}`
    );
    return result[0];
  } else {
    return "O id está incorreto.";
  }
};

const consultarAulasAbertas = async (idAluno) => {
  if (idAluno) {
    const result = await connection.execute(
    `SELECT materia.nome as Disciplina, aulas.data AS Dia, 
    aulas.idaulas, alunos.idalunos FROM aulas INNER JOIN materia ON aulas.materia_idmateria = materia.idmateria 
    INNER JOIN presencas ON presencas.materia_idmateria = materia.idmateria INNER JOIN alunos ON presencas.alunos_idalunos = alunos.idalunos
    WHERE NOT aulas.finalizada AND alunos.idalunos = ${idAluno}`);
    return result[0];
  } else {
    return "O id é inválido.";
  }
};

const verPresencaJaMarcada = async (idAluno, idAula) => {
  const result = await connection.execute(
    `SELECT alunospresentes.idalunos FROM aulas INNER JOIN alunospresentes ON aulas.idAulas = alunospresentes.aulas_idAulas WHERE aulas.idAulas = ${idAula} AND alunospresentes.idalunos = ${idAluno}`
  );
  if (Object.keys(result[0]).length === 0) {
    return "Não há presença por aqui.";
  } else return result[0];
};

const verTodasDisciplinas = async (idAluno) => {
  const result =
    await connection.execute(`SELECT materia.nome as Disciplina, presencas.faltas as Faltas
  FROM materia INNER JOIN presencas ON presencas.materia_idmateria = materia.idmateria WHERE presencas.alunos_idalunos = ${idAluno}`);

  if (Object.keys(result[0]).length === 0) {
    return "Não há presença por aqui.";
  } else return result[0];
};


const loginAluno = async (gra, ano) => {
  const sql = "SELECT alunos.idalunos, alunos.nome, cursos.nome AS curso FROM alunos INNER JOIN cursos ON alunos.idcurso = cursos.idcurso WHERE gra = ? AND nascimento = ?";
  result = await connection.query(sql,[gra, ano])
  if(result[0].length < 1){
    const erro = {
      "status": false,
      "resultado": "Credenciais inválidas."
    }
     return erro;
  }

const mapaUsuario = {
   "status": true,
   "idaluno": result[0][0]["idalunos"],
   "nome": result[0][0]["nome"],
   "curso": result[0][0]["curso"]
}
    return mapaUsuario
};

module.exports = {
  adicionarPresenca,
  consultarPresencas,
  verPresencaJaMarcada,
  verTodasDisciplinas,
  consultarAulasAbertas,
  loginAluno
};
