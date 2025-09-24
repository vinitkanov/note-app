import mysql2 from "mysql2/promise";

export const pool = mysql2.createPool({
    host: "localhost",
    user:"root",
    password: "",
    database: "notes_app"
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

