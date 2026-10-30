/**
 * administra una conexion con la base de datos 
 * usamos las libreria mysql2  para interactuar con la db
 * Una mejor opcion   es usar ORM: son librerias con clases independientes 
 * del motor de bases de datos ( es parecido a PDO de php )
 */
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "dona",
    password: "wads",
    database: "db_usuario",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: "Z",
    dateStrings: true,
    decimalNumbers: true,
    namedPlaceholders:true
});


export default pool;