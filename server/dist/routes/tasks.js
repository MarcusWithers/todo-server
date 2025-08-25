"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../prisma/prisma");
const zod_1 = require("../zod");
const router = (0, express_1.Router)();
// GET /tasks
router.get("/", async (_req, res) => {
    const tasks = await prisma_1.prisma.task.findMany({ orderBy: { createdAt: "desc" } });
    res.json(tasks);
});
// POST /tasks
router.post("/", async (req, res) => {
    const parsed = zod_1.createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    const { title, color } = parsed.data;
    const task = await prisma_1.prisma.task.create({ data: { title, color } });
    res.status(201).json(task);
});
// PUT /tasks/:id
router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ error: "Invalid id" });
    const parsed = zod_1.updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
    }
    try {
        const updated = await prisma_1.prisma.task.update({ where: { id }, data: parsed.data });
        res.json(updated);
    }
    catch (e) {
        res.status(404).json({ error: "Task not found" });
    }
});
// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id))
        return res.status(400).json({ error: "Invalid id" });
    try {
        await prisma_1.prisma.task.delete({ where: { id } });
        res.status(204).send();
    }
    catch (e) {
        res.status(404).json({ error: "Task not found" });
    }
});
exports.default = router;
