import { Router } from "express"
import { z } from "zod"
import { prisma } from "../prisma/prisma"
import { createTaskSchema, updateTaskSchema } from "../schemas"

const router = Router()

// GET /tasks
router.get("/", async (_req, res) => {
    const tasks = await prisma.task.findMany({ orderBy: { id: "asc" } })
    res.json(tasks)
})


// POST /tasks
router.post("/", async (req, res) => {
    const parsed = createTaskSchema.safeParse(req.body)

    if (!parsed.success) {
        return res.status(400).json({ error: z.treeifyError(parsed.error) })
    }

    const { title, color } = parsed.data
    const task = await prisma.task.create({ data: { title, color } })

    res.status(201).json(task)
})


// PUT /tasks/id
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" })

    const parsed = updateTaskSchema.safeParse(req.body)

    if (!parsed.success) {
        return res.status(400).json({ error: z.treeifyError(parsed.error) })
    }

    try {
    const updated = await prisma.task.update({ where: { id }, data: parsed.data })

    res.json(updated)
    } catch (e) {
        res.status(404).json({ error: "Task not found" })
    }
})


// DELETE /tasks/id
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" })
    
    try {
        await prisma.task.delete({ where: { id } })
        res.status(204).send()
    } catch (e) {
        res.status(404).json({ error: "Task not found" })
    }
})


export default router