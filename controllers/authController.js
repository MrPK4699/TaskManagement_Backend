const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// require("dotenv").config();
const { jwtSecret } = require("../config/config");

exports.register = async (req, res) => {
    try {
        const {username, email, password}= req.body;
        const existinguser= await User.findOne({email});
        if(existinguser){
        res.status(404).json({error:'Existing User try to login'})
        }
        const hashedPassword= await bcrypt.hash(password,4);
        const user= new User({username, email, password:hashedPassword});
        await user.save();
        res.status(201).json({msg: 'User registered successfully'});
    } catch (error) {
        res.status(404).json({error:'Internal Server Error', msg:error})
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid email' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userID: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ token , email, name:user.username});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
