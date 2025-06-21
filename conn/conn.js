const mongoose = require('mongoose');

const conn=async () => {
    await mongoose.connect("mongodb+srv://22053302:root@cluster0.azcdmoe.mongodb.net/").then(() => {
        console.log("Connected to MongoDB successfully");
    })
}
conn()