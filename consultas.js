const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgresql",
  database: "cursos",
  port: 5432,
});

async function nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion) {
  try {
    const result = await pool.query(
      `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ('${nombre}', ${nivelTecnico},'${fechaInicio}',${duracion}) RETURNING *`
    );
    return result.rows;
  } catch (error) {
    return error;
  }
}

async function getCursos() {
  try {
    const result = await pool.query(`SELECT * FROM cursos;`);
    return result.rows;
  } catch (error) {
    return error;
  }
}

async function editarCurso(id, nombre, nivel, fecha, duracion) {
  try {
    const result = await pool.query(
      `UPDATE cursos SET nombre = '${nombre}', nivel = ${nivel}, fecha = '${fecha}', duracion = ${duracion} WHERE id = '${id}' RETURNING *`
    );
    return result.rows;
  } catch (error) {
    console.log(error, "No se pudo actualizar el curso");
  }
}
async function deleteCursos(id) {
  try {
    const result = await pool.query(`DELETE FROM cursos WHERE id = '${id}'`);
    return result.rowCount;
  } catch (error) {
    console.log(error.code);
    return error;
  }
}

module.exports = { nuevoCurso, getCursos, editarCurso, deleteCursos };
