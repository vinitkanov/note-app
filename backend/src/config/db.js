import mysql2 from "mysql2/promise";

export const pool = mysql2.createPool({
    host: "sql12.freesqldatabase.com",
    user:"sql12801503",
    password: "pNE15Seyg8",
    database: "sql12801503",
    waitForConnections: true,
    connectionLimit: 10,    
    queueLimit: 0
})

export const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database connected successfully.");
        connection.release();
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

