import Router from 'express';
import todosController from '../controllers/todosController.js';

const router = new Router();

router.post('/todos', todosController.create);
router.get('/todos', todosController.getAll);
router.delete('/todos/:id', todosController.delete);
router.put('/todos', todosController.update);
router.delete('/todos', todosController.deleteCompleted);
router.put('/todos/completeall', todosController.toggleStatus);

export default router;
