const connection = require("./connection");

const criarAluno = async (gra,nome,idCurso,nascimento) => {
    if (gra != null && nome != null && idCurso != null && nascimento != null) {
       await connection.execute(
       `INSERT INTO alunos (gra, nome, idcurso, nascimento) VALUES (?,?,?,?)`,[gra,nome,idCurso,nascimento]
      );
      return `O aluno foi criado com sucesso.`;
    }
  };

module.exports = {
    criarAluno
};