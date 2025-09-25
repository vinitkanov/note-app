import express from "express"
import { getAllNotesHandler, addNoteHandler, getNoteByIdHandler, updateNoteByIdHandler } from "../handlers/notesHandler.js"

const noteRouter = express.Router()

noteRouter.get("/notes", getAllNotesHandler)
noteRouter.post("/notes", addNoteHandler)
noteRouter.get("/notes/:id", getNoteByIdHandler)
noteRouter.put("/notes/:id", updateNoteByIdHandler)

export default noteRouter