import express from 'express';
import cors from 'cors'; // Add this import
import { testConnection } from './config/db.js';
import helloRouter from "./routes/helloRoute.js"
import noteRouter from './routes/notesRoute.js';

const app = express();
const port = 3000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://note-app-main-eight.vercel.app'
    : '*',  // Allows all origins in development
  credentials: true
}));

app.use(express.json())
app.use("/", helloRouter)
app.use(noteRouter)

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);
    testConnection();
})