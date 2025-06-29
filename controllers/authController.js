const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashpassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            username: username,
            password: hashpassword
        });
        req.session.user = newUser; // Store user in session
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid username or password'
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            req.session.user = user; // Store user in session
            return res.status(200).json({
                status: 'success',
            });
        }
        else {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}