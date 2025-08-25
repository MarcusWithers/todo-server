import cors from "cors";
import "dotenv/config";
import express from "express";
import tasksRouter from "./routes/tasks";


const app = express()
const PORT = Number(process.env.PORT)

app.use(cors())
app.use(express.json())

app.use("/tasks", tasksRouter)


app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" })
})


app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`)
})