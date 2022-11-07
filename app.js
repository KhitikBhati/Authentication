const express = require('express');
const app = express();

const PORT = 2500;

const mongoDb = require('./config/mongoose');
const User = require('./models/users');

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Check all Api's using POSTMAN software
//Register API
app.post('/register', async(req, res) => {
    const {name , email, password } = req.body;
    console.log(name, email, password);
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(500).json(error);
    }
    res.send('request successfully');
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


//login API
app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({email});
        if (!user) {
            res.status(404).json('User not found');
        } else {
            if (password == user.password) {
                console.log("Login successfully");
                res.status(200).json(user);
                
                
            } else {
                res.status(403).json('Incorrect password');
            }
        }
    
    } catch (error) {
        res.status(500).json(error);
    }
    // res.end("login successfully");
})

