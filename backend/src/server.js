import express from 'express';
import { testConnection } from './config/db.js';
import helloRouter from "./routes/helloRoute.js"
import noteRouter from './routes/notesRoute.js';

const app = express();
const port = 3000;


app.use("/", helloRouter)
app.use(noteRouter)

app.listen(port,() => {
    console.log(`Server running at http://localhost:${port}`);
    testConnection();
})