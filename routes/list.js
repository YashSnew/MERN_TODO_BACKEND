const router= require('express').Router();
const User= require('../models/user');
const List= require('../models/list');


//add task
router.post('/addTask', async (req, res) => {
    try{
    const{ title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const list = new List({
            title: title,
            body: body,
            user: existingUser
        });
        await list.save().then(() => {
           res.status(201).json({ message: 'Task added successfully', list: list });
        });
        existingUser.list.push(list);
        existingUser.save();
    }
    }  catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
        
    }
})

//update task

router.put('/updateTask/:id', async (req, res) => {
    try{
    const{ title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       const list=  await list.findByIdAndUpdate(req.params.id,{title,body});
       list.save().then(()=> {
           res.status(200).json({ message: 'Task updated successfully' });
       });
    }
    }  catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
        
    }
})

router.delete('/deleteTask/:id', async (req, res) => {
    try{
    const{ email } = req.body;
    const existingList = await List.findOneAndUpdate({email},{ $pull: { list: req.params.id } });
    if (existingList) {
        await List.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).json({ message: 'Task deleted successfully' });
        });
    } else {
        return res.status(404).json({ error: 'Task not found' });
    }
    }  catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
        
    }

})

//get all tasks
router.get('/getTasks/:id', async (req, res) => {
    const list =list.find({user : req.params.id}).sort({ createdAt: -1 });
    if(list.length!=0){
        res.status(200).json({ message: 'Tasks fetched successfully', list: list });
    }else{
        res.status(200).json({ message: 'No tasks found' });

    }
})




module.exports = router;