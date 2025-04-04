const express = require('express');
const router = express.Router();
const Todo = require('../model/todoschema');

router.post('/addtodo', async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const newTodo = new Todo({ title, description, completed });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error adding todo', error });
    }
})

router.get('/gettodo', async (req, res) => {
    try{
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
})

router.get('/gettodo/:id', async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch{
        res.status(500).json({ message: 'Error fetching todo', error });
    }
})

router.put('/updatetodo/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const todo = await Todo.findByIdAndUpdate(req.params.id, 
            { title, description, completed }, 
            { new: true }
        );
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/deletetodo/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Error while deleting', error});
    }
})

module.exports = router;


