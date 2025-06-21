const express=require('express');
const app=express();
const auth=require('./routes/auth');
const list = require('./routes/list');
require('./conn/conn');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send('PUT request received');
})
app.use('/api/v1',auth);
app.use('/api/v2',list);


const port=3009;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});