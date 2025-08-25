"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(200),
    color: zod_1.z.enum(["red", "green", "blue"]).default("blue"),
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(200).optional(),
    color: zod_1.z.enum(["red", "green", "blue"]).optional(),
    completed: zod_1.z.boolean().optional(),
});
