const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// ✅ Register
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            email,
            username,
            password: hashedPassword,
        });

        await user.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});

// ✅ Sign In
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const { password, ...others } = user._doc;
        return res.status(200).json({ message: 'Login successful', user: others });

    } catch (error) {
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
});

module.exports = router;
