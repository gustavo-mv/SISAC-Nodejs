const connection = require("./connection");

const adicionarPresenca = async (idAluno, idAula) => {
  const [result] = await connection.execute(
    "INSERT INTO `alunospresentes`(`aulas_idAulas`,`idalunos`) VALUES (?,?)",
    [idAula, idAluno]
  );
  return "Presença adicionada com sucesso!";
};

module.exports = {
  adicionarPresenca,
};
