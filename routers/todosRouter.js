import Router from "express";
import todosController from "../controllers/todosController.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = new Router();

router.post("/todos", authMiddleware, todosController.create);
router.get("/todos", authMiddleware, todosController.getAll);
router.delete("/todos/:id", authMiddleware, todosController.delete);
router.put("/todos", authMiddleware, todosController.update);
router.delete("/todos", authMiddleware, todosController.deleteCompleted);
router.put("/todos/completeall", authMiddleware, todosController.toggleStatus);

export default router;
