import {pool} from "../config/db.js"

//Dapat semua catatan

export const getAllNotesHandler = async (req, res) => {
    const [notes] = await pool.query("SELECT * FROM notes")
    res.status(200).json({
        status:"success",
        data: notes,
    })
}

export const addNoteHandler = async (req, res) => {
    const {title, content} = req.body
    const [insertResult] = await pool.query(
        "INSERT INTO notes (title, content) VALUES (?, ?)",
        [title, content]
    )

    res.status(201).json({
        status: "success",
        message: "Note created"
    })
}

export const getNoteByIdHandler = async (req, res) => {
    const { id } = req.params

    const [notes] = await pool.query("SELECT * FROM notes WHERE id=?", [id])

    res.status(200).json({
        status:"success",
        data: notes[0]
    })
}

export const updateNoteByIdHandler = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    await pool.query("UPDATE notes SET title=?, content=? WHERE id=?", [title, content, id])

    const [notes] = await pool.query("SELECT * FROM notes WHERE id=?", [id])
 
    res.status(200).json({
        status: "success",
        message:"Note update successfully",
        data: notes[0]
    })
}