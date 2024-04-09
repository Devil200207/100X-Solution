const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, User, Course} = require("../db");
const jsonwebtoken = require("jsonwebtoken");
const jwtSecret = 'chandrachudchawan';
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        Username: username,
        Password: password
    });

    res.json({
        message: 'Admin created successfully'
    });

});

router.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = User.find({
        Username: username,
        Password: password
    });

    if(user) 
    {
        const token = jsonwebtoken.sign({ username }, jwtSecret);
        res.json({ token });
    } 
    else 
    {
        res.status(401).json({
            message: "Incorrect email and password"
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    await Course.create({
        name,
        description,
        imageLink,
        price
    });

    res.json({
        message: 'Course created successfully'
    });
});

router.get('/courses', adminMiddleware, (req, res) => {
    
    const cource = Course.find({});

    res.json({
        Courses: cource
    });
});

module.exports = router;