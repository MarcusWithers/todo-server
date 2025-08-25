import { z } from "zod"

const colors = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "INDIGO", "PURPLE", "PINK", "BROWN"] as const

export const createTaskSchema = z.object({
    title: z.string(),
    color: z.enum(colors)
})


export const updateTaskSchema = z.object({
    title: z.string(),
    color: z.enum(colors),
    completed: z.boolean().optional()
})