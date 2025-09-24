import {pool} from "../config/db.js"

//Dapat semua catatan

export const getAllNotesHandler = async (req, res) => {
    const [notes] = await pool.query("SELECT * FROM notes")
    res.status(200).json({
        status:"success",
        data: notes,
    })
}