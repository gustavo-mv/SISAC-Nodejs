const connection = require("./connection");

const pegarDisciplinas = async (idProfessor) => {
  if (idProfessor != null) {
    const [result] = await connection.execute(
      `SELECT materia.idmateria, materia.nome as Disciplina, materia.periodo, professores.nome as professores FROM materia INNER JOIN professores ON professores_idprofessor = professores.idprofessor WHERE ${idProfessor} = professores_idprofessor`
    );
    return result;
  } else {
    return "Erro no ID do Professor";
  }
};

const consultarPresencas = async (idProfessor) => {
  if (idProfessor != null) {
    const [result] = await connection.execute(
      `SELECT materia.nome as Disciplina, aulas.data as Dia, IF(aulas.finalizada, \"Finalizada\", \"Aberta\") AS Status FROM aulas INNER JOIN materia ON aulas.materia_idmateria = materia.idmateria WHERE materia.professores_idprofessor = ${idProfessor}`
    );
    return result;
  }
};
const consultarAlunosDisciplina = async (idMateria) => {
  if (idMateria != null) {
    const [result] = await connection.execute(
      `SELECT alunos.nome as Aluno, presencas.faltas as Faltas, alunos.idalunos FROM alunos INNER JOIN presencas on presencas.alunos_idalunos = alunos.idalunos where presencas.materia_idmateria = ${idMateria}`
    );
    return result;
  }
};
const adicionarFaltas = async (carga, id, materia) => {
  const [result] = await connection.execute(
    "UPDATE presencas SET faltas = faltas + ? WHERE presencas.alunos_idalunos = ? AND presencas.materia_idmateria = ?",
    [carga, id, materia]
  );
  return result;
};
module.exports = {
  pegarDisciplinas,
  consultarPresencas,
  consultarAlunosDisciplina,
  adicionarFaltas,
};
