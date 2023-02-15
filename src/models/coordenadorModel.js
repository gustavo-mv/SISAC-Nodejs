const connection = require("./connection");


const verAlunos = async (idCurso) => {
  if (idCurso) {
     const [result] = await connection.execute(
     `SELECT * FROM alunos WHERE idcurso = ?;`,[idCurso]
    );
    return result;
  }
};

const criarAluno = async (gra,nome,idCurso,nascimento) => {
    if (gra != null && nome != null && idCurso != null && nascimento != null) {
       await connection.execute(
       `INSERT INTO alunos (gra, nome, idcurso, nascimento) VALUES (?,?,?,?)`,[gra,nome,idCurso,nascimento]
      );
      return `O aluno foi criado com sucesso.`;
    }
  };

  const editarAluno = async (idAluno,gra,nome,idCurso,nascimento) => {
    if (idAluno) {
       await connection.execute(
       `UPDATE alunos SET gra = ?, nome = ?, idcurso = ?, nascimento = ? WHERE idalunos = ?;`,[gra,nome,idCurso,nascimento,idAluno]
      );
      return `O aluno foi editado com sucesso.`;
    }
  };

  const deletarAluno = async (idAluno) => {
    if (idAluno) {
       await connection.execute(
       `DELETE FROM alunos WHERE idalunos = ?;`,[idAluno]
      );
      return `O aluno foi deletado com sucesso.`;
    }
  };

  const verFaltas = async (idAluno) => {
    if (idAluno) {
       const [result] = await connection.execute(`
        SELECT alunos.nome, materia.nome, presencas.faltas
        FROM alunos
        JOIN cursos ON alunos.idcurso = cursos.idcurso
        JOIN presencas ON alunos.idalunos = presencas.alunos_idalunos
        JOIN materia ON presencas.materia_idmateria = materia.idmateria
        WHERE alunos.idalunos =  ?;`,[idAluno]
      );
      return result;
    }
  };

module.exports = {
    verAlunos,
    criarAluno,
    editarAluno,
    deletarAluno,
    verFaltas
};