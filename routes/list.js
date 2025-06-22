const router = require('express').Router();
const User = require('../models/user');
const List = require('../models/list');

// ✅ Add Task
router.post('/addTask', async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const task = new List({
                title,
                body,
                user: existingUser._id,
            });
            await task.save();

            existingUser.list.push(task._id);
            await existingUser.save();

            return res.status(201).json({ message: 'Task added successfully', list: task });
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// ✅ Update Task
router.put('/updateTask/:id', async (req, res) => {
    try {
        const { title, body } = req.body;
        const task = await List.findByIdAndUpdate(
            req.params.id,
            { title, body },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });

        return res.status(200).json({ message: 'Task updated successfully', list: task });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// ✅ Delete Task
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.list.pull(req.params.id);
        await user.save();

        await List.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// ✅ Get All Tasks for a User
router.get('/getTasks/:id', async (req, res) => {
    try {
        const tasks = await List.find({ user: req.params.id }).sort({ createdAt: -1 });
        if (tasks.length !== 0) {
            return res.status(200).json({ message: 'Tasks fetched successfully', list: tasks });
        } else {
            return res.status(200).json({ message: 'No tasks found', list: [] });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
