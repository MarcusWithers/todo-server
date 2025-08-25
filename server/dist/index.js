"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/tasks", tasks_1.default);
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});
app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});
