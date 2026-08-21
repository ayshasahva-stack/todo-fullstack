import express from 'express';
import protect from '../middleware/auth.middleware.js'
import { createTodo,getTodo ,getTodoById,updateTodo,toggleTodo,deleteTodo} from '../controllers/todo.controller.js';

const router = express.Router();

router.use(protect)

router.get('/',getTodo)
router.post('/',createTodo)
router.get('/:id',getTodoById)
router.put('/:id',updateTodo)
router.patch('/:id',toggleTodo)
router.delete('/:id',deleteTodo)

export default router;