const connection = require("./connection");

const checarAulas = async () => {
const [result] = await connection.execute(
    "SELECT `hora_inicio`, `hora_fim`, `dia` FROM `horarios` WHERE idmateria = 1");
      return result;
    }

module.exports = {
    checarAulas
}